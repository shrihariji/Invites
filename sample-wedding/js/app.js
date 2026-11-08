/* Radhika & Aaryan - all wording comes from data.js (window.INVITE). */
(() => {
  const BASE = window.INVITE, T = window.I18N;
  const q0 = new URLSearchParams(location.search);
  let LANG = q0.get("lang") || localStorage.getItem("inviteLang") || BASE.defaultLang || "en"; if (!["en", "gu", "hi"].includes(LANG)) LANG = "en";
  const merge = (l) => {
    if (l === "en" || !BASE[l]) return BASE;
    const g = BASE[l];
    return Object.assign({}, BASE, g, {
      bride: { ...BASE.bride, ...g.bride }, groom: { ...BASE.groom, ...g.groom }, dateReveal: { ...BASE.dateReveal, ...g.dateReveal },
      events: BASE.events.map((e) => ({ ...e, ...((g.events || []).find((x) => x.id === e.id) || {}) })),
      family: g.family || BASE.family, rsvp: BASE.rsvp, credit: { ...BASE.credit, ...(g.credit || {}) }
    });
  };
  let D = merge(LANG);
  { const m = q0.get("music"); if (m && BASE.musicOptions && BASE.musicOptions[m]) BASE.music = BASE.musicOptions[m]; D = merge(LANG); }
  const t = (k) => (T[LANG] && k in T[LANG] ? T[LANG][k] : T.en[k] ?? k);
  const num = (v) => (LANG === "gu" ? String(v).replace(/\d/g, (d) => "૦૧૨૩૪૫૬૭૮૯"[d]) : String(v));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (p) => p.split(".").reduce((o, k) => (o ? o[k] : ""), D);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S = window.SFX;
  history.scrollRestoration = "manual";
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);   // never start mid-page
  scrollTo(0, 0);

  // ---------- Guest from link: ?g=<code from tools/make_links.py> or ?to=Name ----------
  const q = new URLSearchParams(location.search);
  let guest = null, only = null;
  try {
    if (q.get("g")) {
      const b = q.get("g").replace(/-/g, "+").replace(/_/g, "/");
      const [name, evs] = new TextDecoder().decode(Uint8Array.from(atob(b), (c) => c.charCodeAt(0))).split("|");
      if (name) guest = name;
      if (evs) only = evs.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (q.get("to")) guest = q.get("to");
    if (q.get("ev")) only = q.get("ev").split(",").map((x) => x.trim()).filter(Boolean);   // readable links: &ev=mandva,lagna
  } catch (e) { /* bad link - keep the default greeting */ }
  let events = D.events.filter((e) => !only || only.includes(e.id));
  const guestName = () => guest || D.defaultGuest;

  // ---------- Build page (structure once) ----------
  const COLOR = { mehendi: "#4f5634", survani: "#ae3b5a", mandva: "#702254", lagna: "#8c1d18" };
  const dayParts = (d) => { const m = /^([\d૦-૯]+)(\D*)$/.exec(d) || [d, d, ""]; return [m[1], m[2]]; };
  // Ritual positions are % of the painting. data.js can override them per invite with ritualPos.
  const POS = Object.assign({
    mehendi: { x: 50, y: 76, w: 46 }, survani: { x: 29, y: 86, w: 24, h: 11 },
    mandva: { x: 46.5, y: 78.5, w: 25, h: 19, glow: true }, lagna: { x: 50, y: 87, w: 20 }
  }, D.ritualPos || {});
  const HAND = `<svg viewBox="0 0 48 48"><circle class="rip" cx="23" cy="9" r="7"/><path d="M20 23V9.5a3 3 0 0 1 6 0V20l8.4 1.7a4.6 4.6 0 0 1 3.6 5.3l-1.3 8a6.5 6.5 0 0 1-6.4 5.5h-8.4a6.5 6.5 0 0 1-5-2.4L10.6 31a3 3 0 0 1 4.4-4.1L20 31z"/></svg>`;
  const ghost = (k, x, y) => `<div class="hint-hand" data-k="${k}" style="left:${x}%;top:${y}%">${HAND}</div>`;
  const box = (p) => `left:${p.x - p.w / 2}%;top:${p.y - p.h / 2}%;width:${p.w}%;height:${p.h}%`;
  const RITUAL = {
    mehendi: (p) => `<div class="rub" style="left:${p.x}%;top:${p.y}%;width:${p.w}%" aria-label="Rub the palms to apply mehendi">
        <img class="rub-under" src="assets/img/palms-mehendi.webp" alt="" draggable="false" decoding="async">
        <canvas class="rub-top"></canvas></div>${ghost("rub", p.x, p.y)}`,
    survani: (p) => `<button class="hit" style="${box(p)}" aria-label="Tap the tabla"></button>${ghost("tap", p.x, p.y)}`,
    mandva: (p) => (p.glow ? `<div class="aura" style="left:${p.x}%;top:${p.y}%;width:46%;aspect-ratio:1;transform:translate(-50%,-50%)"></div>
             <span class="flame" style="left:27%;top:80%"></span><span class="flame" style="left:72.6%;top:80%"></span>` :
             `<div class="aura" style="left:${p.x}%;top:${p.y}%;width:46%;aspect-ratio:1;transform:translate(-50%,-50%)"></div>`) +
             `<button class="hit" style="${box(p)}" aria-label="Tap the pithi bowl"></button>${ghost("tap", p.x, p.y)}`,
    lagna: (p) => `<button class="hold" style="left:${p.x}%;top:${p.y}%;width:${p.w}%" aria-label="Press and hold to shower flowers"><svg viewBox="-50 -50 100 100" aria-hidden="true">${[...Array(8)].map((_, i) => `<ellipse class="pt" rx="12" ry="23" cy="-23" transform="rotate(${i * 45})"/>`).join("")}${[...Array(8)].map((_, i) => `<ellipse class="pt2" rx="7" ry="15" cy="-15" transform="rotate(${i * 45 + 22.5})"/>`).join("")}<circle class="ctr" r="10"/></svg><img class="rose" src="assets/img/rose.webp" alt="" draggable="false" decoding="async"><i class="ring"></i></button>${ghost("hold", p.x, p.y)}`
  };
  $("#scenes").innerHTML = events.map((e) => `<section class="scene" id="ev-${e.id}" data-ev="${e.id}">
      <div class="cover"><div class="art"><div class="kb">
        <img src="assets/img/${e.id}.webp" alt="" loading="lazy" decoding="async" draggable="false">
        ${RITUAL[e.id] ? RITUAL[e.id](POS[e.id]) : ""}
        <div class="band">
          <img class="gu" src="assets/img/gu-${e.id}.webp" alt="${esc(e.gu)}">
          <p class="en"></p><p class="date"></p><p class="wk"></p>
          <button class="ritual-hint"><span class="h1"></span><small></small></button>
          <button class="details-btn" hidden></button>
        </div>
      </div></div></div></section>`).join(`<div class="seam" aria-hidden="true"><i></i><b></b><i></i></div>`);
  if (!D.showLogo) $("#logo").remove();
  $("#reel").innerHTML = D.photos.map((p, i) => `<figure><img src="assets/photos/${p}.webp" alt="Photo ${i + 1} of the couple" loading="lazy" decoding="async" draggable="false"></figure>`).join("");
  $("#dots").innerHTML = D.photos.map(() => "<i></i>").join("");
  const hintText = (id, n) => t(n && `h_${id}_n` in T.en ? `h_${id}_n` : `h_${id}`) + (n ? ` · ${num(n)}/${num(3)}` : "");

  // ---------- Fill text (runs again when the language changes) ----------
  let ready = false;
  function render() {
    D = merge(LANG);
    events = D.events.filter((e) => !only || only.includes(e.id));
    document.documentElement.lang = LANG;
    document.body.classList.toggle("lang-gu", LANG === "gu"); document.body.classList.toggle("lang-hi", LANG === "hi");
    document.title = D.pageTitle;
    $$("[data-field]").forEach((el) => (el.textContent = get(el.dataset.field)));
    $$("[data-guest]").forEach((el) => (el.textContent = guestName()));
    $$("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
    $$("[data-th]").forEach((el) => (el.innerHTML = t(el.dataset.th)));
    $$("[data-tp]").forEach((el) => (el.placeholder = t(el.dataset.tp)));
    $$("#lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === LANG));
    const rv = ready ? "" : "reveal";
    $("#shlokas").innerHTML = D.shlokas.map((x) => `<span>${esc(x)}</span>`).join("");
    $("#inviteLines").innerHTML = D.inviteText.map((x) => `<p class="${rv}">${esc(x)}</p>`).join("");
    $("#glanceList").innerHTML = events.map((e) => {
      const [n] = dayParts(e.day);
      return `<li class="${rv}"><a href="#ev-${e.id}" style="--c:${COLOR[e.id]}">
        <div class="gd"><b>${esc(n)}</b><small>${esc(e.month)}</small></div>
        <div><img src="assets/img/gu-${e.id}.webp" alt="${esc(e.gu)}"><p class="gt">${esc(e.name)} · ${esc(e.weekday)}<br>${esc(e.venue)}</p></div>
        <span class="arrow">›</span></a></li>`;
    }).join("");
    events.forEach((e) => {
      const sc = $(`#ev-${e.id}`); if (!sc) return;
      const [n, suf] = dayParts(e.day);
      $(".en", sc).textContent = e.name;
      $(".date", sc).innerHTML = `<span>${esc(n)}<sup>${esc(suf)}</sup></span><i></i><span>${esc(e.month)}</span><i></i><span>${esc(e.year)}</span>`;
      $(".wk", sc).textContent = e.weekday;
      $(".h1", sc).textContent = hintText(e.id, +(sc.dataset.n || 0));
      $(".ritual-hint small", sc).textContent = t(`hs_${e.id}`);
      $(".details-btn", sc).textContent = t("details");
      $(".kb > img", sc).alt = `${e.name}`;
    });
    $("#famList").innerHTML = D.family.map((g) => `
      <div class="fam ${rv}"><h3>${esc(g.title)}</h3><ul>${g.names.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>`).join("");
    if (D.rsvp.whatsapp) {
      $("#rsvp").hidden = false;
      $("#rsvpBy").textContent = D.rsvp.by ? `${t("replyBy")} ${D.rsvp.by}` : t("letUsKnow");
    }
    const c = D.credit || {};
    $("#creditWa").href = `https://wa.me/${c.phone}?text=${encodeURIComponent(t("creditMsg"))}`;
    $("#creditTel").href = `tel:+${c.phone}`; $("#creditTel").textContent = c.show || c.phone;
    const stw = $("#stWa"); if (stw) stw.href = `https://wa.me/${c.phone}?text=${encodeURIComponent(t("creditMsg"))}`;
    if (ready) {
      if (!scratchTouched) paintScratch();
      tick();
      if (sheetId) openSheet(sheetId, true);
      ScrollTrigger.refresh();
    }
    ready = true;
  }
  render();
  $$("#lang button").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.l === LANG) return;
    LANG = b.dataset.l; localStorage.setItem("inviteLang", LANG); S.pop(); render();
  }));

  // ---------- Particles (petals, gold dust, marigolds, notes, ripples) ----------
  const cv = $("#fx"), cx = cv.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, matchMedia("(pointer: coarse)").matches ? 1.5 : 2);
  let W, H, parts = [], ambient = null, raf = 0;
  let lastW = 0;
  const fit = () => {
    if (innerWidth === lastW && cv.height >= innerHeight * dpr) return;   // address bar moved: keep the canvas
    lastW = innerWidth; W = cv.width = innerWidth * dpr; H = cv.height = Math.max(innerHeight, screen.height || 0) * dpr;
  };
  fit(); addEventListener("resize", fit);
  const PAL = {
    jasmine: ["#ffffff", "#fff8e8", "#fdf0d2", "#f1d68b"],
    gold: ["#f1d68b", "#c9a24a", "#fff3c4", "#e2b955"],
    mehendi: ["#e98fb0", "#d45d8c", "#f6c1d3", "#c2d59a"],
    survani: ["#f1d68b", "#e7849f", "#fff3c4", "#c9a24a"],
    mandva: ["#f39c12", "#f7c04a", "#e67e22", "#c0392b"],
    lagna: ["#ffffff", "#fde7ef", "#f7c6d6", "#e98fb0"]
  };
  const colX = () => { const w = Math.min(innerWidth, 480); return [(innerWidth - w) / 2, w]; };
  function add(o) { parts.push(Object.assign({ vx: 0, vy: 0, g: .05, r: 7, rot: Math.random() * 6, vr: (Math.random() - .5) * .12, sway: Math.random() * 6, life: 1, decay: 0, type: "petal" }, o)); run(); }
  function burst(x, y, n, pal, type = "petal", power = 9) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = (2 + Math.random() * power) * dpr;
      add({ x: x * dpr, y: y * dpr, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3 * dpr, r: (4 + Math.random() * 6) * dpr,
        c: pal[(Math.random() * pal.length) | 0], type, decay: type === "dust" ? .012 : 0 });
    }
  }
  function draw(p) {
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = Math.max(0, Math.min(1, p.life));
    if (p.type === "petal") {
      cx.scale(1, Math.abs(Math.cos(p.sway)) * .6 + .4); cx.fillStyle = p.c;
      cx.beginPath(); cx.ellipse(0, 0, p.r, p.r * .55, 0, 0, Math.PI * 2); cx.fill();
    } else if (p.type === "dust") {
      const g = cx.createRadialGradient(0, 0, 0, 0, 0, p.r); g.addColorStop(0, "#fffbe8"); g.addColorStop(.4, p.c); g.addColorStop(1, "transparent");
      cx.fillStyle = g; cx.beginPath(); cx.arc(0, 0, p.r, 0, Math.PI * 2); cx.fill();
    } else if (p.type === "marigold") {
      for (let k = 0; k < 7; k++) { cx.rotate(Math.PI * 2 / 7); cx.fillStyle = p.c; cx.beginPath(); cx.ellipse(p.r * .45, 0, p.r * .55, p.r * .32, 0, 0, Math.PI * 2); cx.fill(); }
      cx.fillStyle = "#b5520f"; cx.beginPath(); cx.arc(0, 0, p.r * .3, 0, Math.PI * 2); cx.fill();
    } else if (p.type === "note") {
      cx.fillStyle = p.c; cx.font = `${p.r * 3}px serif`; cx.textAlign = "center"; cx.fillText(p.txt, 0, 0);
    } else if (p.type === "ring") {
      cx.strokeStyle = p.c; cx.lineWidth = 2.5 * dpr; cx.beginPath(); cx.arc(0, 0, p.r, 0, Math.PI * 2); cx.stroke();
    }
    cx.restore();
  }
  function run() {
    if (raf) return;
    const step = () => {
      cx.clearRect(0, 0, W, H);
      if (ambient && !calm && parts.length < 42 && Math.random() < .2) {
        const [l, w] = colX(), up = ambient === "survani" && Math.random() < .5;
        add({ x: (l + Math.random() * w) * dpr, y: up ? H + 10 : -20, vy: up ? -.6 * dpr : 1, g: up ? -.004 : .04,
          r: (up ? 5 : 5 + Math.random() * 6) * dpr, c: PAL[ambient][(Math.random() * 4) | 0], type: up ? "dust" : ambient === "mandva" && Math.random() < .3 ? "marigold" : "petal" });
      }
      parts = parts.filter((p) => p.life > 0 && p.y < H + 60 && p.y > -80);
      for (const p of parts) {
        if (p.type === "ring") { p.r += 3 * dpr; p.life -= .035; }
        else {
          p.vy += p.g * dpr; p.vx *= .985;
          if (p.g > 0 && p.vy > 2.3 * dpr) p.vy = 2.3 * dpr;
          p.sway += .03; p.x += p.vx + Math.sin(p.sway) * .7 * dpr; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
        }
        draw(p);
      }
      if (parts.length || ambient) raf = requestAnimationFrame(step); else { raf = 0; cx.clearRect(0, 0, W, H); }
    };
    raf = requestAnimationFrame(step);
  }
  const setAmbient = (k) => { ambient = calm ? null : k; if (k) run(); };
  // point inside a painting (% of the art box) -> screen px
  const artPt = (art, px, py) => { const r = art.getBoundingClientRect(); return [r.left + r.width * px / 100, r.top + r.height * py / 100]; };

  // ---------- Opening ----------
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
  const heroBits = [".shlokas", ".names", ".range", ".city"];
  gsap.set(heroBits, { opacity: 0, y: 20 });
  gsap.set(".om", { clipPath: "inset(0 0 100% 0)" });
  const nameSpans = $$(".names .n1, .names .n2").map((el) => {
    // Latin names animate letter by letter; Gujarati (joined letters, vowel signs) animates as whole words
    const txt = el.textContent, pieces = /^[\u0000-\u007f]*$/.test(txt) ? [...txt] : txt.split(/(\s+)/);
    el.innerHTML = pieces.map((ch) => `<span style="display:inline-block">${esc(ch)}</span>`).join(""); return el;
  });

  $("#seal").addEventListener("click", openCurtain, { once: true });
  function openCurtain() {
    S.unlock(); S.bell(523, .4); setTimeout(() => S.bell(784, .22), 260); S.whoosh(2.2);
    const sb = $("#seal").getBoundingClientRect();
    if (D.music) { const a = $("#bgm"); a.src = `assets/audio/${D.music}`; a.volume = .5; a.play().catch(() => {}); }
    $("#sound").hidden = false;
    $("#seal").style.animation = "none";
    const done = () => { $("#curtain").remove(); $("#flash").remove(); };
    if (document.body.dataset.opener === "gates") {
      gsap.timeline({ onComplete: done })
        .to("#seal", { scale: 1.2, duration: .22, ease: "power2.out" }, 0)
        .to("#seal", { scale: 0, rotation: 140, opacity: 0, duration: .5, ease: "back.in(2)" }, .22)
        .to([".c-top", ".seal-hint"], { opacity: 0, y: -16, duration: .45 }, .2)
        .to(".gate-shade", { opacity: 0, duration: .6 }, .3)
        .to("#flash", { opacity: 1, duration: .3 }, .55)
        .add(() => burst(sb.left + sb.width / 2, sb.top + sb.height / 2, 90, PAL.gold, "dust", 8), .6)
        .to(".door-left", { rotationY: -108, duration: 2.4, ease: "power3.inOut" }, .7)
        .to(".door-right", { rotationY: 108, duration: 2.4, ease: "power3.inOut" }, .7)
        .to(".gate-stage", { scale: 1.3, duration: 2.4, ease: "power2.in" }, .7)
        .to("#flash", { opacity: 0, duration: 1.4 }, 1.1)
        .add(afterOpen, 1.6)
        .to("#curtain", { opacity: 0, duration: .6 }, 2.5);
      return;
    }
    if (document.body.dataset.opener === "envelope") {
      gsap.timeline({ onComplete: done })
        .to("#seal", { scale: 1.2, duration: .22, ease: "power2.out" }, 0)
        .to("#seal", { scale: 0, rotation: 140, opacity: 0, duration: .5, ease: "back.in(2)" }, .22)
        .add(() => burst(sb.left + sb.width / 2, sb.top + sb.height / 2, 80, PAL.gold, "dust", 7), .45)
        .to([".curtain-ui", ".seal-hint", ".stamp", ".postmark", ".airmail"], { opacity: 0, y: -12, duration: .45, stagger: .03 }, .3)
        .to(".env-flap", { rotateX: 180, duration: .75, ease: "power2.inOut" }, .6)
        .set(".env-flap", { zIndex: 0 }, .98)
        .to(".letter", { yPercent: -62, duration: 1, ease: "power3.out" }, 1.15)
        .to(".envelope", { scale: 2.6, y: "18svh", duration: 1.1, ease: "power2.in" }, 2.1)
        .to("#flash", { opacity: 1, duration: .35 }, 2.5)
        .add(afterOpen, 2.6)
        .to("#curtain", { opacity: 0, duration: .5 }, 2.7)
        .to("#flash", { opacity: 0, duration: 1.2 }, 2.9);
      return;
    }
    gsap.timeline({ onComplete: done })
      .to("#seal", { scale: 1.2, duration: .22, ease: "power2.out" }, 0)
      .to("#seal", { scale: 0, rotation: 140, opacity: 0, duration: .55, ease: "back.in(2)" }, .22)
      .add(() => burst(sb.left + sb.width / 2, sb.top + sb.height / 2, 80, PAL.gold, "dust", 7), 0.5)
      .to("#flash", { opacity: 1, duration: .25 }, .45)
      .to("#flash", { opacity: 0, duration: 1.4 }, .75)
      .to([".c-om", ".c-dear", ".c-gu", ".c-sub", ".seal-hint", ".curtain-ui"], { opacity: 0, y: -16, duration: .5, stagger: .03 }, .3)
      .to(".drape.left", { scaleX: .12, skewY: 1.5, duration: 2.3, ease: "power3.inOut" }, .25)
      .to(".drape.right", { scaleX: .12, skewY: -1.5, duration: 2.3, ease: "power3.inOut" }, .25)
      .to(".valance", { yPercent: -110, duration: 1.2, ease: "power2.in" }, 1.6)
      .add(afterOpen, 1.3)
      .to("#curtain", { opacity: 0, duration: .6 }, 2.2);
  }
  function afterOpen() {
    scrollTo({ top: 0, behavior: "instant" });   // the seal always opens onto the first page
    document.body.classList.remove("locked");
    setAmbient("jasmine");
    gsap.timeline()
      .to(".shlokas", { opacity: 1, y: 0, duration: .8 })
      .to(".om", { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power2.inOut" }, .1)
      .to(".names", { opacity: 1, y: 0, duration: .01 }, 1.1)
      .from(nameSpans.flatMap((el) => [...el.children]), { opacity: 0, y: 18, filter: "blur(6px)", duration: .7, stagger: .06, ease: "power3.out" }, 1.1)
      .to([".range", ".city"], { opacity: 1, y: 0, duration: .8, stagger: .15 }, 2.0)
      .add(() => swIdle(1800), 2.6);
    ScrollTrigger.refresh();
  }

  // ---------- "Swipe up" hint (like Reels) - shows when the guest pauses ----------
  const sw = $("#swipe"); let swT = 0, swCount = 0;
  const atEnd = () => innerHeight + scrollY > document.documentElement.scrollHeight - 260;
  function swShow() {
    if (document.body.classList.contains("locked") || !sheet.hidden || atEnd()) return;
    const mid = innerHeight / 2;
    const live = $$(".scene").find((x) => { const r = x.getBoundingClientRect(); return r.top < mid && r.bottom > mid; });
    if (live && !live.classList.contains("done")) return;   // the ritual hint is the guide here
    sw.classList.add("show"); peek();
  }
  let peeks = 0;
  function peek() {   // Reels-style nudge: the page lifts a little and springs back - never scrolls for the guest
    if (peeks >= 1 || calm || scrollY > 40) return; peeks++;   // once only, and only on the first screen
    document.body.classList.remove("peek"); void document.body.offsetWidth; document.body.classList.add("peek");
    setTimeout(() => document.body.classList.remove("peek"), 1300);
  }
  function swHide() { clearTimeout(swT); sw.classList.remove("show"); }
  function swIdle(ms) { swHide(); swT = setTimeout(swShow, ms); }
  addEventListener("scroll", () => swIdle(swCount++ < 40 ? 3500 : 7000), { passive: true });
  addEventListener("pointerdown", () => sw.classList.contains("show") && swIdle(5000), { passive: true });

  // ---------- Scroll motion ----------
  if (!calm) {
    $$(".reveal").forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    gsap.fromTo(".stick .art img", { scale: 1.02 }, { scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: true } });
    gsap.fromTo(".family .art img", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".family", scrub: true } });
  }
  ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom 30%", onLeave: () => setAmbient(null), onEnterBack: () => setAmbient("jasmine") });

  $$(".scene").forEach((sc) => {
    const id = sc.dataset.ev, img = $(".kb", sc), band = $(".band", sc);
    ScrollTrigger.create({ trigger: sc, start: "top 55%", end: "bottom 45%", onToggle: (st) => st.isActive ? setAmbient(id) : ambient === id && setAmbient(null) });
    if (calm) return;
    gsap.fromTo(img, { scale: 1.14, yPercent: -3 }, { scale: 1, yPercent: 2, ease: "none", scrollTrigger: { trigger: sc, start: "top bottom", end: "bottom top", scrub: true } });
    const kids = [...band.children];
    gsap.set(kids, { opacity: 0, y: 18 });
    gsap.set($(".gu", band), { clipPath: "inset(0 100% 0 0)", opacity: 1, y: 0 });
    gsap.timeline({ scrollTrigger: { trigger: sc, start: "top 45%", once: true } })
      .to($(".gu", band), { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut" })
      .to(kids.slice(1), { opacity: 1, y: 0, duration: .7, stagger: .14, ease: "power3.out" }, .7);
  });

  // ---------- Journey: a plane flies the dotted path as you scroll (only if #journey exists) ----------
  const jr = $("#journey");
  if (jr) {
    const path = $("#flight", jr), plane = $("#plane", jr), len = path.getTotalLength();
    path.style.strokeDasharray = `2 7`;
    const trail = $("#trail", jr); trail.style.strokeDasharray = `${len} ${len}`; trail.style.strokeDashoffset = len;
    const place = (t) => {
      const a = path.getPointAtLength(t * len), b = path.getPointAtLength(Math.min(len, t * len + 1));
      plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${Math.atan2(b.y - a.y, b.x - a.x) * 57.3})`);
      trail.style.strokeDashoffset = len * (1 - t);
      jr.classList.toggle("landed", t > .97);
    };
    place(0);
    ScrollTrigger.create({ trigger: jr, start: "top 70%", end: "bottom 40%", scrub: .6, onUpdate: (st) => place(st.progress) });
  }

  $$(".seam").forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => el.classList.add("on") }));

  // stop double-tap zoom / long-press menus on the interactive parts (Safari, Chrome, Android browsers)
  let lastTap = 0;
  document.addEventListener("touchend", (e) => {
    if (!e.target.closest(".hit, .hold, .pad, .reel")) return;
    const now = Date.now(); if (now - lastTap < 350) e.preventDefault(); lastTap = now;
  }, { passive: false });
  document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });

  // ---------- Rituals ----------
  function finish(sc) {
    if (sc.classList.contains("done")) return;
    sc.classList.add("done");
    const id = sc.dataset.ev, art = $(".kb", sc), [x, y] = artPt(art, 50, 60);
    S.chime(); burst(x, y, 110, PAL.gold.concat(PAL[id]), "petal", 10);
    $(".ritual-hint", sc).hidden = true;
    const db = $(".details-btn", sc); db.hidden = false; gsap.from(db, { opacity: 0, y: 10, duration: .6 });
    setTimeout(() => openSheet(id), 900);
  }
  $$(".scene").forEach((sc) => {
    const id = sc.dataset.ev, art = $(".kb", sc), hint = $(".ritual-hint", sc);
    let hintTaps = 0;
    hint.addEventListener("click", () => {      // second tap on the hint skips the ritual
      if (++hintTaps >= 2) return finish(sc);
      gsap.fromTo(hint, { x: -6 }, { x: 0, duration: .5, ease: "elastic.out(1,.3)" });
      const t = $(".hit, .pad, .rub, .hold", sc); if (t) gsap.fromTo(t, { scale: 1 }, { scale: 1.12, yoyo: true, repeat: 1, duration: .25 });
    });
    $(".details-btn", sc).addEventListener("click", () => openSheet(id));
    art.addEventListener("pointerdown", (ev) => { if (ev.target.closest(".hit, .pad, .hold")) sc.classList.add("touched"); });
    if (id === "mehendi") rubPalms(sc, art);
    if (id === "survani") taps(sc, art, (n, x, y) => {
      S.tabla(n % 2 ? "dha" : "na");
      add({ x: x * dpr, y: y * dpr, r: 6 * dpr, c: "#fff", type: "ring" });
      for (let i = 0; i < 3; i++) add({ x: (x + (Math.random() - .5) * 40) * dpr, y: y * dpr, vy: -2.2 * dpr, vx: (Math.random() - .5) * 2 * dpr, g: .02, r: 7 * dpr, c: ["#ae3b5a", "#c9a24a", "#7a2a45"][i], type: "note", txt: ["♪", "♫", "♩"][i], decay: .012 });
    }, () => { [0, 160, 320].forEach((t, i) => setTimeout(() => S.tabla(i === 1 ? "na" : "dha"), t)); setTimeout(() => S.bell(880, .2), 450); });
    if (id === "mandva") taps(sc, art, (n, x, y) => {
      S.bell(587 + n * 90, .18);
      const [gx, gy] = artPt(art, 46, 72);
      for (let i = 0; i < 14; i++) add({ x: (gx + (Math.random() - .5) * 90) * dpr, y: (gy - 120 - Math.random() * 80) * dpr, vy: 1.2 * dpr, g: .05, r: (5 + Math.random() * 4) * dpr, c: PAL.mandva[(Math.random() * 4) | 0], type: Math.random() < .5 ? "marigold" : "petal" });
    }, () => {
      gsap.to($(".aura", sc), { opacity: .9, duration: 1.2 });
      gsap.to($(".aura", sc), { scale: 1.08, repeat: -1, yoyo: true, duration: 1.6, ease: "sine.inOut", delay: 1.2 });
      gsap.to($$(".flame", sc), { opacity: 1, duration: .6, stagger: .2 });
    });
    if (id === "lagna") hold(sc, art);
  });

  function taps(sc, art, onTap, onDone) {
    const hit = $(".hit", sc), hint = $(".ritual-hint", sc), need = 3;
    let n = 0;
    hit.addEventListener("pointerdown", (e) => {   // fires on touch-down: fast taps all count, no click delay
      if (sc.classList.contains("done")) return;
      n++; S.unlock();
      const r = hit.getBoundingClientRect();
      onTap(n, e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
      sc.dataset.n = n; $(".h1", hint).textContent = hintText(sc.dataset.ev, n);
      if (n >= need) { onDone(); setTimeout(() => finish(sc), 500); }
    });
  }

  function hold(sc, art) {
    const btn = $(".hold", sc), petals = $$(".pt", btn);
    let p = 0, down = false, last = 0, t0 = 0;
    const loop = (t) => {
      const dt = Math.min(50, t - (last || t)); last = t;
      p = Math.max(0, Math.min(1, p + (down ? dt / 2400 : -dt / 1200)));
      const lit = Math.round(p * petals.length);
      petals.forEach((e, i) => e.classList.toggle("lit", i < lit));
      btn.style.setProperty("--p", p.toFixed(3));
      if (down && Math.random() < .7) {
        const [x, y] = artPt(art, 36 + Math.random() * 28, 50 + Math.random() * 6);
        add({ x: x * dpr, y: y * dpr, vy: 1.4 * dpr, g: .03, r: (4 + Math.random() * 5) * dpr, c: PAL.lagna[(Math.random() * 4) | 0] });
      }
      if (down && t - t0 > 420) { t0 = t; S.bell(1047 + Math.random() * 300, .05); }
      if (p >= 1) { down = false; finish(sc); return; }
      if (down || p > 0) requestAnimationFrame(loop); else last = 0;
    };
    const start = (e) => { if (sc.classList.contains("done")) return; e.preventDefault(); S.unlock(); down = true; last = 0; requestAnimationFrame(loop); };
    const stop = () => (down = false);
    btn.addEventListener("pointerdown", start);
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => btn.addEventListener(ev, stop));
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  // Rub the palms: erase the plain-skin layer to reveal the mehendi. Only sideways rubbing is ours;
  // up/down swipes belong to the page, so scrolling is never blocked.
  function rubPalms(sc, art) {
    const box = $(".rub", sc), can = $("canvas", box), g = can.getContext("2d");
    const plain = new Image(); plain.decoding = "async"; plain.src = "assets/img/palms-plain.webp";
    let total = 0, done = false, down = false, lastTick = 0, lastCheck = 0, ready = false;
    const draw = () => {
      const r = box.getBoundingClientRect(); if (!r.width) return;
      can.width = Math.round(r.width * dpr); can.height = Math.round(r.height * dpr);
      g.globalCompositeOperation = "source-over"; g.clearRect(0, 0, can.width, can.height);
      g.drawImage(plain, 0, 0, can.width, can.height);
      const px = g.getImageData(0, 0, can.width, can.height).data; total = 0;
      for (let i = 3; i < px.length; i += 4 * 9) if (px[i] > 40) total++;
      ready = true;
    };
    plain.onload = draw;
    addEventListener("resize", () => { if (!done && ready && Math.abs(box.getBoundingClientRect().width * dpr - can.width) > 2) draw(); });
    const erase = (e) => {
      const r = can.getBoundingClientRect(), x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr, rad = can.width * 0.13;
      const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, "rgba(0,0,0,1)"); gr.addColorStop(.6, "rgba(0,0,0,.85)"); gr.addColorStop(1, "rgba(0,0,0,0)");
      g.globalCompositeOperation = "destination-out"; g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill();
      const now = performance.now();
      if (now - lastTick > 140) { lastTick = now; S.pop(); }
      if (now - lastCheck > 250) { lastCheck = now; check(); }
    };
    const check = () => {
      if (done || !total) return;
      const px = g.getImageData(0, 0, can.width, can.height).data; let left = 0;
      for (let i = 3; i < px.length; i += 4 * 9) if (px[i] > 40) left++;
      if (1 - left / total > 0.58) complete();
    };
    const complete = () => {
      done = true; down = false; box.classList.add("revealed");
      const r = box.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height * .45, 70, PAL.mehendi.concat(PAL.gold), "petal", 7);
      setTimeout(() => finish(sc), 650);
    };
    // One rub is enough: after a short stroke (or when the finger lifts) the whole mehendi fills in by itself.
    let strokes = 0;
    const autoFill = () => {
      if (done) return; done = true; down = false;
      can.style.transition = "opacity .8s ease"; can.style.opacity = "0";
      setTimeout(() => { done = false; complete(); }, 650);
    };
    box.addEventListener("pointerdown", (e) => { if (done || !ready) return; down = true; sc.classList.add("touched"); S.unlock(); erase(e); strokes++; });
    box.addEventListener("pointermove", (e) => { if (down && !done) { erase(e); if (++strokes > 7) autoFill(); } });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => box.addEventListener(ev, () => { down = false; if (strokes) autoFill(); }));
  }

  function mehendi(sc, art) {
    const pad = $(".pad", sc), path = $("path", pad), can = $("canvas", pad), g = can.getContext("2d");
    // lotus mandala: centre circle, 8 teardrop petals, outer ring
    const P = (x, y, a) => [100 + x * Math.cos(a) - y * Math.sin(a), 100 + x * Math.sin(a) + y * Math.cos(a)].map((v) => v.toFixed(1)).join(",");
    let d = "M112,100 a12,12 0 1,0 -24,0 a12,12 0 1,0 24,0 ";
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4;
      d += `M${P(0, -18, a)} C${P(15, -32, a)} ${P(12, -52, a)} ${P(0, -64, a)} C${P(-12, -52, a)} ${P(-15, -32, a)} ${P(0, -18, a)} `;
    }
    d += "M178,100 a78,78 0 1,0 -156,0 a78,78 0 1,0 156,0";
    path.setAttribute("d", d);
    const pts = [], len = path.getTotalLength();
    for (let s = 0; s < len; s += 2.5) { const p = path.getPointAtLength(s); pts.push({ x: p.x, y: p.y, on: false }); }
    const size = () => { const r = pad.getBoundingClientRect(); can.width = r.width * dpr; can.height = r.height * dpr; redraw(); };
    const k = () => can.width / 200;
    function seg(i) {
      const a = pts[i], b = pts[i + 1];
      if (!a || !b || !a.on || !b.on || Math.hypot(a.x - b.x, a.y - b.y) > 6) return;
      g.strokeStyle = "#7a3216"; g.lineWidth = 3.2 * k() / 1.6; g.lineCap = "round";
      g.beginPath(); g.moveTo(a.x * k(), a.y * k()); g.lineTo(b.x * k(), b.y * k()); g.stroke();
    }
    function redraw() { g.clearRect(0, 0, can.width, can.height); pts.forEach((_, i) => seg(i)); }
    size(); addEventListener("resize", size);
    let drawing = false, count = 0, lastTick = 0;
    const at = (e) => {
      const r = pad.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 200, y = (e.clientY - r.top) / r.height * 200;
      pts.forEach((p, i) => {
        if (!p.on && Math.hypot(p.x - x, p.y - y) < 14) { p.on = true; count++; seg(i - 1); seg(i); }
      });
      if (performance.now() - lastTick > 160) { lastTick = performance.now(); S.pop(); }
      if (count / pts.length > .72) complete();
    };
    let completed = false;
    function complete() {
      if (completed) return; completed = true; drawing = false;
      const rest = pts.filter((p) => !p.on);
      gsap.to({ i: 0 }, { i: rest.length, duration: .8, ease: "power1.in", onUpdate() { const n = this.targets()[0].i | 0; for (let j = 0; j < n; j++) rest[j].on = true; redraw(); } });
      pad.classList.add("done");
      setTimeout(() => finish(sc), 700);
    }
    pad.addEventListener("pointerdown", (e) => { if (sc.classList.contains("done")) return; drawing = true; pad.setPointerCapture(e.pointerId); S.unlock(); at(e); });
    pad.addEventListener("pointermove", (e) => drawing && at(e));
    pad.addEventListener("pointerup", () => (drawing = false));
    pad.addEventListener("pointercancel", () => (drawing = false));   // the page took the swipe (vertical scroll)
  }

  // ---------- Details sheet ----------
  const sheet = $("#sheet"), card = $(".sheet-card", sheet);
  let sheetId = null;
  function openSheet(id, quiet) {
    sheetId = id;
    const e = D.events.find((x) => x.id === id), sc = $(`#ev-${id}`), cs = getComputedStyle(sc);
    card.style.setProperty("--c", cs.getPropertyValue("--sc").trim() || cs.getPropertyValue("--c"));
    card.style.setProperty("--c2", cs.getPropertyValue("--sc2").trim() || cs.getPropertyValue("--c2"));
    $("#sheetBody").innerHTML = `
      <img class="gu" src="assets/img/gu-${id}.webp" alt="${esc(e.gu)}">
      <p class="en" id="sheetTitle">${esc(e.name)}</p>
      <p class="when">${esc(e.weekday)} · ${esc(e.day)} ${esc(e.month)} ${esc(e.year)}</p>
      <ul class="lines">${e.lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
      <p class="venue">${esc(e.venue)}</p>
      <p class="addr">${esc(e.address)}</p>
      <p class="attire">${t("attire")} ~ ${esc(e.attire)}</p>
      <div class="acts">
        <a class="btn" href="${esc(e.map)}" target="_blank" rel="noopener">${t("openMap")}</a>
        <button class="btn ghost" data-cal="${id}">${t("addCal")}</button>
      </div>`;
    if (quiet) return;
    sheet.hidden = false; swHide();
    gsap.fromTo(".sheet-bg", { opacity: 0 }, { opacity: 1, duration: .3 });
    gsap.fromTo(card, { yPercent: 100 }, { yPercent: 0, duration: .55, ease: "power3.out" });
    $(".sheet-x").focus({ preventScroll: true });
  }
  function closeSheet() {
    if (sheet.hidden) return;
    swIdle(1600);
    gsap.to(".sheet-bg", { opacity: 0, duration: .25 });
    gsap.to(card, { yPercent: 100, duration: .35, ease: "power2.in", onComplete: () => { sheet.hidden = true; sheetId = null; } });
  }
  $(".sheet-x").addEventListener("click", closeSheet);
  $(".sheet-bg").addEventListener("click", closeSheet);
  addEventListener("keydown", (e) => e.key === "Escape" && (closeSheet(), closeViewer()));
  sheet.addEventListener("click", (e) => { const b = e.target.closest("[data-cal]"); if (b) ics([D.events.find((x) => x.id === b.dataset.cal)]); });

  // ---------- Calendar (.ics) ----------
  function ics(list) {
    const f = (s) => new Date(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const who = `${D.bride.first} & ${D.groom.first}`;
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//invite//EN", "CALSCALE:GREGORIAN"];
    list.forEach((e) => lines.push("BEGIN:VEVENT", `UID:${e.id}-${f(e.start)}@invite`, `DTSTAMP:${f(Date.now())}`,
      `DTSTART:${f(e.start)}`, `DTEND:${f(e.end)}`, `SUMMARY:${e.name} · ${who}`,
      `LOCATION:${(e.venue + ", " + e.address).replace(/,/g, "\\,")}`, `DESCRIPTION:${e.lines.join(" · ").replace(/,/g, "\\,")} · Attire: ${e.attire} · ${e.map}`, "END:VEVENT"));
    lines.push("END:VCALENDAR");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
    a.download = list.length > 1 ? "Radhika-Aaryan-wedding.ics" : `Radhika-Aaryan-${list[0].id}.ics`; a.click();
  }
  $("#calAll").addEventListener("click", () => ics(events));

  // ---------- Scratch medallion ----------
  const sc = $("#scratch"), sx = sc.getContext("2d");
  let scratched = false, scratching = false, scratchTouched = false;
  function paintScratch() {
    const r = sc.getBoundingClientRect(); sc.width = r.width * dpr; sc.height = r.height * dpr;
    const w = sc.width, h = sc.height, gr = sx.createRadialGradient(w * .35, h * .3, 0, w / 2, h / 2, w * .6);
    gr.addColorStop(0, "#fff1bd"); gr.addColorStop(.35, "#e9c46a"); gr.addColorStop(.7, "#c9a24a"); gr.addColorStop(1, "#8a6a22");
    sx.fillStyle = gr; sx.beginPath(); sx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2); sx.fill();
    sx.strokeStyle = "#fff3c477"; sx.lineWidth = 1.2 * dpr;
    for (let k = 0; k < 16; k++) { sx.beginPath(); sx.ellipse(w / 2, h / 2, w * .42, w * .12, k * Math.PI / 8, 0, Math.PI * 2); sx.stroke(); }
    for (let i = 0; i < 500; i++) { sx.fillStyle = `rgba(255,255,255,${Math.random() * .3})`; sx.fillRect(Math.random() * w, Math.random() * h, 2 * dpr, 2 * dpr); }
    sx.fillStyle = "#fff8e3"; sx.beginPath(); sx.arc(w / 2, h / 2, w * .2, 0, Math.PI * 2); sx.fill();
    sx.fillStyle = "#6b4c12"; sx.textAlign = "center";
    sx.font = `${13 * dpr}px "Marcellus SC", "Rasa", serif`; sx.fillText(t("scratch1"), w / 2, h / 2 - 2 * dpr);
    sx.font = `${LANG === "gu" ? 20 * dpr : 26 * dpr}px "Pinyon Script", "Rasa", cursive`; sx.fillText(t("scratch2"), w / 2, h / 2 + 24 * dpr);
  }
  document.fonts.ready.then(paintScratch);
  const scratchAt = (e) => {
    const r = sc.getBoundingClientRect(); sx.globalCompositeOperation = "destination-out";
    sx.beginPath(); sx.arc((e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr, 26 * dpr, 0, Math.PI * 2); sx.fill();
    sx.globalCompositeOperation = "source-over";
  };
  sc.addEventListener("pointerdown", (e) => { scratching = true; scratchTouched = true; sc.setPointerCapture(e.pointerId); S.unlock(); scratchAt(e); });
  sc.addEventListener("pointermove", (e) => { if (scratching) { scratchAt(e); checkScratch(); } });
  sc.addEventListener("pointerup", () => { scratching = false; checkScratch(); });
  sc.addEventListener("pointercancel", () => { scratching = false; });
  function checkScratch() {
    if (scratched) return;
    const px = sx.getImageData(0, 0, sc.width, sc.height).data; let clear = 0, tot = 0;
    for (let i = 3; i < px.length; i += 80) { tot++; if (px[i] === 0) clear++; }
    if (clear / tot > .62) {
      scratched = true; sc.classList.add("done"); S.chime();
      const r = sc.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 120, PAL.gold.concat(PAL.lagna));
      gsap.fromTo(".medal-in > *", { scale: .7 }, { scale: 1, duration: .8, stagger: .1, ease: "back.out(2)" });
    }
  }

  // ---------- Countdown ----------
  const target = new Date(D.mainMoment).getTime(), cd = (k) => $(`[data-cd="${k}"]`);
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    cd("d").textContent = num(Math.floor(s / 86400)); s %= 86400;
    cd("h").textContent = num(Math.floor(s / 3600)); s %= 3600;
    cd("m").textContent = num(Math.floor(s / 60)); cd("s").textContent = num(s % 60);
  };
  tick(); setInterval(tick, 1000);

  // ---------- Photo reel: native swipe + snap; the centred photo gets a soft lift (no per-frame work) ----------
  const reel = $("#reel"), figs = $$("figure", reel), dots = $$("#dots i");
  const setOn = (i) => { figs.forEach((f, k) => f.classList.toggle("on", k === i)); dots.forEach((d, k) => d.classList.toggle("on", k === i)); };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((list) => list.forEach((en) => { if (en.isIntersecting) setOn(figs.indexOf(en.target)); }),
      { root: reel, threshold: 0.6 });
    figs.forEach((f) => io.observe(f));
  }
  // backup for browsers without IntersectionObserver timing: once the swipe settles, mark the centred photo
  let rt = 0;
  reel.addEventListener("scroll", () => { clearTimeout(rt); rt = setTimeout(() => {
    const mid = reel.scrollLeft + reel.clientWidth / 2;
    let best = 0, bd = 1e9; figs.forEach((f, i) => { const d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
    setOn(best);
  }, 90); }, { passive: true });
  setOn(0);
  const viewer = $("#viewer");
  reel.addEventListener("click", (e) => { const im = e.target.closest("img"); if (!im) return; $("img", viewer).src = im.src; viewer.hidden = false; });
  function closeViewer() { viewer.hidden = true; }
  viewer.addEventListener("click", closeViewer);

  // ---------- Sound toggle ----------
  const sBtn = $("#sound"), bgm = $("#bgm");
  sBtn.addEventListener("click", () => {
    S.on = !S.on; sBtn.classList.toggle("off", !S.on); sBtn.setAttribute("aria-label", S.on ? "Sound off" : "Sound on");
    if (D.music) S.on ? bgm.play().catch(() => {}) : bgm.pause();
  });
  document.addEventListener("visibilitychange", () => { if (D.music && document.hidden) bgm.pause(); else if (D.music && S.on && !$("#curtain")) bgm.play().catch(() => {}); });

  // ---------- RSVP ----------
  $("#rsvpBtn").addEventListener("click", () => {
    const f = $("#rsvpForm"), yes = f.att.value === "yes";
    const msg = [...t("rsvpMsg")(guestName(), D.bride.first, D.groom.first, yes, f.count.value),
      f.msg.value.trim()].filter(Boolean).join("\n");
    open(`https://wa.me/${D.rsvp.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });
})();
