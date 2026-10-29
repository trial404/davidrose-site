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

  function worldColor(id) {
    var map = {
      photography: "var(--blue)",
      writing: "var(--yellow)",
      ai: "var(--green)",
      about: "var(--red)"
    };
    return map[id] || "var(--blue)";
  }

  /* ---------- 1. nav ---------- */

  function buildNav() {
    var mount = document.querySelector("[data-nav]");
    if (!mount || !D.worlds) return;

    D.worlds.forEach(function (w) {
      var a = el("a");
      a.href = w.href;
      a.style.setProperty("--c", w.color);
      a.dataset.world = w.id;
      a.innerHTML = '<span class="num">' + esc(w.num) + "</span>" + esc(w.name);
      if (w.id === currentPage) a.setAttribute("aria-current", "page");
      mount.appendChild(a);
    });
  }

  /* ---------- 2. page transition veil ----------
     The veil travels upward across every navigation: it rises over the old
     page, then keeps going up off the new one. One continuous motion. */

  var veil = null;

  function initVeil() {
    veil = document.querySelector("[data-veil]");
    if (!veil || reduceMotion) return;

    veil.style.background = worldColor(currentPage);
    veil.style.transition = "none";
    veil.style.transform = "translateY(0)";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        veil.style.transition = "transform .62s cubic-bezier(.22,1,.36,1)";
        veil.style.transform = "translateY(-101%)";
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
    veil.style.transition = "transform .52s cubic-bezier(.22,1,.36,1)";
    veil.style.transform = "translateY(0)";

    window.setTimeout(function () {
      location.href = url.href;
    }, 520);
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
      if (buyBtn) buyBtn.href = s.link || "#";
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

  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
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
      n.textContent = D.name || "David Rose";
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-role]")).forEach(function (n) {
      n.textContent = D.role || "";
    });
    Array.prototype.slice.call(document.querySelectorAll("[data-email]")).forEach(function (n) {
      n.textContent = D.email || "";
      n.href = "mailto:" + (D.email || "");
    });
  }

  /* ---------- 7. renderers ----------
     Each list on the site is drawn from data.js. If a mount point isn't on the
     page, the renderer does nothing. */

  function imgOrLabel(item, cls) {
    if (item.image) {
      return '<img src="' + esc(item.image) + '" alt="' + esc(item.title || item.label || "") + '" loading="lazy">';
    }
    return '<span class="tl">' + esc(item.label || "Image") + "</span>";
  }

  function renderWorlds() {
    var mount = document.querySelector("[data-worlds]");
    if (!mount || !D.worlds) return;

    mount.innerHTML = D.worlds.map(function (w) {
      var tiles = (w.previews || []).map(function (p) {
        return '<span class="tile">' + imgOrLabel(p) + "</span>";
      }).join("");

      return (
        '<a class="world-row reveal" style="--c:' + esc(w.color) + '" ' +
          'href="' + esc(w.href) + '" data-world="' + esc(w.id) + '">' +
          '<span class="wr-num">' + esc(w.num) + "</span>" +
          '<span class="wr-name">' + esc(w.name) +
            '<em class="wr-count">' + esc(w.count || "") + "</em>" +
          "</span>" +
          '<span class="wr-blurb">' + esc(w.blurb) + "</span>" +
          '<span class="wr-previews">' + tiles + "</span>" +
          '<span class="wr-cta" aria-hidden="true">→</span>' +
        "</a>"
      );
    }).join("");
  }

  function renderPhotos() {
    var mounts = Array.prototype.slice.call(document.querySelectorAll("[data-photos]"));
    if (!mounts.length || !D.photos) return;

    var colours = {};
    (D.series || []).forEach(function (s) { colours[s.name] = s.color; });

    mounts.forEach(function (mount) {
      /* data-only="Series name" renders just that series; otherwise everything */
      var only = mount.dataset.only;
      var list = only
        ? D.photos.filter(function (p) { return p.series === only; })
        : D.photos;

      var limit = parseInt(mount.dataset.limit, 10);
      if (limit > 0) list = list.slice(0, limit);

      mount.innerHTML = list.map(function (p, i) {
        var n = String(i + 1).padStart(2, "0");
        var inner = p.image
          ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async">'
          : '<span class="ph-idx">' + n + "</span>";
        return (
          '<figure class="photo reveal" data-series="' + esc(p.series || "") + '">' +
            '<span class="photo-idx">[' + n + "]</span>" +
            '<span class="photo-frame" style="--ar:' + esc(p.ar || "4 / 3") + '">' + inner + "</span>" +
            '<figcaption class="photo-cap"><span>' + esc(p.title) + "</span><span>" + esc(p.series || "") + "</span></figcaption>" +
          "</figure>"
        );
      }).join("");

      var field = mount.closest ? mount.closest(".showcase") : null;

      if (field && only && colours[only]) {
        field.style.setProperty("--field", colours[only]);
      }

      var countEl = field ? field.querySelector("[data-count]") : null;
      if (countEl) {
        countEl.textContent = list.length + (list.length === 1 ? " photograph" : " photographs");
      }
    });
  }

  function renderPrints() {
    var mount = document.querySelector("[data-prints]");
    if (!mount || !D.prints) return;

    mount.innerHTML = D.prints.map(function (p) {
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
    }).join("");
  }

  function renderBooks(mountSel, list) {
    var mount = document.querySelector(mountSel);
    if (!mount || !list) return;

    mount.innerHTML = list.map(function (b, i) {
      var cover = b.cover
        ? '<img src="' + esc(b.cover) + '" alt="' + esc(b.title) + '" loading="lazy">'
        : "";
      return (
        '<article class="book reveal" style="--c:' + esc(b.color || "var(--yellow)") + '">' +
          '<div class="cover">' +
            '<span class="cv-num">' + String(i + 1).padStart(2, "0") + "</span>" +
            cover +
            '<span class="cv-ttl">' + esc(b.title) + "</span>" +
          "</div>" +
          '<div class="book-meta">' +
            '<h3 class="h3">' + esc(b.title) + "</h3>" +
            '<p class="muted">' + esc(b.subtitle || "") + "</p>" +
            "<p>" + esc(b.blurb || "") + "</p>" +
            '<p class="sub"><span>' + esc(b.format || "") + "</span><span>" + esc(b.price || "") + "</span></p>" +
            '<a class="btn btn--wide" href="' + esc(b.link || "#") + '"' +
              (String(b.link || "").charAt(0) === "h" ? ' target="_blank" rel="noopener"' : "") +
              ">Buy the ebook</a>" +
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
      var inner =
        '<span class="pidx">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="pttl">' + esc(p.title) + "</span>" +
        '<span class="pdesc">' + esc(p.desc) + "</span>" +
        '<span class="ptags">' + tags + "</span>";

      var isLink = p.link && p.link !== "#";
      if (!isLink) {
        return '<div class="project reveal">' + inner + "</div>";
      }
      return (
        '<a class="project reveal" href="' + esc(p.link) + '"' +
          (String(p.link).charAt(0) === "h" ? ' target="_blank" rel="noopener"' : "") +
          ">" + inner + "</a>"
      );
    }).join("");
  }

  function renderTicker() {
    var track = document.querySelector("[data-ticker]");
    if (!track || !D.worlds) return;
    var words = D.worlds.map(function (w) { return esc(w.name); });
    words.push("Prints", "Photobooks", "Essays", "Experiments", "Available now");
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

    var p = D.prints.filter(function (x) { return x.id === D.featuredPrintId; })[0] || D.prints[0];
    if (!p) return;

    var from = p.sizes && p.sizes.length ? p.sizes[0].price : "";
    var img = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '">'
      : '<span class="tl">' + esc(p.title) + "</span>";

    mount.innerHTML =
      '<div class="feature-shot">' + img + "</div>" +
      '<div class="feature-copy">' +
        '<p class="label muted">Featured print — ' + esc(p.series || "") + "</p>" +
        '<h2 class="h2">' + esc(p.title) + "</h2>" +
        '<p class="muted">' + esc(p.description || "") + "</p>" +
        '<dl class="facts" style="width:100%">' +
          "<div><dt class=\"label muted\">From</dt><dd>" + esc(from) + "</dd></div>" +
          "<div><dt class=\"label muted\">Paper</dt><dd>" + esc(p.paper || "") + "</dd></div>" +
          "<div><dt class=\"label muted\">Delivery</dt><dd>" + esc(p.delivery || "") + "</dd></div>" +
        "</dl>" +
        '<a class="btn btn--accent" href="photography.html#prints">See sizes and prices</a>' +
      "</div>";
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

  function applyLinks() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-link]"), function (n) {
      var k = n.dataset.link;
      var v = D[k];
      if (!v) return;
      n.href = (k === "email" && String(v).indexOf("mailto:") !== 0) ? "mailto:" + v : v;
    });
  }

  /* ---------- boot ---------- */

  function boot() {
    applyCopy();
    applyLinks();

    buildNav();
    initBrand();

    /* render from data.js first — reveal observes what these create */
    renderWorlds();
    renderTicker();
    renderPhotos();
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
