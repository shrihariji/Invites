/* Royal wedding invite - all text comes from data.js (window.INVITE). */
(() => {
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), D);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Guest from link: ?g=<code> (made by tools/make-links) or ?to=Name ----------
  const params = new URLSearchParams(location.search);
  let guest = D.defaultGuest, guestEvents = null;
  try {
    if (params.get("g")) {
      const b64 = params.get("g").replace(/-/g, "+").replace(/_/g, "/");
      const text = new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
      const [name, evs] = text.split("|");
      if (name) guest = name;
      if (evs) guestEvents = evs.split(",").map((e) => e.trim()).filter(Boolean);
    } else if (params.get("to")) {
      guest = params.get("to");
    }
  } catch (e) { /* bad link: fall back to the default greeting */ }

  // ---------- Fill text ----------
  document.title = D.pageTitle;
  $$("[data-field]").forEach((el) => (el.textContent = get(el.dataset.field)));
  $$("[data-href]").forEach((el) => (el.href = get(el.dataset.href)));
  $$("[data-src]").forEach((el) => (el.src = get(el.dataset.src)));
  $$("[data-guest]").forEach((el) => (el.textContent = guest));
  const r = D.dateReveal;
  $("[data-hero-date]").textContent = `${r.day} · ${r.month} · ${r.year}`;
  $("#storyText").innerHTML = D.story.text.map((t) => `<p class="reveal">${esc(t)}</p>`).join("");

  const events = D.events.filter((e) => !guestEvents || guestEvents.includes(e.id));
  $("#eventList").innerHTML = events.map((e) => `
    <article class="event reveal">
      <img src="assets/img/icon-${esc(e.icon || e.id)}.webp" alt="" loading="lazy">
      <div>
        <h3>${esc(e.name)}</h3>
        <p class="when">${esc(e.date)} · ${esc(e.time)}</p>
        <p>${esc(e.venue)}</p>
        <p class="dress">Dress code: ${esc(e.dress)}</p>
        <a href="${esc(e.map)}" target="_blank" rel="noopener">View on map →</a>
      </div>
    </article>`).join("");

  $("#blessList").innerHTML = D.blessingsFrom.map((b) => `
    <div class="bless reveal"><h4>${esc(b.title)}</h4>${b.names.map((n) => `<p>${esc(n)}</p>`).join("")}</div>`).join("");

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  // ---------- Optional living background (palace loop video) ----------
  const vid = $(".hero-video");
  vid.preload = "auto";
  vid.src = "assets/video/palace-loop.mp4";
  vid.load();
  vid.addEventListener("canplay", () => { vid.classList.add("ready"); vid.play().catch(() => {}); }, { once: true });
  vid.addEventListener("error", () => vid.remove(), { once: true });

  // ---------- Petals & confetti ----------
  const cv = $("#petals"), cx = cv.getContext("2d");
  let W, H, parts = [], ambient = false, raf = 0;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = () => { W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
  size(); addEventListener("resize", size);
  const PETAL = ["#b3122e", "#d8344f", "#f08a24", "#f7b733", "#ffffff", "#e75a7c"];
  const GOLD = ["#f1d68b", "#c9a24a", "#fff3c4", "#e2b955"];
  function spawn(x, y, burst, colors) {
    const a = Math.random() * Math.PI * 2, sp = burst ? 4 + Math.random() * 9 : 0;
    parts.push({
      x, y, vx: Math.cos(a) * sp, vy: burst ? Math.sin(a) * sp - 4 : 1 + Math.random() * 1.5,
      r: (6 + Math.random() * 7) * dpr, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.12,
      sway: Math.random() * 6, c: colors[(Math.random() * colors.length) | 0], life: 1
    });
  }
  function burst(n, colors, x = W / 2, y = H * 0.5) { for (let i = 0; i < n; i++) spawn(x, y, true, colors); loop(); }
  function loop() {
    if (raf) return;
    const step = () => {
      cx.clearRect(0, 0, W, H);
      if (ambient && parts.length < 45 && Math.random() < 0.25) spawn(Math.random() * W, -20, false, PETAL);
      parts = parts.filter((p) => p.y < H + 40 && p.life > 0);
      for (const p of parts) {
        p.vy += 0.06; p.vx *= 0.985; if (p.vy > 2.4) p.vy = 2.4;
        p.sway += 0.03; p.x += p.vx + Math.sin(p.sway) * 0.8 * dpr; p.y += p.vy * dpr; p.rot += p.vr;
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.scale(1, Math.abs(Math.cos(p.sway)) * 0.6 + 0.4);
        cx.fillStyle = p.c; cx.beginPath(); cx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2); cx.fill(); cx.restore();
      }
      if (parts.length || ambient) raf = requestAnimationFrame(step); else { raf = 0; cx.clearRect(0, 0, W, H); }
    };
    raf = requestAnimationFrame(step);
  }

  // ---------- Music ----------
  const bgm = $("#bgm"), mBtn = $("#music");
  bgm.volume = 0.6;
  const setPlaying = (on) => { mBtn.classList.toggle("playing", on); mBtn.setAttribute("aria-label", on ? "Pause music" : "Play music"); };
  mBtn.addEventListener("click", () => { if (bgm.paused) bgm.play().then(() => setPlaying(true)); else { bgm.pause(); setPlaying(false); } });

  // ---------- Opening the gate ----------
  const gate = $("#gate"), seal = $("#seal");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".hero-content > *", { opacity: 0, y: 24 });
  gsap.set(".hero-couple", { opacity: 0, y: 80 });

  seal.addEventListener("click", openGate, { once: true });
  function openGate() {
    bgm.play().then(() => { setPlaying(true); mBtn.hidden = false; }).catch(() => { mBtn.hidden = false; });
    seal.style.animation = "none";
    const tl = gsap.timeline({ onComplete: afterOpen });
    tl.to(seal, { scale: 1.25, duration: 0.25, ease: "power2.out" })
      .to(seal, { scale: 0, rotation: 120, opacity: 0, duration: 0.45, ease: "back.in(2)" })
      .to(".gate-ui", { opacity: 0, y: -20, duration: 0.4 }, "<")
      .to(".gate-burst", { opacity: 1, duration: 0.35 }, "-=0.1")
      .add(() => burst(90, GOLD, W / 2, H * 0.55))
      .to(".door-left", { rotationY: -108, duration: 2.4, ease: "power3.inOut" }, "-=0.05")
      .to(".door-right", { rotationY: 108, duration: 2.4, ease: "power3.inOut" }, "<")
      .to(".gate-stage", { scale: 1.35, duration: 2.4, ease: "power2.in" }, "<")
      .to(".gate-burst", { opacity: 0, duration: 1.4 }, "<0.4")
      .to(gate, { opacity: 0, duration: 0.6 }, "-=0.6");
  }
  function afterOpen() {
    gate.remove();
    document.body.classList.remove("locked");
    ambient = !reduceMotion; loop();
    gsap.timeline()
      .to(".hero-content > *", { opacity: 1, y: 0, duration: 1, stagger: 0.22, ease: "power3.out" })
      .to(".hero-couple", { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.5);
    ScrollTrigger.refresh();
  }
  // Petals only while the palace is on screen (saves battery further down)
  ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top",
    onLeave: () => (ambient = false), onEnterBack: () => { ambient = !reduceMotion; loop(); } });

  // ---------- Scroll reveals ----------
  if (!reduceMotion) {
    $$(".reveal").forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" } }));
    gsap.to(".hero-bg", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.fromTo(".venue-art img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".venue-art", scrub: true } });
  }

  // ---------- Scratch the heart ----------
  const sc = $("#scratch"), sx = sc.getContext("2d");
  let scratched = false;
  function paintScratch() {
    const rct = sc.getBoundingClientRect();
    sc.width = rct.width * dpr; sc.height = rct.height * dpr;
    const g = sx.createLinearGradient(0, 0, sc.width, sc.height);
    g.addColorStop(0, "#8a6a22"); g.addColorStop(0.35, "#f1d68b"); g.addColorStop(0.55, "#c9a24a"); g.addColorStop(0.8, "#fff1bd"); g.addColorStop(1, "#a07c2c");
    sx.fillStyle = g; sx.fillRect(0, 0, sc.width, sc.height);
    for (let i = 0; i < 400; i++) { sx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`; sx.fillRect(Math.random() * sc.width, Math.random() * sc.height, 2 * dpr, 2 * dpr); }
    sx.fillStyle = "#5a3d0e"; sx.textAlign = "center";
    sx.font = `${16 * dpr}px Cinzel, serif`; sx.fillText("SCRATCH HERE", sc.width / 2, sc.height * 0.42);
    sx.font = `${30 * dpr}px "Pinyon Script", cursive`; sx.fillText("our big day", sc.width / 2, sc.height * 0.56);
  }
  document.fonts.ready.then(paintScratch);
  let drawing = false;
  const scratchAt = (e) => {
    const rct = sc.getBoundingClientRect();
    sx.globalCompositeOperation = "destination-out";
    sx.beginPath(); sx.arc((e.clientX - rct.left) * dpr, (e.clientY - rct.top) * dpr, 24 * dpr, 0, Math.PI * 2); sx.fill();
  };
  sc.addEventListener("pointerdown", (e) => { drawing = true; sc.setPointerCapture(e.pointerId); scratchAt(e); });
  sc.addEventListener("pointermove", (e) => drawing && scratchAt(e));
  sc.addEventListener("pointerup", () => { drawing = false; checkScratch(); });
  function checkScratch() {
    if (scratched) return;
    const px = sx.getImageData(0, 0, sc.width, sc.height).data;
    let clear = 0;
    for (let i = 3; i < px.length; i += 64) if (px[i] === 0) clear++;
    if (clear / (px.length / 64) > 0.45) {
      scratched = true; sc.classList.add("done");
      const rct = sc.getBoundingClientRect();
      burst(120, GOLD.concat(PETAL), (rct.left + rct.width / 2) * dpr, (rct.top + rct.height / 2) * dpr);
      gsap.fromTo(".heart-content > *", { scale: 0.7 }, { scale: 1, duration: 0.8, stagger: 0.08, ease: "back.out(2)" });
    }
  }

  // ---------- Countdown ----------
  const target = new Date(D.weddingDate).getTime();
  const cd = (k) => $(`[data-cd="${k}"]`);
  function tick() {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    cd("d").textContent = Math.floor(s / 86400); s %= 86400;
    cd("h").textContent = Math.floor(s / 3600); s %= 3600;
    cd("m").textContent = Math.floor(s / 60);
    cd("s").textContent = s % 60;
  }
  tick(); setInterval(tick, 1000);

  // ---------- Add to calendar (.ics) ----------
  $("#addCal").addEventListener("click", () => {
    const start = new Date(D.weddingDate), end = new Date(start.getTime() + 4 * 3600e3);
    const f = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//invite//EN", "BEGIN:VEVENT",
      `UID:${f(start)}@invite`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
      `SUMMARY:${D.occasion[0].toUpperCase() + D.occasion.slice(1)} of ${D.groom.first} & ${D.bride.first}`, `LOCATION:${D.venue.name}, ${D.venue.address}`,
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = `${D.groom.first}-${D.bride.first}-wedding.ics`; a.click();
  });

  // ---------- RSVP via WhatsApp ----------
  $("#rsvpBtn").addEventListener("click", () => {
    const f = $("#rsvpForm");
    const yes = f.att.value === "yes";
    const lines = [
      `Namaste! This is ${guest}.`,
      yes ? `We will joyfully attend the ${D.occasion} of ${D.groom.first} & ${D.bride.first}. Guests: ${f.count.value}.`
          : `We are sorry to miss the ${D.occasion} of ${D.groom.first} & ${D.bride.first}, but send our blessings.`,
      f.msg.value.trim()
    ].filter(Boolean);
    window.open(`https://wa.me/${D.rsvp.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  });
})();
