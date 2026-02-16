// ===== helpers =====

function setTracklist(id, values) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "";

  const list = Array.isArray(values) ? values.map(norm).filter(Boolean) : [];
  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "—";
    el.appendChild(li);
    return;
  }

  list.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = track;
    el.appendChild(li);
  });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRatingColor(rating) {
  if (rating === 10) return "#7f48df";
  if (rating >= 9.5) return "#D4AF37";
  if (rating >= 8.8) return "#FF7043";
  if (rating >= 8.0) return "#29B6F6";
  return "#888";
}

function norm(s) {
  return String(s ?? "").trim();
}

function uniqSorted(values) {
  return Array.from(new Set(values.map(norm).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
}

function clear(el) {
  el.innerHTML = "";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value ?? "";
}

function setPills(id, values) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "";

  const list = Array.isArray(values) ? values : [];
  list
    .map(norm)
    .filter(Boolean)
    .forEach((v) => {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = v;
      el.appendChild(pill);
    });

  if (el.children.length === 0) {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = "—";
    el.appendChild(pill);
  }
}

function openAlbumModal(album) {
  const modal = document.getElementById("album-modal");
  const cover = document.getElementById("modal-cover");

  cover.src = `images/${album.cover}`;
  cover.alt = `${album.artist} - ${album.title}`;

  setText("modal-title", album.title);
  setText("modal-subtitle", album.artist);

  setText("modal-runtime", album.runtime ?? "—");
  setTracklist("modal-tracklist", album.tracklist);

  setText("modal-year", album.release_year ?? "—");
  setText("modal-type", album.type ?? "—");
  setText("modal-genre", album.main_genre ?? "—");
  setText("modal-rating", album.rating ?? "—");
  const ratingEl = document.getElementById("modal-rating");
  if (ratingEl) {
    const r = Number(album.rating);
    ratingEl.style.background = Number.isFinite(r) ? getRatingColor(r) : "#888";
  }

  setPills("modal-mood", album.mood);
  setPills("modal-tags", album.tags);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeAlbumModal() {
  const modal = document.getElementById("album-modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// ===== filtering logic =====
// OR within group, AND across groups

function matchesFilters(album, state) {
  const genreOk =
    state.genres.size === 0 || state.genres.has(norm(album.main_genre));

  const moods = Array.isArray(album.mood) ? album.mood.map(norm) : [];
  const moodOk =
    state.moods.size === 0 || moods.some((m) => state.moods.has(m));

  const tags = Array.isArray(album.tags) ? album.tags.map(norm) : [];
  const tagOk = state.tags.size === 0 || tags.some((t) => state.tags.has(t));

  return genreOk && moodOk && tagOk;
}

// ===== render =====

function renderAlbums(albums, grid) {
  clear(grid);

  albums.forEach((album) => {
    const card = document.createElement("div");

    card.addEventListener("mouseenter", () => {
      // random between -5 and +15 (right-biased)
      const angle = (-1.5 + Math.random() * 2.2).toFixed(2);
      card.style.setProperty("--hover-rot", `${angle}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--hover-rot");
    });

    card.className = "album-card";
    card.addEventListener("click", (e) => {
      e.stopPropagation(); // ⭐ critical
      openAlbumModal(album);
    });

    const img = document.createElement("img");
    img.className = "album-cover";
    img.src = `images/${album.cover}`;
    img.alt = `${album.artist} - ${album.title}`;

    const rating = document.createElement("div");
    rating.className = "album-rating";
    rating.textContent = album.rating;
    rating.style.background = getRatingColor(Number(album.rating));

    card.appendChild(img);
    card.appendChild(rating);
    grid.appendChild(card);
  });
}

function renderChips(container, values, selectedSet, onToggle) {
  clear(container);

  values.forEach((value) => {
    const chip = document.createElement("div");
    chip.className = "filter-chip";
    chip.textContent = value;

    if (selectedSet.has(value)) chip.classList.add("is-active");

    chip.addEventListener("click", () => onToggle(value));
    container.appendChild(chip);
  });
}

// ===== main =====

async function init() {
  const grid = document.getElementById("album-grid");

  const modal = document.getElementById("album-modal");

  modal.addEventListener("click", () => {
    closeAlbumModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAlbumModal();
  });
  const genresEl = document.getElementById("filter-genres");
  const moodsEl = document.getElementById("filter-moods");
  const tagsEl = document.getElementById("filter-tags");
  const clearBtn = document.getElementById("clear-filters");

  const response = await fetch("data/albums.json");
  const allAlbums = shuffle(await response.json());

  // build distinct lists
  const allGenres = uniqSorted(allAlbums.map((a) => a.main_genre));
  const allMoods = uniqSorted(
    allAlbums
      .flatMap((a) => (Array.isArray(a.mood) ? a.mood : []))
      .filter((m) => norm(m).toLowerCase() !== "placeholder"),
  );

  const allTags = uniqSorted(
    allAlbums.flatMap((a) => (Array.isArray(a.tags) ? a.tags : [])),
  );

  const state = {
    genres: new Set(),
    moods: new Set(),
    tags: new Set(),
  };

  function rerender() {
    // update chips (active outline)
    renderChips(genresEl, allGenres, state.genres, (val) => {
      state.genres.has(val) ? state.genres.delete(val) : state.genres.add(val);
      rerender();
    });

    renderChips(moodsEl, allMoods, state.moods, (val) => {
      state.moods.has(val) ? state.moods.delete(val) : state.moods.add(val);
      rerender();
    });

    renderChips(tagsEl, allTags, state.tags, (val) => {
      state.tags.has(val) ? state.tags.delete(val) : state.tags.add(val);
      rerender();
    });

    const visible = allAlbums.filter((a) => matchesFilters(a, state));
    renderAlbums(visible, grid);
  }

  clearBtn.addEventListener("click", () => {
    state.genres.clear();
    state.moods.clear();
    state.tags.clear();
    rerender();
  });

  rerender();
}

init().catch((err) => console.error("Init failed:", err));
