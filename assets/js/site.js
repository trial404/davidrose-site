/* ==========================================================================
   YOUR NAME — behaviour
   --------------------------------------------------------------------------
   1. nav rendering          5. scroll reveal
   2. page-transition veil   6. misc (year, ticker)
   3. small helpers          7. renderers — every list drawn from data.js
   4. print detail panel     8. page modules — faq, timeline, press, feature
   ========================================================================== */

(function () {
  "use strict";

  var D = window.MEDIA || {};
  var C = window.COPY || {};
  var L = window.LINKS || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var currentPage = document.body.dataset.world || "home";

  /* ---------- helpers ---------- */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* world -> colour for the page veil. D.worlds is the single source: the nav
     bar, the index rows and the transition all read from it, so a world cannot
     be one colour in the bar and another in the transition. The old hard-coded
     map here still pointed writing at yellow and about at --red, a colour that
     left the palette — which is why one veil was the wrong colour and the
     other was invisible. */
  function worldColor(id) {
    var worlds = D.worlds || [];
    for (var i = 0; i < worlds.length; i++) {
      if (worlds[i].id === id) return worlds[i].color;
    }
    /* the legal pages live in the About world */
    if (id === "imprint" || id === "privacy" || id === "terms") {
      return worldColor("about");
    }
    return worlds.length ? worlds[0].color : "var(--blue)";
  }

  function worldInkOn(id) {
    return id === "about" ? "#090908" : "#ffffff";
  }

  /* ---------- 1. nav ---------- */

  function buildNav() {
    var mount = document.querySelector("[data-nav]");
    if (!mount || !D.worlds) return;

    D.worlds.forEach(function (w) {
      var a = el("a");
      a.href = w.href;
      a.style.setProperty("--c", w.color);
      a.style.setProperty("--ink-on", worldInkOn(w.id));
      a.dataset.world = w.id;
      var label = '<span class="num">' + esc(w.num) + "</span>" + esc(w.name);
      a.innerHTML =
        '<span class="roll-inner">' +
          '<span class="roll-face">' + label + "</span>" +
          '<span class="roll-face roll-face--alt" aria-hidden="true">' + label + "</span>" +
        "</span>";
      if (w.id === currentPage) a.setAttribute("aria-current", "page");
      mount.appendChild(a);
    });
  }

  /* ---------- 2. rounded cotton-paper veil transition ----------
     Weighted accel-decel S-curve sheet gliding cleanly across the studio table. */

  var veil = null;

  function initVeil() {
    veil = document.querySelector("[data-veil]");
    if (!veil || reduceMotion) return;

    veil.style.background = worldColor(currentPage);
    veil.style.transition = "none";
    veil.style.opacity = "1";
    veil.style.borderRadius = "0px";
    veil.style.transform = "translate3d(0, 0, 0) scale(1)";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        veil.style.transition =
          "transform .56s cubic-bezier(.65, 0, .35, 1), border-radius .56s cubic-bezier(.65, 0, .35, 1)";
        veil.style.borderRadius = "48px";
        veil.style.transform = "translate3d(0, -118vh, 0) scale(.96)";
        window.setTimeout(function () {
          veil.style.opacity = "0";
        }, 580);
      });
    });

    document.addEventListener("click", onLinkClick);
  }

  function onLinkClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;

    var href = a.getAttribute("href");
    if (!href) return;
    if (href.charAt(0) === "#") return;
    if (/^(mailto:|tel:|https?:)/i.test(href)) return;

    var url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== location.origin) return;

    e.preventDefault();

    var target = a.dataset.world || urlToWorld(url.pathname);

    veil.style.background = worldColor(target);
    veil.style.transition = "none";
    veil.style.opacity = "1";
    veil.style.borderRadius = "48px";
    veil.style.transform = "translate3d(0, 118vh, 0) scale(.96)";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        veil.style.transition =
          "transform .44s cubic-bezier(.65, 0, .35, 1), border-radius .44s cubic-bezier(.65, 0, .35, 1)";
        veil.style.borderRadius = "0px";
        veil.style.transform = "translate3d(0, 0, 0) scale(1)";
        window.setTimeout(function () {
          location.href = url.href;
        }, 440);
      });
    });
  }

  function urlToWorld(pathname) {
    var file = pathname.split("/").pop().replace(/\.html$/, "");
    if (file === "" || file === "index") return "home";
    return file;
  }

  /* ---------- 4. print detail panel ---------- */

  var panel = null;
  var lastFocus = null;

  function buildPanel() {
    if (!document.querySelector("[data-panel]")) return;
    panel = document.querySelector("[data-panel]");
    lastFocus = null;

    panel.addEventListener("click", function (e) {
      if (e.target === panel) closePanel();
    });

    panel.addEventListener("close", function () {
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.open) closePanel();
    });
  }

  function closePanel() {
    if (panel && panel.open) panel.close();
  }

  function openPanel(printId) {
    var print = (D.prints || []).filter(function (p) { return p.id === printId; })[0];
    if (!print || !panel) return;

    lastFocus = document.activeElement;

    var body = panel.querySelector("[data-panel-body]");
    var head = panel.querySelector("[data-panel-head]");
    if (head) head.style.background = "var(--world)";

    body.innerHTML = buildPanelHTML(print);

    var shot = body.querySelector(".panel-shot");
    if (shot) shot.style.aspectRatio = print.ar || "4 / 3";

    var img = body.querySelector(".panel-shot img");
    if (img) {
      img.addEventListener("error", function () {
        img.remove();
      });
    }

    var sizeBtns = Array.prototype.slice.call(body.querySelectorAll(".size-opt"));
    var buyBtn = body.querySelector("[data-buy]");
    var priceOut = body.querySelector("[data-price]");
    var dimsOut = body.querySelector("[data-dims]");

    function select(btn) {
      sizeBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");

      var s = print.sizes[Number(btn.dataset.i)];
      if (priceOut) priceOut.textContent = s.price;
      if (dimsOut) dimsOut.textContent = s.cm + "  ·  " + s.inches;
      if (buyBtn) {
        var live = s.link && s.link !== "#";
        if (live) {
          buyBtn.href = s.link;
          buyBtn.textContent = "Buy print";
          buyBtn.setAttribute("aria-disabled", "false");
          buyBtn.setAttribute("target", "_blank");
          buyBtn.setAttribute("rel", "noopener");
        } else if (L.email) {
          var subj = encodeURIComponent("Print inquiry — " + print.title + " (" + s.cm + ")");
          buyBtn.href = "mailto:" + L.email + "?subject=" + subj;
          buyBtn.textContent = "Inquire about this print";
          buyBtn.setAttribute("aria-disabled", "false");
          buyBtn.removeAttribute("target");
          buyBtn.removeAttribute("rel");
        } else {
          buyBtn.href = "#";
          buyBtn.textContent = "Available by request";
          buyBtn.setAttribute("aria-disabled", "true");
        }
      }
    }

    sizeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () { select(btn); });
    });

    if (sizeBtns.length) select(sizeBtns[0]);

    if (typeof panel.showModal === "function") {
      panel.showModal();
    } else {
      panel.setAttribute("open", "");
    }

    panel.scrollTop = 0;

    var close = panel.querySelector(".panel-close");
    if (close) close.focus();
  }

  function buildPanelHTML(p) {
    var sizes = (p.sizes || []).map(function (s, i) {
      return (
        '<button class="size-opt" type="button" data-i="' + i + '" aria-pressed="false">' +
          '<span class="label">' + esc(s.label) + "</span>" +
          '<span class="dim">' + esc(s.cm) + "  ·  " + esc(s.inches) + "</span>" +
          '<span class="p">' + esc(s.price) + "</span>" +
        "</button>"
      );
    }).join("");

    var img = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">'
      : "";

    var specRows = [
      ["Paper", p.paper],
      ["Edition", p.edition],
      ["Delivery", p.delivery]
    ].filter(function (r) { return r[1]; }).map(function (r) {
      return '<div><span class="k">' + esc(r[0]) + '</span><span class="v">' + esc(r[1]) + "</span></div>";
    }).join("");

    return (
      '<div class="panel-shot">' + img + "</div>" +
      '<div class="panel-title">' +
        '<p class="series">' + esc(p.series || "") + "</p>" +
        "<h2>" + esc(p.title) + "</h2>" +
      "</div>" +
      '<p class="panel-desc">' + esc(p.description || "") + "</p>" +
      '<div class="field">' +
        '<p class="label">Size</p>' +
        '<div class="sizes">' + sizes + "</div>" +
      "</div>" +
      '<dl class="spec-list">' + specRows + "</dl>" +
      '<div class="panel-buy">' +
        '<div class="buy-note">' +
          "<span>Selected</span>" +
          "<span><span data-price>—</span> · <span data-dims>—</span></span>" +
        "</div>" +
        '<a class="btn btn--solid btn--wide" data-buy href="#">Add to basket</a>' +
      "</div>"
    );
  }

  /* ---------- 5. scroll reveal ---------- */

  function initReveal(root) {
    var scope = root || document;
    var items = Array.prototype.slice.call(scope.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    items.forEach(function (n, i) {
      if (!n.style.getPropertyValue("--d")) {
        n.style.setProperty("--d", (i % 3) * 60 + "ms");
      }
      io.observe(n);
    });
  }

  /* ---------- 6. misc ---------- */

  function initTicker() {
    var track = document.querySelector("[data-ticker]");
    if (!track) return;
    track.innerHTML += track.innerHTML; /* duplicate for a seamless loop */
  }

  function initYear() {
    Array.prototype.slice.call(document.querySelectorAll("[data-year]")).forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
  }

  function initBrand() {
    Array.prototype.slice.call(document.querySelectorAll("[data-brand]")).forEach(function (n) {
      var name = D.name || "David Rose";
      if (n.classList && n.classList.contains("brand")) {
        n.innerHTML =
          '<span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
          esc(name);
      } else {
        n.textContent = name;
      }
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-role]")).forEach(function (n) {
      n.textContent = D.role || "";
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-email]")).forEach(function (n) {
      if (!L.email) return;
      n.textContent = L.email;
      n.href = "mailto:" + L.email;
    });
  }

  /* ---------- 7. renderers ----------
     Each list on the site is drawn from media.js. If a mount point isn't on the
     page, the renderer does nothing. */

  function imgOrLabel(item) {
    if (item.image) {
      return '<img src="' + esc(item.image) + '" alt="' + esc(item.title || item.label || "") + '" loading="lazy">';
    }
    return '<span class="tl">' + esc(item.label || "Image") + "</span>";
  }

  function renderWorlds() {
    var mount = document.querySelector("[data-worlds]");
    if (!mount || !D.worlds) return;

    mount.innerHTML = D.worlds.map(function (w) {
      var isYellow = w.id === "about";
      var inkOn = isYellow ? "#090908" : "#ffffff";
      var inkOnSoft = isYellow ? "rgba(9,9,8,.76)" : "rgba(255,255,255,.86)";
      var ruleOn = isYellow ? "rgba(9,9,8,.22)" : "rgba(255,255,255,.28)";
      var isBooks = w.id === "writing";

      var previews = (w.previews || []).filter(function (p) { return p.image; }).slice(0, 2);
      var plates = previews.map(function (p) {
        return (
          '<span class="inner-plate' + (isBooks ? " inner-plate--book" : "") + '">' +
            '<span class="ip-img">' + imgOrLabel(p) + "</span>" +
            '<span class="ip-cap">' + esc(p.label || "") + "</span>" +
          "</span>"
        );
      }).join("");

      return (
        '<a class="folio reveal" style="--c:' + esc(w.color) +
          "; --ink-on:" + inkOn +
          "; --ink-on-soft:" + inkOnSoft +
          "; --rule-on:" + ruleOn + '" ' +
          'href="' + esc(w.href) + '" data-world="' + esc(w.id) + '">' +
          '<span class="folio-pigment-wash" aria-hidden="true"></span>' +
          '<span class="folio-grain" aria-hidden="true"></span>' +
          '<span class="folio-sheen" aria-hidden="true"></span>' +
          '<span class="folio-content">' +
            '<span class="folio-top">' +
              '<span class="folio-badge">' + esc(w.num) + " — " + esc(w.name) + "</span>" +
              '<span class="folio-count">' + esc(w.count || "") + "</span>" +
            "</span>" +
            '<span class="folio-head">' +
              '<span class="folio-title">' + esc(w.name) + "</span>" +
              '<span class="folio-blurb">' + esc(w.blurb) + "</span>" +
            "</span>" +
            '<span class="folio-plates">' + plates + "</span>" +
            '<span class="folio-foot">' +
              "<span>" + esc(w.cta || ("Enter " + w.name)) + "</span>" +
              '<span aria-hidden="true">→</span>' +
            "</span>" +
          "</span>" +
        "</a>"
      );
    }).join("");

    /* weighted smooth 3D tilt + moving paper sheen */
    Array.prototype.forEach.call(mount.querySelectorAll(".folio"), function (card) {
      var curRx = 0, curRy = 0, tgtRx = 0, tgtRy = 0, active = false;

      function animateTilt() {
        curRx += (tgtRx - curRx) * 0.08;
        curRy += (tgtRy - curRy) * 0.08;
        card.style.setProperty("--rx", curRx.toFixed(2) + "deg");
        card.style.setProperty("--ry", curRy.toFixed(2) + "deg");
        if (active || Math.abs(tgtRx - curRx) > 0.02 || Math.abs(tgtRy - curRy) > 0.02) {
          requestAnimationFrame(animateTilt);
        }
      }

      card.addEventListener("mouseenter", function () {
        if (reduceMotion) return;
        if (!active) { active = true; requestAnimationFrame(animateTilt); }
      });
      card.addEventListener("mousemove", function (e) {
        if (reduceMotion) return;
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        tgtRx = (0.5 - py) * 4.4;
        tgtRy = (px - 0.5) * 4.4;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      card.addEventListener("mouseleave", function () {
        active = false;
        tgtRx = 0;
        tgtRy = 0;
        requestAnimationFrame(animateTilt);
      });
    });
  }

  /* ---------- 7b. gallery: tabs, collections, lightbox ----------
     Four ways to browse. Each tab floods the field with its own colour and draws
     only its own content, so nothing is buried under everything else. */

  var galleryTab = "landscape";

  function findSeries(id) {
    var list = D.series || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function findPhoto(id) {
    var list = D.photos || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function photosIn(setId) {
    return (D.photos || []).filter(function (p) {
      return (p.sets || []).indexOf(setId) !== -1;
    });
  }

  function photoHTML(p, i) {
    var n = String(i + 1).padStart(2, "0");
    var inner = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async">'
      : '<span class="ph-idx">' + n + "</span>";
    return (
      '<button class="photo reveal" type="button" data-photo="' + esc(p.id) + '" ' +
        'aria-label="' + esc(p.title) + " — view larger" + '">' +
        '<span class="photo-idx">[' + n + "]</span>" +
        '<span class="photo-frame" style="--ar:' + esc(p.ar || "4 / 3") + '">' + inner + "</span>" +
      "</button>"
    );
  }

  function printCardHTML(p) {
    var from = p.sizes && p.sizes.length ? p.sizes[0].price : "";
    var img = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">'
      : "";
    return (
      '<button class="print-card reveal" type="button" data-open-print="' + esc(p.id) + '" ' +
        'aria-label="' + esc(p.title) + " — view sizes and prices" + '">' +
        '<span class="shot" style="--ar:' + esc(p.ar || "4 / 3") + '">' + img + "</span>" +
        '<span class="meta">' +
          '<span class="ttl">' + esc(p.title) + "</span>" +
          '<span class="sub"><span>' + esc(p.series || "") + "</span><span>from " + esc(from) + "</span></span>" +
        "</span>" +
      "</button>"
    );
  }

  function collectionsHTML() {
    return (D.collections || []).map(function (c) {
      var items = (c.photos || []).map(findPhoto).filter(Boolean);
      if (!items.length) return "";
      return (
        '<section class="collection">' +
          '<div class="collection-head">' +
            "<h3>" + esc(c.name) + "</h3>" +
            '<p class="muted">' + esc(c.note || "") + "</p>" +
            '<p class="label muted">' + items.length +
              (items.length === 1 ? " photograph" : " photographs") + "</p>" +
          "</div>" +
          '<div class="photo-grid">' + items.map(photoHTML).join("") + "</div>" +
        "</section>"
      );
    }).join("");
  }

  function renderGalleryBody() {
    var mount = document.querySelector("[data-gallery]");
    if (!mount) return;

    var s = findSeries(galleryTab) || { name: "", blurb: "", color: "var(--blue)" };

    var section = document.querySelector("[data-gallery-section]");
    if (section) {
      var tint = s.color === "var(--paper)" ? (s.contrast || "var(--yellow)") : s.color;
      var tintInk = tint === "var(--yellow)" ? "#090908" : "#ffffff";
      section.style.setProperty("--tint", tint);
      section.style.setProperty("--tint-ink", tintInk);
      section.style.setProperty("--contrast", s.contrast || "var(--ink-hard)");
    }

    var title = document.querySelector("[data-gallery-title]");
    if (title) title.textContent = s.name;
    var aside = document.querySelector("[data-gallery-aside]");
    if (aside) aside.textContent = s.blurb || "";

    var ids = (D.series || []).map(function (x) { return x.id; });
    var pos = ids.indexOf(galleryTab) + 1;
    var kicker = document.querySelector("[data-gallery-kicker]");
    if (kicker) kicker.textContent = "Browse — " + String(pos).padStart(2, "0");

    var n;

    if (galleryTab === "shop") {
      mount.className = "grid-prints";
      mount.innerHTML = (D.prints || []).map(printCardHTML).join("");
      n = (D.prints || []).length;
    } else if (galleryTab === "collections") {
      mount.className = "collections";
      mount.innerHTML = collectionsHTML();
      n = (D.collections || []).length;
    } else {
      mount.className = "photo-grid";
      mount.innerHTML = photosIn(galleryTab).map(photoHTML).join("");
      n = photosIn(galleryTab).length;
    }

    var count = document.querySelector("[data-gallery-count]");
    if (count) {
      var unit = galleryTab === "collections" ? (n === 1 ? " collection" : " collections")
               : galleryTab === "shop" ? (n === 1 ? " print" : " prints")
               : (n === 1 ? " photograph" : " photographs");
      count.textContent = n + unit;
    }

    initReveal(mount);
  }

  function renderGalleryTabs() {
    var mount = document.querySelector("[data-gallery-tabs]");
    if (!mount || !D.series) return;

    mount.innerHTML = D.series.map(function (s, i) {
      return (
        '<button class="tab" type="button" data-tab="' + esc(s.id) + '" ' +
          'aria-pressed="' + (s.id === galleryTab ? "true" : "false") + '">' +
          '<span class="tab-n">' + String(i + 1).padStart(2, "0") + "</span>" +
          esc(s.name) +
        "</button>"
      );
    }).join("");

    mount.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".tab") : null;
      if (!btn) return;
      galleryTab = btn.dataset.tab;
      Array.prototype.forEach.call(mount.querySelectorAll(".tab"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.tab === galleryTab ? "true" : "false");
      });
      renderGalleryBody();
    });
  }

  var lightbox = null;
  var lightboxList = [];
  var lightboxIdx = -1;
  var lightboxLastFocus = null;

  function cleanField(v) {
    if (!v) return "";
    var s = String(v).trim();
    if (/^\[.*\]$/.test(s)) return "";
    return s;
  }

  function findPrint(id) {
    var list = D.prints || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function renderLightboxItem(id) {
    var p = findPhoto(id);
    if (!p || !lightbox) return;

    var img = lightbox.querySelector("[data-lightbox-img]");
    if (img) {
      img.src = p.image || "";
      img.alt = p.title;
      img.style.setProperty("--ar", p.ar || "4 / 3");
    }

    function put(sel, value) {
      var node = lightbox.querySelector(sel);
      if (!node) return;
      var clean = cleanField(value);
      node.textContent = clean;
      var row = node.closest ? node.closest("div") : null;
      if (row && row.parentElement && row.parentElement.classList.contains("lightbox-facts")) {
        row.style.display = clean ? "" : "none";
      }
    }

    put("[data-lightbox-title]", p.title);
    put("[data-lightbox-location]", p.location);
    put("[data-lightbox-date]", p.date);
    put("[data-lightbox-desc]", p.description);

    var posOut = lightbox.querySelector("[data-lightbox-pos]");
    if (posOut) {
      posOut.textContent = lightboxList.length > 1
        ? String(lightboxIdx + 1).padStart(2, "0") + " / " + String(lightboxList.length).padStart(2, "0")
        : "";
    }

    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    if (prevBtn) prevBtn.hidden = lightboxList.length <= 1;
    if (nextBtn) nextBtn.hidden = lightboxList.length <= 1;

    var printBtn = lightbox.querySelector("[data-lightbox-print]");
    if (printBtn) {
      var hasPrint = !!findPrint(p.id);
      printBtn.hidden = !hasPrint;
      printBtn.dataset.printId = hasPrint ? p.id : "";
    }
  }

  function openLightbox(id) {
    var p = findPhoto(id);
    if (!p || !lightbox) return;

    lightboxLastFocus = document.activeElement;
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-gallery] [data-photo]"));
    lightboxList = buttons.map(function (b) { return b.dataset.photo; }).filter(function (v, idx, arr) {
      return arr.indexOf(v) === idx;
    });
    lightboxIdx = lightboxList.indexOf(id);
    if (lightboxIdx === -1) {
      lightboxList = [id];
      lightboxIdx = 0;
    }

    renderLightboxItem(id);

    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }

  function stepLightbox(delta) {
    if (!lightbox || !lightbox.open || lightboxList.length <= 1) return;
    lightboxIdx = (lightboxIdx + delta + lightboxList.length) % lightboxList.length;
    renderLightboxItem(lightboxList[lightboxIdx]);
  }

  function initLightbox() {
    lightbox = document.querySelector("[data-lightbox]");
    if (!lightbox) return;

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-photo]") : null;
      if (btn && !lightbox.contains(btn)) {
        e.preventDefault();
        openLightbox(btn.dataset.photo);
      }
    });

    /* clicking the empty space around the photograph closes it */
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox && lightbox.open) lightbox.close();
    });

    lightbox.addEventListener("close", function () {
      if (lightboxLastFocus && lightboxLastFocus.focus) lightboxLastFocus.focus();
    });

    var close = lightbox.querySelector(".lightbox-close");
    if (close) close.addEventListener("click", function () {
      if (lightbox.open) lightbox.close();
    });

    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    if (prevBtn) prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(-1);
    });

    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    if (nextBtn) nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(1);
    });

    var printBtn = lightbox.querySelector("[data-lightbox-print]");
    if (printBtn) printBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var pid = printBtn.dataset.printId;
      if (lightbox.open) lightbox.close();
      if (pid) openPanel(pid);
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox || !lightbox.open) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepLightbox(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepLightbox(1);
      }
    });
  }


  function renderPrints() {
    var mount = document.querySelector("[data-prints]");
    if (!mount || !D.prints) return;
    mount.innerHTML = D.prints.map(printCardHTML).join("");
  }

  function renderBooks(mountSel, list) {
    var mount = document.querySelector(mountSel);
    if (!mount || !list) return;

    mount.innerHTML = list.map(function (b, i) {
      var hasCover = !!b.cover;
      var cover = hasCover
        ? '<img src="' + esc(b.cover) + '" alt="' + esc(b.title) + '" loading="lazy">'
        : '<span class="cv-num">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="cv-ttl">' + esc(b.title) + "</span>";
      var actionsHTML = "";
      if (b.links && b.links.length) {
        actionsHTML =
          '<div class="book-actions">' +
            b.links.map(function (item) {
              var ext = String(item.url || "").charAt(0) === "h";
              return (
                '<a class="btn btn--wide" href="' + esc(item.url) + '"' +
                  (ext ? ' target="_blank" rel="noopener"' : "") +
                  ">" + esc(item.label) + "</a>"
              );
            }).join("") +
          "</div>";
      } else {
        var live = b.link && b.link !== "#";
        var href = live
          ? b.link
          : (L.email ? "mailto:" + L.email + "?subject=" + encodeURIComponent("Release note — " + b.title) : "#");
        var ctaLabel = live ? "Read the book" : (L.email ? "Ask for a release note" : "In progress");
        var disabled = !live && !L.email;
        actionsHTML =
          '<a class="btn btn--wide" href="' + esc(href) + '"' +
            ' aria-disabled="' + (disabled ? "true" : "false") + '"' +
            (live && String(b.link || "").charAt(0) === "h" ? ' target="_blank" rel="noopener"' : "") +
            ">" + esc(ctaLabel) + "</a>";
      }
      return (
        '<article class="book reveal" style="--c:' + esc(b.color || "var(--yellow)") + '">' +
          '<div class="cover' + (hasCover ? " cover--img" : "") + '">' +
            cover +
          "</div>" +
          '<div class="book-meta">' +
            '<h3 class="h3">' + esc(b.title) + "</h3>" +
            '<p class="muted">' + esc(b.subtitle || "") + "</p>" +
            "<p>" + esc(b.blurb || "") + "</p>" +
            '<p class="sub"><span>' + esc(b.format || "") + "</span><span>" + esc(b.price || "") + "</span></p>" +
            actionsHTML +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  function renderProjects() {
    var mount = document.querySelector("[data-projects]");
    if (!mount || !D.projects) return;

    mount.innerHTML = D.projects.map(function (p, i) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + "</span>";
      }).join("");
      var thumb = p.image
        ? '<span class="pthumb"><img src="' + esc(p.image) + '" alt="" loading="lazy" decoding="async"></span>'
        : "";
      var inner =
        '<span class="pidx">' + String(i + 1).padStart(2, "0") + "</span>" +
        thumb +
        '<span class="pbody">' +
          '<span class="pttl">' + esc(p.title) + "</span>" +
          '<span class="pdesc">' + esc(p.desc) + "</span>" +
        "</span>" +
        '<span class="ptags">' + tags + "</span>";

      return (
        '<button class="project reveal" type="button" data-open-project="' + esc(p.id) + '" ' +
          'aria-label="' + esc(p.title) + " — open screenshot and write-up" + '">' +
          inner +
        "</button>"
      );
    }).join("");
  }

  function renderTicker() {
    var track = document.querySelector("[data-ticker]");
    if (!track || !D.worlds) return;
    var words = D.worlds.map(function (w) { return esc(w.name); });
    words.push("The trilogy", "Canary Islands", "Pyrenees HRP", "5 personal apps", "Prints by request");
    track.innerHTML = words.map(function (w) { return "<span>" + w + "</span>"; }).join("");
  }

  /* ---------- page modules ---------- */

  function renderFaq() {
    var mount = document.querySelector("[data-faq]");
    if (!mount || !C.faq) return;

    mount.innerHTML = C.faq.map(function (f) {
      return (
        "<details class=\"faq\">" +
          "<summary>" + esc(f.q) + "</summary>" +
          '<div class="faq-a"><p>' + esc(f.a) + "</p></div>" +
        "</details>"
      );
    }).join("");
  }

  function renderTimeline() {
    var mount = document.querySelector("[data-timeline]");
    if (!mount || !C.timeline) return;

    mount.innerHTML = C.timeline.map(function (t) {
      return '<div><span class="yr">' + esc(t.year) + "</span><p>" + esc(t.text) + "</p></div>";
    }).join("");
  }

  function renderPress() {
    var mount = document.querySelector("[data-press]");
    if (!mount || !C.press) return;

    mount.innerHTML = C.press.map(function (p) {
      return (
        "<blockquote>" +
          "<p>“" + esc(p.quote) + "”</p>" +
          "<cite>" + esc(p.source) + "</cite>" +
        "</blockquote>"
      );
    }).join("");
  }

  function renderExcerpt() {
    var mount = document.querySelector("[data-excerpt]");
    if (!mount || !C.excerpt) return;

    var e = C.excerpt;
    mount.innerHTML =
      '<p class="label muted">' + esc(e.book) + " — " + esc(e.chapter) + "</p>" +
      "<p>“" + esc(e.text) + "”</p>" +
      '<p class="label muted">Continue in the book</p>';
  }

  function renderFeature() {
    var mount = document.querySelector("[data-feature]");
    if (!mount || !D.prints) return;

    var picks = (D.prints || []).slice(0, 5);
    if (!picks.length) return;

    mount.innerHTML = picks.map(function (p, i) {
      var from = p.sizes && p.sizes.length ? p.sizes[0].price + "+" : "";
      var img = p.image
        ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async">'
        : "";
      return (
        '<a class="rag-print reveal" href="photography.html?tab=shop&print=' + esc(p.id) + '" data-world="photography">' +
          '<span class="rp-frame">' + img + "</span>" +
          '<span class="rp-meta">' +
            "<span>" + String(i + 1).padStart(2, "0") + " · " + esc(p.title) + "</span>" +
            "<span>" + esc(from) + "</span>" +
          "</span>" +
        "</a>"
      );
    }).join("");
  }

  function initLegal() {
    if (!D.legal) return;
    Array.prototype.forEach.call(document.querySelectorAll("[data-legal]"), function (n) {
      var key = n.dataset.legal;
      if (D.legal[key] !== undefined) n.textContent = D.legal[key];
    });
  }

  /* ---------- 9. copy + links ----------
     copy.js holds every sentence, keyed <page>.<section>.<role>. media.js holds
     every path, price and link. These two functions join them to the markup. */

  var copyIndex = null;

  function flatten(src, prefix, out) {
    Object.keys(src).forEach(function (k) {
      var v = src[k];
      var key = prefix ? prefix + "." + k : k;
      if (v && typeof v === "object" && !Array.isArray(v)) {
        flatten(v, key, out);
      } else {
        out[key] = v;
      }
    });
    return out;
  }

  function applyCopy() {
    if (!copyIndex) copyIndex = flatten(C, "", {});
    Array.prototype.forEach.call(document.querySelectorAll("[data-copy-html]"), function (n) {
      var v = copyIndex[n.dataset.copyHtml];
      if (typeof v === "string") n.innerHTML = v;
    });
  }

  function linkMap() {
    var map = {};
    (L.social || []).forEach(function (s) {
      if (s.key && s.url) map[s.key] = s.url;
    });
    return map;
  }

  /* the footer list is generated from LINKS — add a line there and it appears
     on every page, with no markup to touch */
  function renderSocial() {
    var items = (L.social || []).filter(function (s) { return s.url; });
    Array.prototype.forEach.call(document.querySelectorAll("[data-social]"), function (ul) {
      ul.innerHTML = items.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
               esc(s.label) + "</a></li>";
      }).join("");
    });
  }

  function applyLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-link]"), function (n) {
      var k = n.dataset.link;
      var v = k === "email" ? L.email : linkMap()[k];
      if (!v) {
        /* no destination configured: hide it rather than leave a dead link */
        var host = n.closest ? n.closest("li") : null;
        (host || n).style.display = "none";
        return;
      }
      n.href = (k === "email" && String(v).indexOf("mailto:") !== 0) ? "mailto:" + v : v;
    });
  }

  /* ---------- 10. project detail panel ----------
     A project opens as a full write-up: overview, why, challenge, solution, where
     AI comes in, what is next. A field left blank in media.js simply disappears. */

  var projectPanel = null;

  var PROJECT_FIELDS = [
    ["Overview", "overview"],
    ["Why build it", "why"],
    ["The challenge", "challenge"],
    ["The solution", "solution"],
    ["Where AI comes in", "aiUse"],
    ["What I would change", "improvements"]
  ];

  function projectPanelHTML(p) {
    var d = p.details || {};

    var facts = PROJECT_FIELDS.filter(function (f) {
      return d[f[1]] && String(d[f[1]]).trim();
    }).map(function (f) {
      return '<div class="pp-row"><dt class="label muted">' + esc(f[0]) + "</dt>" +
             "<dd>" + esc(d[f[1]]) + "</dd></div>";
    }).join("");

    var tags = (p.tags || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");

    var meta = d.status
      ? '<div class="pp-meta"><div><span class="label muted">Status</span>' +
        "<span>" + esc(d.status) + "</span></div></div>"
      : "";

    var shot = p.image
      ? '<figure class="pp-shot"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' interface screenshot"></figure>'
      : "";

    var live = p.link && p.link !== "#";
    var footCta = live
      ? '<a class="btn btn--solid" href="' + esc(p.link) + '" target="_blank" rel="noopener">View the code</a>'
      : (L.email
          ? '<a class="btn btn--solid" href="mailto:' + esc(L.email) + '?subject=' + encodeURIComponent("About " + p.title) + '">Ask about this build</a>'
          : '<span class="btn" aria-disabled="true">Local build</span>');

    return (
      shot +
      '<div class="pp-head">' +
        "<h2>" + esc(p.title) + "</h2>" +
        '<p class="muted">' + esc(p.desc || "") + "</p>" +
        '<div class="pp-tags">' + tags + "</div>" +
      "</div>" +
      meta +
      '<dl class="pp-facts">' + facts + "</dl>" +
      '<div class="pp-foot">' + footCta + "</div>"
    );
  }

  function openProject(id) {
    if (!projectPanel) return;
    var found = null;
    (D.projects || []).forEach(function (x) { if (x.id === id) found = x; });
    if (!found) return;

    var body = projectPanel.querySelector("[data-project-body]");
    if (body) body.innerHTML = projectPanelHTML(found);

    if (typeof projectPanel.showModal === "function") projectPanel.showModal();
    else projectPanel.setAttribute("open", "");
    projectPanel.scrollTop = 0;
  }

  function initProjectPanel() {
    projectPanel = document.querySelector("[data-project-panel]");
    if (!projectPanel) return;

    projectPanel.addEventListener("click", function (e) {
      if (e.target === projectPanel) projectPanel.close();
    });

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-open-project]") : null;
      if (!btn) return;
      e.preventDefault();
      openProject(btn.dataset.openProject);
    });
  }

  /* ---------- photo words ----------
     media.js holds the mechanical record of each file; photos.js holds the words.
     Merged here so the rest of the code only ever sees one object. */

  function prettifyId(id) {
    return String(id).split("-").slice(1).join(" ").toUpperCase();
  }

  function applyPhotoInfo() {
    var info = window.PHOTO_INFO || {};
    Array.prototype.forEach.call(D.photos || [], function (p) {
      var m = info[p.id] || {};
      p.title = m.title || prettifyId(p.id);
      p.location = m.location || "";
      p.date = m.date || "";
      p.description = m.description || "";
    });
  }

  /* ---------- 10b. archive outline ----------
     The list beside the photography lede. Counted from media.js, so the numbers
     can never drift from the gallery further down the page. */

  function renderCatalogue() {
    var mount = document.querySelector("[data-catalogue]");
    if (!mount) return;

    var shots = D.photos || [];
    function bySeries(name) {
      return shots.filter(function (p) { return p.series === name; }).length;
    }
    function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

    var prints = D.prints || [];
    var onSale = prints.some(function (p) {
      return (p.sizes || []).some(function (z) { return z.link && z.link !== "#"; });
    });

    var rows = [
      { name: "Landscapes",      note: plural(bySeries("Landscape"), "photograph", "photographs"), tab: "landscape" },
      { name: "Art photography", note: plural(bySeries("Artistic"), "photograph", "photographs"),  tab: "artistic" },
      { name: "Collections",     note: plural((D.collections || []).length, "set", "sets"),        tab: "collections" },
      { name: "Photobooks",      note: plural((D.photobooks || []).length, "title", "titles"),     href: "#photobooks" },
      { name: "Prints",          note: prints.length + (onSale ? " available" : " · by request"),  tab: "shop" }
    ];

    mount.innerHTML = '<div class="meta">' + rows.map(function (r) {
      var inner =
        '<span class="label muted">' + esc(r.name) + "</span>" +
        '<span class="v">' + esc(r.note) + "</span>";
      return r.href
        ? '<a href="' + esc(r.href) + '">' + inner + "</a>"
        : '<button type="button" data-gallery-jump="' + esc(r.tab) + '">' + inner + "</button>";
    }).join("") + "</div>";

    mount.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-gallery-jump]") : null;
      if (!btn) return;
      var tab = document.querySelector('.tab[data-tab="' + btn.getAttribute("data-gallery-jump") + '"]');
      if (!tab) return;
      tab.click();
      var section = document.querySelector("[data-gallery-section]");
      if (section) {
        section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  }

  /* ---------- 11. counter-scrolling hero ribbon ----------
     Row 1: cryptic DAVID letterforms moving left (black -> primary colour on hover).
     Row 2: white-gutter photographs moving right (B&W duotone -> full colour on hover). */
  var HERO_GLYPHS = [
    { c: "var(--blue)",   d: "M0 15C0 6.71574 6.71573 0 15 0H200C282.843 0 350 67.1573 350 150V200C350 282.843 282.843 350 200 350H15C6.71574 350 0 343.284 0 335Z" },
    { c: "var(--red)",    d: "M15 350C6.71573 350 0 343.284 0 335V150C0 67.1573 67.1573 0 150 0H200C282.843 0 350 67.1573 350 150V335C350 343.284 343.284 350 335 350Z" },
    { c: "var(--green)",  d: "M335 0C343.284 0 350 6.71573 350 15V200C350 282.843 282.843 350 200 350H150C67.1573 350 0 282.843 0 200V15C0 6.71574 6.71574 0 15 0Z" },
    { c: "var(--yellow)", circle: true, d: "M15 350C6.71573 350 0 343.284 0 335V283C0 186.35 78.3499 108 175 108C271.65 108 350 186.35 350 283V335C350 343.284 343.284 350 335 350Z" },
    { c: "var(--blue)",   d: "M0 15C0 6.71574 6.71573 0 15 0H200C282.843 0 350 67.1573 350 150V200C350 282.843 282.843 350 200 350H15C6.71574 350 0 343.284 0 335Z" }
  ];

  var HERO_TINTS = ["var(--blue)", "var(--red)", "var(--green)", "var(--yellow)"];

  function initHero() {
    var trackL = document.querySelector("[data-hero-letters]");
    var trackP = document.querySelector("[data-hero-strip]");
    var specimen = document.getElementById("specimen");
    if (!trackL || !trackP) return;

    var unitL = "";
    for (var rep = 0; rep < 3; rep++) {
      HERO_GLYPHS.forEach(function (g) {
        unitL +=
          '<div class="glyph-tile" style="--c:' + g.c + '">' +
            '<svg viewBox="0 0 350 350" focusable="false">' +
              (g.circle ? '<circle cx="175" cy="-77" r="175"/>' : "") +
              '<path d="' + g.d + '"/>' +
            "</svg>" +
          "</div>";
      });
      unitL += '<div class="glyph-sep"></div>';
    }
    trackL.innerHTML = unitL + unitL;

    var shots = (D.photos || []).filter(function (p) { return p.image; });
    var picks = [
      findPhoto("landscape-h39a0377"),
      findPhoto("landscape-h39a1324"),
      findPhoto("artistic-frame-72-2"),
      findPhoto("landscape-h39a1639"),
      findPhoto("artistic-h39a6457"),
      findPhoto("landscape-h39a1763"),
      findPhoto("landscape-h39a1856"),
      findPhoto("artistic-h39a8846-1")
    ].filter(Boolean);
    if (!picks.length) picks = shots.slice(0, 8);

    var unitP = "";
    for (var r2 = 0; r2 < 2; r2++) {
      picks.forEach(function (p, idx) {
        var tint = HERO_TINTS[idx % HERO_TINTS.length];
        unitP += '<div class="photo-tile" style="--c:' + tint + '"><img src="' + esc(p.image) + '" alt="" decoding="async"></div>';
      });
    }
    trackP.innerHTML = unitP + unitP;

    if (reduceMotion) return;

    var offsetL = 0, offsetP = 0, speed = 0.46, targetSpeed = 0.46;
    if (specimen) {
      specimen.addEventListener("mouseenter", function () { targetSpeed = 0.12; });
      specimen.addEventListener("mouseleave", function () { targetSpeed = 0.46; });
    }

    function tick() {
      speed += (targetSpeed - speed) * 0.028;
      var halfL = trackL.scrollWidth / 2;
      var halfP = trackP.scrollWidth / 2;
      if (halfL > 0) {
        offsetL = (offsetL + speed) % halfL;
        trackL.style.transform = "translate3d(" + (-offsetL).toFixed(2) + "px, 0, 0)";
      }
      if (halfP > 0) {
        offsetP = (offsetP + speed * 0.85) % halfP;
        trackP.style.transform = "translate3d(" + (-halfP + offsetP).toFixed(2) + "px, 0, 0)";
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- boot ---------- */

  function boot() {
    applyPhotoInfo();
    applyCopy();
    applyLinks();
    renderSocial();

    buildNav();
    initBrand();

    /* render from data.js first — reveal observes what these create */
    renderWorlds();
    renderTicker();
    renderGalleryTabs();
    renderGalleryBody();
    renderCatalogue();
    renderPrints();
    renderFeature();
    renderBooks("[data-photobooks]", D.photobooks);
    renderBooks("[data-books]", D.books);
    renderProjects();
    renderFaq();
    renderTimeline();
    renderPress();
    renderExcerpt();
    initLegal();

    initTicker();
    initYear();
    initVeil();
    initReveal();
    buildPanel();
    initLightbox();
    initProjectPanel();
    initHero();

    /* support deep links like photography.html?tab=shop&print=landscape-h39a0377 */
    if (window.URLSearchParams) {
      var params = new URLSearchParams(location.search);
      var wantTab = params.get("tab");
      var wantPrint = params.get("print");
      if (wantTab) {
        var tabBtn = document.querySelector('.tab[data-tab="' + wantTab + '"]');
        if (tabBtn) tabBtn.click();
      }
      if (wantPrint) {
        openPanel(wantPrint);
      }
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-open-print]") : null;
      if (!btn) return;
      e.preventDefault();
      openPanel(btn.dataset.openPrint);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
