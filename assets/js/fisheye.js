/* ==========================================================================
   FISHEYE WALL — an experiment, not part of the gallery.
   --------------------------------------------------------------------------
   A canvas of photographs, warped as one continuous lens around the pointer,
   draggable with momentum. No dependencies, no build step.

   Deliberately not used in the portfolio: it bends the picture, and a print
   shop should show the photograph true.
   ========================================================================== */

(function () {
  "use strict";

  var canvas = document.querySelector("[data-fisheye]");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sources = ((window.MEDIA || {}).photos || []).map(function (p) { return p.image; });
  if (!sources.length) return;

  var TILE = 176;          /* base cell, css px */
  var GAP = 8;
  var BULGE = 0.9;         /* how hard the lens pushes */
  var FRICTION = 0.93;

  var tiles = [];
  var loaded = 0;

  sources.forEach(function (src) {
    var img = new Image();
    img.decoding = "async";
    /* declare the tile before assigning src: if onload ever fires
       synchronously, `tile` must already exist */
    var tile = { el: img, ok: false };
    tiles.push(tile);
    img.onload = function () {
      tile.ok = true;
      loaded += 1;
      draw();
    };
    img.src = src;
  });

  var W = 0, H = 0, dpr = 1;
  var ox = 0, oy = 0;
  var vx = 0, vy = 0;
  var focus = { x: 0, y: 0, on: false };
  var dragging = false, lastX = 0, lastY = 0;
  var raf = 0, visible = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function draw() {
    if (!W || !H) return;
    ctx.clearRect(0, 0, W, H);

    var step = TILE + GAP;
    var fx = focus.on ? focus.x : W / 2;
    var fy = focus.on ? focus.y : H / 2;
    var sigma = Math.max(W, H) * 0.36;
    var twoSigma = 2 * sigma * sigma;

    var first = Math.floor(-step / 2);
    var cols = Math.ceil(W / step) + 3;
    var rows = Math.ceil(H / step) + 3;
    var startX = (((ox % step) + step) % step) - step;
    var startY = (((oy % step) + step) % step) - step;

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = startX + c * step;
        var y = startY + r * step;
        var cx = x + TILE / 2;
        var cy = y + TILE / 2;

        var dx = cx - fx;
        var dy = cy - fy;
        var k = 1 + BULGE * Math.exp(-(dx * dx + dy * dy) / twoSigma);

        var size = TILE * k;
        var px = cx - size / 2;
        var py = cy - size / 2;

        /* index by position in world space, so a tile keeps its picture
           while you drag rather than shuffling */
        var tx = Math.round((x - ox) / step);
        var ty = Math.round((y - oy) / step);
        var n = tiles.length;
        var idx = (((tx * 5 + ty * 3) % n) + n) % n;
        var tile = tiles[idx];

        if (tile.ok) {
          ctx.drawImage(tile.el, px, py, size, size);
        } else {
          ctx.fillStyle = "#e9e8e4";
          ctx.fillRect(px, py, size, size);
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(5,5,5,.14)";
        ctx.strokeRect(px + 0.5, py + 0.5, size - 1, size - 1);
      }
    }

    if (!loaded) {
      ctx.fillStyle = "rgba(5,5,5,.35)";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("loading photographs…", 16, 24);
    }
  }

  function tick() {
    raf = 0;
    if (!visible) return;

    if (Math.abs(vx) > 0.05 || Math.abs(vy) > 0.05) {
      ox += vx;
      oy += vy;
      vx *= FRICTION;
      vy *= FRICTION;
      draw();
      raf = requestAnimationFrame(tick);
    } else {
      vx = 0;
      vy = 0;
    }
  }

  function spin() {
    if (!raf && visible) raf = requestAnimationFrame(tick);
  }

  function local(e) {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  canvas.addEventListener("pointermove", function (e) {
    var p = local(e);
    focus.x = p.x;
    focus.y = p.y;
    focus.on = true;

    if (dragging) {
      vx = p.x - lastX;
      vy = p.y - lastY;
      ox += vx;
      oy += vy;
      lastX = p.x;
      lastY = p.y;
    }
    draw();
  });

  canvas.addEventListener("pointerleave", function () {
    focus.on = false;
    if (!dragging) draw();
  });

  canvas.addEventListener("pointerdown", function (e) {
    dragging = true;
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    var p = local(e);
    lastX = p.x;
    lastY = p.y;
    vx = vy = 0;
    canvas.classList.add("is-dragging");
  });

  function release() {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove("is-dragging");
    if (!reduce) spin();
  }

  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) draw();
    }, { threshold: 0.05 }).observe(canvas);
  }

  window.addEventListener("resize", resize);
  resize();
})();
