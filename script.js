// ===== helpers =====

function moodStyle(name) {
  const key = norm(name).toLowerCase();

  const map = {
    work: { label: "Work", color: "#3B82F6", icon: "briefcase" },
    relax: { label: "Relax", color: "#10B981", icon: "leaf" },
    sleep: { label: "Sleep", color: "#8B5CF6", icon: "moon" },
    workout: { label: "Workout", color: "#F97316", icon: "dumbbell" },
    spicy: { label: "Spicy", color: "#EF4444", icon: "chili" },
    dance: { label: "Dance", color: "#EC4899", icon: "dance" },
    walk: { label: "Walk", color: "#1a644e", icon: "walk" },
    allstar: { label: "Allstar", color: "#7f48df", icon: "allstar" },
    focus: { label: "Focus", color: "#9cbed4", icon: "focus" },
    romantic: { label: "Romantic", color: "#750014", icon: "romantic" },
    hearth: { label: "Hearth", color: "#bb517d", icon: "hearth" },
  };

  return map[key] ?? { label: name, color: "#6B7280", icon: "dot" };
}

function moodSvg(name) {
  const { icon } = moodStyle(name);

  // Minimal inline SVGs (stroke icons)
  if (icon === "briefcase")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop-icon lucide-laptop"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>
  `;

  if (icon === "leaf")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf-icon lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
  `;

  if (icon === "moon")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>
  `;

  if (icon === "dumbbell")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>
  `;

  if (icon === "chili")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-icon lucide-flame"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>
  `;

  if (icon === "dance")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drum-icon lucide-drum"><path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/></svg>
  `;

  if (icon === "walk")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-footprints-icon lucide-footprints"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/></svg>
  `;

  if (icon === "allstar")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gem-icon lucide-gem"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>
  `;

  if (icon === "focus")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>
  `;

  if (icon === "romantic")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rose-icon lucide-rose"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg>
  `;

  if (icon === "hearth")
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-heart-icon lucide-house-heart"><path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
  `;

  // fallback dot
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12h.01"/>
    </svg>
  `;
}

function setMoodIcons(id, moods) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  const list = Array.isArray(moods) ? moods.map(norm).filter(Boolean) : [];
  const visible = list.filter((m) => m.toLowerCase() !== "placeholder");

  // If none, show nothing (or you can show a subtle placeholder)
  visible.slice(0, 10).forEach((m) => {
    const { label, color } = moodStyle(m);

    const wrap = document.createElement("div");
    wrap.className = "mood-icon";
    wrap.style.background = color;
    wrap.title = label; // hover tooltip
    wrap.setAttribute("aria-label", label);
    wrap.innerHTML = moodSvg(m);

    el.appendChild(wrap);
  });
}

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

function openAlbumModal(album, anim) {
  const modal = document.getElementById("album-modal");
  const cover = document.getElementById("modal-cover");

  // Set the real modal cover first
  cover.src = `images/${album.cover}`;
  cover.alt = `${album.artist} - ${album.title}`;

  // Open modal (so target rect exists)
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  if (anim && anim.fromRect) {
    modal.classList.add("is-flying"); // ✅ freeze panel/backdrop transitions

    cover.style.visibility = "hidden";

    const fly = document.createElement("img");
    fly.className = "cover-fly";
    fly.src = cover.src;
    fly.alt = "";
    fly.style.borderRadius = anim.radius || "12px";

    fly.style.left = `${anim.fromRect.left}px`;
    fly.style.top = `${anim.fromRect.top}px`;
    fly.style.width = `${anim.fromRect.width}px`;
    fly.style.height = `${anim.fromRect.height}px`;

    document.body.appendChild(fly);

    requestAnimationFrame(() => {
      const toRect = cover.getBoundingClientRect();

      const dx = toRect.left - anim.fromRect.left;
      const dy = toRect.top - anim.fromRect.top;
      const sx = toRect.width / anim.fromRect.width;
      const sy = toRect.height / anim.fromRect.height;

      // ✅ use 3d to reduce subpixel jitter
      fly.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale3d(${sx}, ${sy}, 1)`;

      fly.addEventListener(
        "transitionend",
        () => {
          fly.remove();
          cover.style.visibility = "visible";
          modal.classList.remove("is-flying"); // ✅ let modal behave normally again
        },
        { once: true },
      );
    });
  }

  // Fill modal text/content
  setText("modal-title", album.title);
  setText("modal-subtitle", album.artist);

  setText("modal-runtime", album.runtime ?? "—");
  setTracklist("modal-tracklist", album.tracklist);

  setText("modal-year", album.release_year ?? "—");
  setText("modal-type", album.type ?? "—");
  setText("modal-genre", album.main_genre ?? "—");
  const ratingText = document.querySelector("#modal-rating .rating-text");
  if (ratingText) ratingText.textContent = album.rating ?? "—";

  const ratingEl = document.getElementById("modal-rating");
  if (ratingEl) {
    const r = Number(album.rating);
    ratingEl.style.color = Number.isFinite(r) ? getRatingColor(r) : "#888";
  }

  setMoodIcons("modal-moods", album.mood);
  setPills("modal-tags", album.tags);
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

    const img = document.createElement("img");
    img.className = "album-cover";
    img.src = `images/${album.cover}`;
    img.alt = `${album.artist} - ${album.title}`;

    // Fade in when loaded
    img.addEventListener("load", () => card.classList.add("is-loaded"));
    if (img.complete) card.classList.add("is-loaded");

    card.addEventListener("click", (e) => {
      e.stopPropagation();

      const fromRect = img.getBoundingClientRect();
      const radius = getComputedStyle(card).borderRadius;

      openAlbumModal(album, { fromRect, radius });
    });

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
