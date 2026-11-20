/* ==========================================================================
   TOASTER ROASTER — App logic
   Vanilla JS. No framework, no build step. All state lives in localStorage.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Helpers ---------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
    }
  };
  const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- State ---------------- */
  let currentName = "";
  let currentCategory = "all";
  let currentIntensity = 2;
  let recentTexts = [];
  let currentRoast = null;

  const favorites = store.get("tr_favorites", []);
  const history = store.get("tr_history", []);
  let generatedCount = store.get("tr_generated", 0);

  /* ---------------- Elements ---------------- */
  const nameInput = $("#roast-name");
  const generateBtn = $("#generate-btn");
  const roastMeBtn = $("#roast-me-btn");
  const toaster = $("#toaster");
  const toastSlice = $("#toast-slice");
  const roastOutput = $("#roast-output");
  const roastText = $("#roast-text");
  const roastMeta = $("#roast-meta");
  const burnFill = $("#burn-fill");
  const burnLabel = $("#burn-label");
  const copyBtn = $("#copy-btn");
  const shareBtn = $("#share-btn");
  const saveBtn = $("#save-btn");
  const nextBtn = $("#next-btn");
  const toastEl = $("#toast");
  const favoritesList = $("#favorites-list");
  const favoritesEmpty = $("#favorites-empty");
  const historyList = $("#history-list");
  const historyEmpty = $("#history-empty");
  const statsGenerated = $("#stats-generated");
  const statsSaved = $("#stats-saved");
  const statsBurned = $("#stats-burned");

  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* ---------------- Intensity ---------------- */
  function setIntensity(level) {
    currentIntensity = level;
    $$(".intensity-btn").forEach(btn => {
      const active = Number(btn.dataset.level) === level;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const info = INTENSITY[level];
    const desc = $("#intensity-desc");
    if (desc) desc.textContent = info.emoji + " " + info.label + " — " + info.desc;
    const slider = $("#intensity-range");
    if (slider) slider.value = level;
  }

  /* ---------------- Category ---------------- */
  function setCategory(cat, scope) {
    currentCategory = cat;
    const root = scope || document;
    $$(".category-chip", root).forEach(chip => {
      const active = chip.dataset.category === cat;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  /* ---------------- Burn meter ---------------- */
  function renderBurn(intensity) {
    const pct = (intensity / 4) * 100;
    if (burnFill) burnFill.style.width = pct + "%";
    if (burnLabel) {
      const info = INTENSITY[intensity];
      burnLabel.textContent = info.emoji + " " + info.label + " · " + pct + "% toasted";
    }
  }

  /* ---------------- Roast display ---------------- */
  function displayRoast(roast, opts) {
    opts = opts || {};
    currentRoast = roast;
    if (!roastOutput || !roastText) return;

    roastOutput.classList.remove("is-empty");
    roastOutput.classList.remove("pop");
    void roastOutput.offsetWidth; /* restart animation */
    roastOutput.classList.add("pop");

    /* Swap the empty state for the roast content. */
    const emptyIcon = $(".roast-empty-icon", roastOutput);
    const emptyText = $(".roast-empty-text", roastOutput);
    if (emptyIcon) emptyIcon.hidden = true;
    if (emptyText) emptyText.hidden = true;
    ["roast-text", "roast-meta", "burn-meter", "roast-actions"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.hidden = false;
    });

    roastText.textContent = roast.text;
    const cat = CATEGORIES.find(c => c.id === roast.category);
    if (roastMeta) {
      roastMeta.innerHTML =
        '<span class="tag">' + (cat ? cat.emoji + " " + cat.label : roast.category) + '</span>' +
        '<span class="tag tag-heat">' + INTENSITY[roast.intensity].emoji + " " + INTENSITY[roast.intensity].label + '</span>';
    }
    renderBurn(roast.intensity);

    if (saveBtn) {
      const saved = favorites.some(f => f.text === roast.text);
      saveBtn.classList.toggle("saved", saved);
      saveBtn.innerHTML = saved
        ? '<span aria-hidden="true">❤️</span> Saved'
        : '<span aria-hidden="true">🤍</span> Save roast';
    }

    if (!opts.silent) {
      generatedCount += 1;
      store.set("tr_generated", generatedCount);
      history.unshift({ text: roast.text, at: Date.now() });
      if (history.length > 12) history.length = 12;
      store.set("tr_history", history);
      renderHistory();
      renderStats();
    }
  }

  /* ---------------- Toaster animation ---------------- */
  function fireToaster(done) {
    if (!toaster) { done(); return; }
    toaster.classList.remove("toasting", "popped");
    void toaster.offsetWidth;
    toaster.classList.add("toasting");
    setTimeout(() => {
      toaster.classList.remove("toasting");
      toaster.classList.add("popped");
      done();
      setTimeout(() => toaster.classList.remove("popped"), 900);
    }, 650);
  }

  /* ---------------- Generate ---------------- */
  function generateRoast() {
    const name = (nameInput.value || "").trim() || "our friend";
    currentName = name;
    generateBtn.disabled = true;
    generateBtn.classList.add("busy");
    fireToaster(() => {
      const roast = pickRoast({
        name,
        category: currentCategory,
        maxIntensity: currentIntensity,
        exclude: recentTexts
      });
      recentTexts.push(roast.text);
      if (recentTexts.length > 20) recentTexts.shift();
      displayRoast(roast);
      generateBtn.disabled = false;
      generateBtn.classList.remove("busy");
    });
  }

  function roastMe() {
    generateBtn.disabled = true;
    fireToaster(() => {
      const roast = pickSelfRoast(currentIntensity, recentTexts);
      recentTexts.push(roast.text);
      if (recentTexts.length > 20) recentTexts.shift();
      displayRoast(roast);
      generateBtn.disabled = false;
    });
  }

  /* ---------------- Copy / share / save ---------------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { /* no-op */ }
      document.body.removeChild(ta);
      return ok;
    }
  }

  function shareText(text) {
    const shareData = { title: "Toaster Roaster", text: text + " — roasted by Toaster Roaster 🔥" };
    if (navigator.share) {
      navigator.share(shareData).catch(() => { /* user cancelled */ });
    } else {
      const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareData.text);
      window.open(url, "_blank", "noopener,width=600,height=460");
    }
  }

  function toggleSaveCurrent() {
    if (!currentRoast) { showToast("Generate a roast first!"); return; }
    const idx = favorites.findIndex(f => f.text === currentRoast.text);
    if (idx >= 0) {
      favorites.splice(idx, 1);
      showToast("Removed from favorites");
    } else {
      favorites.unshift({ text: currentRoast.text, at: Date.now() });
      showToast("Saved to favorites ❤️");
    }
    store.set("tr_favorites", favorites);
    renderFavorites();
    renderStats();
    displayRoast(currentRoast, { silent: true });
  }

  /* ---------------- Favorites & history ---------------- */
  function renderFavorites() {
    if (!favoritesList) return;
    favoritesList.innerHTML = "";
    if (favoritesEmpty) favoritesEmpty.classList.toggle("hidden", favorites.length > 0);
    favorites.forEach((fav, i) => {
      const li = document.createElement("li");
      li.className = "fav-item";
      li.innerHTML =
        '<p class="fav-text">“' + escapeHtml(fav.text) + '”</p>' +
        '<div class="fav-actions">' +
        '<button class="mini-btn" data-act="copy" aria-label="Copy roast">📋 Copy</button>' +
        '<button class="mini-btn danger" data-act="del" aria-label="Remove roast">🗑 Remove</button>' +
        '</div>';
      li.querySelector('[data-act="copy"]').addEventListener("click", async () => {
        await copyText(fav.text);
        showToast("Copied to clipboard 📋");
      });
      li.querySelector('[data-act="del"]').addEventListener("click", () => {
        favorites.splice(i, 1);
        store.set("tr_favorites", favorites);
        renderFavorites();
        renderStats();
        if (currentRoast) displayRoast(currentRoast, { silent: true });
        showToast("Removed from favorites");
      });
      favoritesList.appendChild(li);
    });
  }

  function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = "";
    if (historyEmpty) historyEmpty.classList.toggle("hidden", history.length > 0);
    history.slice(0, 8).forEach(item => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = '<span class="history-dot" aria-hidden="true">🔥</span><span>' + escapeHtml(item.text) + '</span>';
      historyList.appendChild(li);
    });
  }

  function renderStats() {
    if (statsGenerated) statsGenerated.textContent = generatedCount.toLocaleString();
    if (statsSaved) statsSaved.textContent = favorites.length.toLocaleString();
    if (statsBurned) statsBurned.textContent = (ROASTS.length + SELF_ROASTS.length).toLocaleString();
  }

  /* ---------------- Daily roast ---------------- */
  function renderDaily() {
    const el = $("#daily-roast-text");
    if (!el) return;
    const roast = dailyRoast();
    el.textContent = "“" + roast.text + "”";
    const btn = $("#daily-copy");
    if (btn) {
      btn.onclick = async () => {
        await copyText(roast.text);
        showToast("Daily roast copied 📋");
      };
    }
  }

  /* ---------------- Roast battle ---------------- */
  function runBattle() {
    const a = ($("#battle-name-a").value || "").trim() || "Contender A";
    const b = ($("#battle-name-b").value || "").trim() || "Contender B";
    const out = $("#battle-output");
    const btn = $("#battle-btn");
    if (!out) return;
    btn.disabled = true;
    btn.classList.add("busy");
    out.innerHTML = '<p class="battle-status">🥊 The toaster is heating up…</p>';
    setTimeout(() => {
      const rounds = [];
      const used = [];
      for (let r = 0; r < 3; r++) {
        [a, b].forEach((attacker, idx) => {
          const defender = idx === 0 ? b : a;
          const roast = pickRoast({ name: defender, category: "all", maxIntensity: currentIntensity, exclude: used });
          used.push(roast.text);
          rounds.push({ attacker, text: roast.text });
        });
      }
      out.innerHTML = rounds.map((round, i) =>
        '<div class="battle-line' + (i % 2 ? " right" : " left") + '">' +
        '<span class="battle-who">' + escapeHtml(round.attacker) + '</span>' +
        '<p>“' + escapeHtml(round.text) + '”</p>' +
        '</div>'
      ).join("") +
      '<p class="battle-verdict">🏆 The crowd goes wild. Both of you lost.</p>';
      const copyBattleBtn = $("#battle-copy");
      if (copyBattleBtn) {
        copyBattleBtn.classList.remove("hidden");
        copyBattleBtn.onclick = async () => {
          const text = rounds.map(r => r.attacker + ": " + r.text).join("\n");
          await copyText("🥊 ROAST BATTLE — " + a + " vs " + b + "\n\n" + text);
          showToast("Battle copied 📋");
        };
      }
      btn.disabled = false;
      btn.classList.remove("busy");
    }, 700);
  }

  /* ---------------- Browse by category ---------------- */
  function bindBrowseChips() {
    $$(".browse-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        setCategory(chip.dataset.category, $("#generator"));
        nameInput.focus();
        const target = $("#generator");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("Category set: " + chip.textContent.trim());
      });
    });
  }

  /* ---------------- Target presets ---------------- */
  function bindPresets() {
    $$(".preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        nameInput.value = btn.dataset.name || "";
        nameInput.focus();
      });
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function bindReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach(el => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  /* ---------------- Nav ---------------- */
  function bindNav() {
    const toggle = $("#nav-toggle");
    const menu = $("#mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", menu).forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
    }
    const header = $("#site-header");
    if (header) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 12);
      }, { passive: true });
    }
  }

  /* ---------------- Wire up ---------------- */
  function init() {
    setIntensity(2);
    setCategory("all");
    renderFavorites();
    renderHistory();
    renderStats();
    renderDaily();
    bindBrowseChips();
    bindPresets();
    bindReveal();
    bindNav();

    if (generateBtn) generateBtn.addEventListener("click", generateRoast);
    if (roastMeBtn) roastMeBtn.addEventListener("click", roastMe);
    if (nameInput) {
      nameInput.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); generateRoast(); }
      });
    }
    if (copyBtn) copyBtn.addEventListener("click", async () => {
      if (!currentRoast) return;
      await copyText(currentRoast.text);
      showToast("Copied to clipboard 📋");
    });
    if (shareBtn) shareBtn.addEventListener("click", () => {
      if (!currentRoast) return;
      shareText(currentRoast.text);
    });
    if (saveBtn) saveBtn.addEventListener("click", toggleSaveCurrent);
    if (nextBtn) nextBtn.addEventListener("click", generateRoast);

    $$(".intensity-btn").forEach(btn => {
      btn.addEventListener("click", () => setIntensity(Number(btn.dataset.level)));
    });
    const slider = $("#intensity-range");
    if (slider) slider.addEventListener("input", () => setIntensity(Number(slider.value)));

    $$(".category-chip").forEach(chip => {
      chip.addEventListener("click", () => setCategory(chip.dataset.category));
    });

    const battleBtn = $("#battle-btn");
    if (battleBtn) battleBtn.addEventListener("click", runBattle);

    const clearFavBtn = $("#clear-favorites");
    if (clearFavBtn) clearFavBtn.addEventListener("click", () => {
      if (favorites.length === 0) return;
      favorites.length = 0;
      store.set("tr_favorites", favorites);
      renderFavorites();
      renderStats();
      if (currentRoast) displayRoast(currentRoast, { silent: true });
      showToast("Favorites cleared");
    });

    const clearHistBtn = $("#clear-history");
    if (clearHistBtn) clearHistBtn.addEventListener("click", () => {
      history.length = 0;
      store.set("tr_history", history);
      renderHistory();
      showToast("History cleared");
    });

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
