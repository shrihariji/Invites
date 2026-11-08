/* Diwali + Gujarati New Year wish - HariKrishna AI Studios
   A wish link carries the sender's name in ?w= (base64url JSON {f: from, t: to, l: lang}); no server needed.
   Plain ?f=Name&t=Name&l=gu also works. No parameters = the studio's own wish. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const STUDIO = "Chaitanya Patel & Family";   // sender shown on the main link (no ?w=)
  const PHONE = "919408877393";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const T = {
    gu: {
      hint: "દીવો પ્રગટાવવા ટેપ કરો 🪔",
      swipe: "ઉપર સ્વાઇપ કરો",
      fromTop: ["✨ આપના માટે દિવાળીની શુભેચ્છા", "તરફથી"],
      t1: "શુભ દીપાવલી",
      l1: "દીવાની જ્યોત જેમ આપનું જીવન સદા ઝળહળતું રહે",
      t2: "નૂતન વર્ષાભિનંદન",
      l2: "સાલ મુબારક! નવું વર્ષ આપના પરિવાર માટે સુખ, સમૃદ્ધિ અને તંદુરસ્તી લઈને આવે.",
      signPre: "શુભેચ્છક", toPre: (t) => `સ્નેહી ${t},`,
      aTitle: "આપ પણ આપના સ્વજનોને શુભેચ્છા મોકલો",
      aSub: "ફક્ત આપનું નામ લખો — આપના નામ સાથે આવી જ શુભેચ્છા તૈયાર. તદ્દન મફત!",
      create: "🪔 મારી શુભેચ્છા બનાવો", forward: "📤 આ શુભેચ્છા આગળ મોકલો", tapMore: "આકાશમાં ટેપ કરો — વધુ ફટાકડા! 🎆",
      sEyebrow: "આ શુભેચ્છા ગમી?", sTag: "દરેક પ્રસંગ માટે ઇન્ટરેક્ટિવ ડિજિટલ આમંત્રણ અને શુભેચ્છા",
      occ: ["💍 લગ્ન", "💝 સગાઈ", "🎂 જન્મદિવસ", "🏡 વાસ્તુ પૂજન", "🪔 તહેવારની શુભેચ્છા", "✨ કોઈ પણ પ્રસંગ"],
      waStudio: "💬 વૉટ્સએપ કરો", call: "📞 કૉલ કરો", sample: "👉 લગ્ન આમંત્રણનો નમૂનો જુઓ",
      waStudioMsg: "નમસ્તે HariKrishna AI Studios, મેં આપની દિવાળી શુભેચ્છા જોઈ. મારે ડિજિટલ આમંત્રણ / શુભેચ્છા બનાવવી છે.",
      cTitle: "આપની શુભેચ્છા બનાવો", lbFrom: "આપનું / પરિવારનું નામ", phFrom: "દા.ત. મનુભાઈ પટેલ અને પરિવાર",
      lbLang: "શુભેચ્છાની ભાષા", lbMsg: "આપનો સંદેશ (જરૂર હોય તો બદલો)", msgHint: "નીચે આપની ખાસ લિંક આપોઆપ ઉમેરાશે.",
      copyAll: "📋 સંદેશ + લિંક કૉપી કરો", copyLink: "🔗 ફક્ત લિંક કૉપી કરો", copiedAll: "સંદેશ અને લિંક કૉપી થઈ ગયાં — હવે ગમે ત્યાં પેસ્ટ કરો!",
      tmpl: (n) => `🪔 દીપાવલીની હાર્દિક શુભકામનાઓ!\nનૂતન વર્ષ આપના જીવનમાં સુખ, સમૃદ્ધિ અને ઐશ્વર્ય લાવે. ✨\n\n— ${n || "આપનું નામ"}`,
      linkLine: "👇 મારી ખાસ શુભેચ્છા અહીં ખોલો:",
      make: "✨ શુભેચ્છા તૈયાર કરો", err: "કૃપા કરી આપનું નામ લખો",
      dTitle: "આપની શુભેચ્છા તૈયાર છે! 🎉", dSub: "હવે વૉટ્સએપ પર સ્વજનોને મોકલો — જે ખોલશે તેને આપનું નામ દેખાશે.",
      wa: "વૉટ્સએપ પર મોકલો", copy: "🔗 લિંક કૉપી કરો", copied: "લિંક કૉપી થઈ ગઈ!", share: "📤 બીજી રીતે શેર કરો",
      preview: "👀 પહેલાં જોઈ લો", again: "બીજા નામથી બનાવો",
      msg: (f, u) => `🪔 દીપાવલી અને નૂતન વર્ષની હાર્દિક શુભકામનાઓ! ✨\n${f} તરફથી આપના માટે એક ખાસ શુભેચ્છા 👇\n${u}`
    },
    hi: {
      hint: "दीया जलाने के लिए टैप करें 🪔",
      swipe: "ऊपर स्वाइप करें",
      fromTop: ["✨ आपके लिए दिवाली की शुभकामना", "की ओर से"],
      t1: "शुभ दीपावली",
      l1: "दीयों की रोशनी से आपका जीवन सदा जगमगाता रहे",
      t2: "नूतन वर्ष की शुभकामनाएँ",
      l2: "साल मुबारक! नया साल आपके परिवार के लिए सुख, समृद्धि और अच्छी सेहत लेकर आए।",
      signPre: "शुभेच्छु", toPre: (t) => `प्रिय ${t},`,
      aTitle: "आप भी अपनों को शुभकामना भेजें",
      aSub: "बस अपना नाम लिखें — आपके नाम के साथ ऐसी ही शुभकामना तैयार। बिल्कुल मुफ़्त!",
      create: "🪔 मेरी शुभकामना बनाएँ", forward: "📤 यह शुभकामना आगे भेजें", tapMore: "आसमान पर टैप करें — और आतिशबाज़ी! 🎆",
      sEyebrow: "यह शुभकामना पसंद आई?", sTag: "हर अवसर के लिए इंटरैक्टिव डिजिटल निमंत्रण और शुभकामनाएँ",
      occ: ["💍 शादी", "💝 सगाई", "🎂 जन्मदिन", "🏡 गृह प्रवेश", "🪔 त्योहार की शुभकामना", "✨ कोई भी अवसर"],
      waStudio: "💬 व्हाट्सऐप करें", call: "📞 कॉल करें", sample: "👉 शादी के निमंत्रण का नमूना देखें",
      waStudioMsg: "नमस्ते HariKrishna AI Studios, मैंने आपकी दिवाली शुभकामना देखी। मुझे डिजिटल निमंत्रण / शुभकामना बनवानी है।",
      cTitle: "अपनी शुभकामना बनाएँ", lbFrom: "आपका / परिवार का नाम", phFrom: "जैसे: मनुभाई पटेल एवं परिवार",
      lbLang: "शुभकामना की भाषा", lbMsg: "आपका संदेश (चाहें तो बदलें)", msgHint: "नीचे आपकी खास लिंक अपने आप जुड़ जाएगी।",
      copyAll: "📋 संदेश + लिंक कॉपी करें", copyLink: "🔗 सिर्फ़ लिंक कॉपी करें", copiedAll: "संदेश और लिंक कॉपी हो गए — अब कहीं भी पेस्ट करें!",
      tmpl: (n) => `🪔 दीपावली की हार्दिक शुभकामनाएँ!\nनया साल आपके जीवन में सुख, समृद्धि और ऐश्वर्य लाए। ✨\n\n— ${n || "आपका नाम"}`,
      linkLine: "👇 मेरी खास शुभकामना यहाँ खोलें:",
      make: "✨ शुभकामना तैयार करें", err: "कृपया अपना नाम लिखें",
      dTitle: "आपकी शुभकामना तैयार है! 🎉", dSub: "अब व्हाट्सऐप पर अपनों को भेजें — जो खोलेगा उसे आपका नाम दिखेगा।",
      wa: "व्हाट्सऐप पर भेजें", copy: "🔗 लिंक कॉपी करें", copied: "लिंक कॉपी हो गई!", share: "📤 दूसरे तरीके से शेयर करें",
      preview: "👀 पहले देख लें", again: "दूसरे नाम से बनाएँ",
      msg: (f, u) => `🪔 दीपावली और नूतन वर्ष की हार्दिक शुभकामनाएँ! ✨\n${f} की ओर से आपके लिए एक खास शुभकामना 👇\n${u}`
    },
    en: {
      hint: "Tap to light the diya 🪔",
      swipe: "Swipe up",
      fromTop: ["✨ A Diwali wish for you from", ""],
      t1: "Happy Diwali",
      l1: "May the light of every diya fill your home with joy",
      t2: "Saal Mubarak · Happy New Year",
      l2: "May the new year bring your family happiness, prosperity and good health.",
      signPre: "With love,", toPre: (t) => `Dear ${t},`,
      aTitle: "Send a wish like this to your loved ones",
      aSub: "Just type your name — your own wish is ready in seconds. Completely free!",
      create: "🪔 Create my wish", forward: "📤 Forward this wish", tapMore: "Tap the sky for more fireworks! 🎆",
      sEyebrow: "Loved this wish?", sTag: "Interactive digital invitations & wishes for every occasion",
      occ: ["💍 Wedding", "💝 Engagement", "🎂 Birthday", "🏡 Housewarming", "🪔 Festival wishes", "✨ Any event"],
      waStudio: "💬 WhatsApp us", call: "📞 Call now", sample: "👉 See a sample wedding invite",
      waStudioMsg: "Hi HariKrishna AI Studios, I saw your Diwali wish. I'd like a digital invitation / wish made.",
      cTitle: "Create your wish", lbFrom: "Your / family name", phFrom: "e.g. Manubhai Patel & Family",
      lbLang: "Language of the wish", lbMsg: "Your message (edit if you like)", msgHint: "Your special link is added at the end automatically.",
      copyAll: "📋 Copy message + link", copyLink: "🔗 Copy link only", copiedAll: "Message and link copied — paste it anywhere!",
      tmpl: (n) => `🪔 Best wishes of Diwali!\nMay the new year bring you more prosperity and wealth. ✨\n\n— ${n || "Your name"}`,
      linkLine: "👇 Open my special Diwali wish here:",
      make: "✨ Create my wish", err: "Please type your name",
      dTitle: "Your wish is ready! 🎉", dSub: "Now send it on WhatsApp — everyone who opens it will see your name.",
      wa: "Send on WhatsApp", copy: "🔗 Copy link", copied: "Link copied!", share: "📤 Share another way",
      preview: "👀 Preview first", again: "Make one with another name",
      msg: (f, u) => `🪔 Happy Diwali & a joyous New Year! ✨\nA special wish for you from ${f} 👇\n${u}`
    }
  };

  // ---------- read the wish from the link ----------
  const clean = (s, n) => String(s || "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
  const b64e = (o) => { const b = new TextEncoder().encode(JSON.stringify(o)); let s = ""; b.forEach((c) => (s += String.fromCharCode(c)));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  const b64d = (s) => { s = s.replace(/-/g, "+").replace(/_/g, "/"); const bin = atob(s + "===".slice((s.length + 3) % 4));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))); };
  const q = new URLSearchParams(location.search);
  let W = { f: "", t: "", l: "gu" };
  try { if (q.get("w")) W = { ...W, ...b64d(q.get("w")) }; } catch (e) { /* broken link - show the studio wish */ }
  if (q.get("f")) W.f = q.get("f"); if (q.get("t")) W.t = q.get("t"); if (q.get("l")) W.l = q.get("l");
  W.f = clean(W.f, 48) || STUDIO; W.t = clean(W.t, 40); if (!T[W.l]) W.l = "gu";
  const isStudio = W.f === STUDIO;
  let lang = W.l, formLang = W.l, lastLink = "";
  const base = location.origin + location.pathname.replace(/index\.html$/, "");
  const t = (k) => T[lang][k];

  // ---------- fill the words ----------
  function render() {
    document.body.dataset.lang = lang; document.documentElement.lang = lang;
    $$(".lang-chips.top button").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));
    $("#tapHint").textContent = t("hint");
    $("#swipeTxt").textContent = t("swipe");
    const ft = $("#fromTop"); ft.textContent = ""; const [a, b] = t("fromTop");
    const nm = document.createElement("b"); nm.textContent = W.f; ft.append(a, nm, b); ft.classList.add("show");
    $("#t1").textContent = t("t1"); $("#l1").textContent = t("l1");
    $("#t2").textContent = t("t2"); $("#l2").textContent = t("l2");
    const sg = $("#sign"); sg.textContent = "";
    if (W.t) { const to = document.createElement("span"); to.className = "to"; to.textContent = t("toPre")(W.t); sg.append(to); }
    sg.append(t("signPre")); const sb = document.createElement("b"); sb.textContent = W.f; sg.append(sb);
    $("#aTitle").textContent = t("aTitle"); $("#aSub").textContent = t("aSub");
    $("#btnCreate").textContent = t("create"); $("#btnForward").textContent = t("forward"); $("#tapMore").textContent = t("tapMore");
    $("#sEyebrow").textContent = t("sEyebrow"); $("#sTag").textContent = t("sTag");
    $("#sOcc").innerHTML = ""; t("occ").forEach((o) => { const li = document.createElement("li"); li.textContent = o; $("#sOcc").append(li); });
    $("#waStudio").textContent = t("waStudio"); $("#waStudio").href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t("waStudioMsg"))}`;
    $("#callStudio").textContent = t("call"); $("#sample").textContent = t("sample");
    // sheet
    $("#cTitle").textContent = t("cTitle"); $("#lbFrom").textContent = t("lbFrom"); $("#inFrom").placeholder = t("phFrom");
    $("#lbLang").textContent = t("lbLang"); $("#lbMsg").textContent = t("lbMsg"); $("#msgHint").textContent = t("msgHint");
    $$(".lang-chips.form button").forEach((b) => b.classList.toggle("on", b.dataset.fl === lang));
    $("#btnMake").textContent = t("make"); $("#dTitle").textContent = t("dTitle"); $("#dSub").textContent = t("dSub");
    $("#btnWa").textContent = t("wa"); $("#btnCopy").textContent = t("copyAll"); $("#btnCopyLink").textContent = t("copyLink"); $("#btnShare").textContent = t("share");
    $("#btnPreview").textContent = t("preview"); $("#btnAgain").textContent = t("again");
    document.title = `${t("t1")} · ${W.f}`;
  }
  $$(".lang-chips.top button").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.l; render(); }));

  // ---------- rangoli (drawn in code) ----------
  (function rangoli() {
    const svg = $("#rangoli"), NS = "http://www.w3.org/2000/svg"; let k = 0;
    const add = (tag, attrs) => { const el = document.createElementNS(NS, tag); for (const a in attrs) el.setAttribute(a, attrs[a]);
      el.setAttribute("pathLength", "1"); el.style.cssText = `stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.6s ${(k++ % 24) * .05 + .2}s ease`;
      svg.append(el); return el; };
    const petal = (r1, r2, w, rot, col, fill) => add("path", { d: `M0,${-r1} Q${w},${-(r1 + r2) / 2} 0,${-r2} Q${-w},${-(r1 + r2) / 2} 0,${-r1}Z`,
      transform: `rotate(${rot})`, stroke: col, "stroke-width": 3, fill: fill || "none" });
    const rings = [[48, 96, 22, 8, "#ff3d7f", "#ff3d7f22"], [96, 140, 20, 16, "#ffcf6b", "#ffcf6b1a"], [140, 176, 14, 24, "#2ec4b6", "#2ec4b61a"]];
    rings.forEach(([r1, r2, w, n, c, f], ri) => { for (let i = 0; i < n; i++) petal(r1, r2, w, i * 360 / n + (ri % 2) * 180 / n, c, f); });
    [[48, "#ff8a1f"], [96, "#ffffff88"], [140, "#ff3d7f88"], [184, "#ffcf6b"]].forEach(([r, c]) => add("circle", { r, stroke: c, "stroke-width": 2.4, "stroke-dasharray": "1" }));
    for (let i = 0; i < 36; i++) { const a = i * Math.PI / 18; add("circle", { cx: Math.cos(a) * 194, cy: Math.sin(a) * 194, r: 3.4, stroke: i % 2 ? "#ffcf6b" : "#ff3d7f", "stroke-width": 3 }); }
  })();

  // ---------- diya row ----------
  for (let i = 0; i < 5; i++) { const d = document.createElement("img"); d.className = "rd"; d.alt = ""; d.dataset.src = "assets/fx/diya.webp"; $("#diyaRow").append(d); }
  const vids = $$("video.v");
  const playV = (v, at = 0) => { try { if (at) v.currentTime = at; v.play().catch(() => {}); v.classList.add("on"); } catch (e) {} };
  document.addEventListener("visibilitychange", () => vids.forEach((v) => (document.hidden ? v.pause() : v.classList.contains("on") && v.play().catch(() => {}))));

  // ---------- sky + fireworks ----------
  const sky = $("#sky"), fx = $("#fx"), sc = sky.getContext("2d"), cx = fx.getContext("2d");
  let Wd = 0, Ht = 0, dpr = 1;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2); Wd = innerWidth; Ht = innerHeight;
    for (const c of [sky, fx]) { c.width = Wd * dpr; c.height = Ht * dpr; }
    sc.setTransform(dpr, 0, 0, dpr, 0, 0); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sc.clearRect(0, 0, Wd, Ht);
    for (let i = 0; i < Math.min(160, Wd * Ht / 4000); i++) {
      const x = Math.random() * Wd, y = Math.random() * Ht * .75, r = Math.random() * 1.3 + .2;
      sc.fillStyle = `rgba(255,${230 + Math.random() * 25 | 0},${190 + Math.random() * 60 | 0},${Math.random() * .7 + .2})`;
      sc.beginPath(); sc.arc(x, y, r, 0, 7); sc.fill();
    }
  }
  size(); addEventListener("resize", size);

  const COLS = ["#ffcf6b", "#ff3d7f", "#2ec4b6", "#ff8a1f", "#ffffff", "#b388ff", "#7CFC9A"];
  let parts = [], rockets = [], running = false;
  function burst(x, y) {
    const col = COLS[Math.random() * COLS.length | 0], col2 = COLS[Math.random() * COLS.length | 0];
    const n = calm ? 30 : 70 + (Math.random() * 30 | 0), sp = 2.2 + Math.random() * 1.6;
    for (let i = 0; i < n && parts.length < 900; i++) {
      const a = Math.PI * 2 * i / n + Math.random() * .1, v = sp * (.6 + Math.random() * .5);
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: .010 + Math.random() * .01, c: i % 3 ? col : col2, s: 1.6 + Math.random() * 1.2 });
    }
    S.boom();
  }
  function launch(tx, ty) {
    tx = tx ?? Wd * (.15 + Math.random() * .7); ty = ty ?? Ht * (.1 + Math.random() * .3);
    rockets.push({ x: tx + (Math.random() - .5) * 40, y: Ht + 10, tx, ty, v: 7 + Math.random() * 3 });
  }
  function loop() {
    cx.globalCompositeOperation = "destination-out"; cx.fillStyle = "rgba(0,0,0,.22)"; cx.fillRect(0, 0, Wd, Ht);
    cx.globalCompositeOperation = "lighter";
    rockets = rockets.filter((r) => {
      const dx = r.tx - r.x, dy = r.ty - r.y, d = Math.hypot(dx, dy);
      if (d < r.v) { burst(r.tx, r.ty); return false; }
      r.x += dx / d * r.v; r.y += dy / d * r.v;
      cx.fillStyle = "#ffe9a8"; cx.beginPath(); cx.arc(r.x, r.y, 2, 0, 7); cx.fill(); return true;
    });
    parts = parts.filter((p) => {
      p.vx *= .985; p.vy = p.vy * .985 + .035; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      if (p.life <= 0) return false;
      cx.globalAlpha = Math.max(p.life, 0); cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.s * (p.life * .6 + .4), 0, 7); cx.fill(); return true;
    });
    cx.globalAlpha = 1;
    if (running || parts.length || rockets.length) requestAnimationFrame(loop); else cx.clearRect(0, 0, Wd, Ht);
  }
  function startFx() { if (!running) { running = true; requestAnimationFrame(loop); } }
  let auto;
  function autoShow() {
    clearTimeout(auto);
    if (document.hidden) return;
    const heroVisible = $("#hero").getBoundingClientRect().bottom > innerHeight * .3;
    if (heroVisible) launch();
    auto = setTimeout(autoShow, calm ? 6000 : 1800 + Math.random() * 2200);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && document.body.classList.contains("lit")) autoShow(); });

  // ---------- sound (WebAudio, no files) ----------
  const S = { ctx: null, out: null, on: true,
    init() { if (this.ctx) return; try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); this.out = this.ctx.createGain();
      this.out.gain.value = .55; this.out.connect(this.ctx.destination); } catch (e) { this.ctx = null; } },
    bell(f0 = 660, t0 = 0) { if (!this.ctx) return; const c = this.ctx, now = c.currentTime + t0;
      [[1, .5], [2.76, .25], [5.4, .12], [8.93, .06]].forEach(([m, g]) => { const o = c.createOscillator(), v = c.createGain();
        o.type = "sine"; o.frequency.value = f0 * m; v.gain.setValueAtTime(0, now); v.gain.linearRampToValueAtTime(g, now + .01);
        v.gain.exponentialRampToValueAtTime(.0001, now + 3.2 / Math.sqrt(m)); o.connect(v).connect(this.out); o.start(now); o.stop(now + 3.5); }); },
    boom() { if (!this.ctx) return; const c = this.ctx, now = c.currentTime, len = c.sampleRate * 1.2 | 0, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3) * (i > len * .25 && Math.random() < .004 ? 4 : 1);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = buf; f.type = "lowpass"; f.frequency.value = 900 + Math.random() * 700;
      g.gain.value = .35; s.connect(f).connect(g).connect(this.out); s.start(now); } };
  $("#mute").addEventListener("click", () => { S.on = !S.on; if (S.out) S.out.gain.value = S.on ? .55 : 0; $("#mute").textContent = S.on ? "🔊" : "🔇"; });

  // ---------- the moment ----------
  let lit = false;
  const at = (ms, fn) => setTimeout(fn, calm ? Math.min(ms, 300) : ms);
  function light() {
    if (lit) return; lit = true;
    S.init(); if (S.ctx && S.ctx.state === "suspended") S.ctx.resume();
    $("#mainDiya").classList.add("on"); document.body.classList.add("lit"); $("#mute").hidden = false;
    S.bell(660); S.bell(990, .5);
    at(300, () => $$("#rangoli > *").forEach((el) => (el.style.strokeDashoffset = "0")));
    $$("#diyaRow img").forEach((d) => (d.src = d.dataset.src));
    const cp = $("#couple"); cp.src = cp.dataset.src; cp.hidden = false;
    $$("#diyaRow img").forEach((d, i) => at(500 + i * 260, () => { d.classList.add("show"); S.bell(880 + i * 60, 0); }));
    at(900, () => playV($("#fxv .rk1")));
    at(1700, () => { playV($("#fxv .an1")); playV($("#fxv .an2"), 2.5); });
    at(2600, () => playV($("#fxv .rk2"), 3.2));
    at(4700, () => document.body.classList.add("couple-time"));
    at(1100, () => { startFx(); launch(Wd * .3, Ht * .2); });
    at(1500, () => launch(Wd * .7, Ht * .16));
    ["#t1", "#l1", "#t2", "#l2", "#sign"].forEach((id, i) => at(1300 + i * 900, () => $(id).classList.add("in")));
    at(2500, () => launch(Wd * .5, Ht * .12));
    at(6200, () => { document.body.classList.add("revealed"); $$(".fx-strip video").forEach((v, i) => playV(v, i * 1.7)); document.body.classList.remove("locked"); $("#scrollHint").classList.add("show"); autoShow(); });
  }
  $("#mainDiya").addEventListener("click", light);
  // tap the sky = more fireworks
  $("#hero").addEventListener("click", (e) => {
    if (!lit) { light(); return; }
    if (e.target.closest("button,a")) return;
    S.init(); launch(e.clientX, Math.min(e.clientY, Ht * .6));
  });
  $("#scrollHint").addEventListener("click", (e) => { e.stopPropagation(); $("#actions").scrollIntoView({ behavior: "smooth" }); });

  // ---------- sharing ----------
  const toast = (m) => { const el = $("#toast"); el.textContent = m; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 2200); };
  const waLink = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.append(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    toast(T[formLang].copied);
  }
  $("#btnForward").addEventListener("click", () => {
    const u = isStudio ? base : location.href;
    if (navigator.share) navigator.share({ text: T[lang].msg(W.f, "").trim(), url: u }).catch(() => {});
    else window.open(waLink(T[lang].msg(W.f, u)), "_blank");
  });

  // ---------- create sheet ----------
  const sheet = $("#sheet"); let msgEdited = false;
  const fillMsg = () => { if (!msgEdited) $("#inMsg").value = T[lang].tmpl(clean($("#inFrom").value, 48)); };
  function setFormLang(l) { formLang = l; lang = l; render(); fillMsg(); }
  function openSheet() {
    sheet.hidden = false; $("#formStep").hidden = false; $("#doneStep").hidden = true; $("#err").hidden = true;
    setFormLang(lang); setTimeout(() => $("#inFrom").focus(), 250);
  }
  $("#btnCreate").addEventListener("click", openSheet);
  $("#sheetClose").addEventListener("click", () => (sheet.hidden = true));
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.hidden = true; });
  $$(".lang-chips.form button").forEach((b) => b.addEventListener("click", () => { msgEdited = false; setFormLang(b.dataset.fl); }));
  $("#inFrom").addEventListener("input", fillMsg);
  $("#inMsg").addEventListener("input", () => (msgEdited = true));
  let fullText = "";
  function make() {
    const f = clean($("#inFrom").value, 48);
    if (!f) { $("#err").textContent = T[lang].err; $("#err").hidden = false; $("#inFrom").focus(); return; }
    lastLink = `${base}?w=${b64e({ f, l: formLang })}`;
    const msg = ($("#inMsg").value || T[formLang].tmpl(f)).trim().slice(0, 600);
    fullText = `${msg}\n\n${T[formLang].linkLine}\n${lastLink}`;
    $("#linkBox").textContent = fullText;
    $("#btnWa").href = waLink(fullText);
    $("#btnPreview").href = lastLink;
    $("#btnShare").hidden = !navigator.share;
    $("#formStep").hidden = true; $("#doneStep").hidden = false;
  }
  $("#btnMake").addEventListener("click", make);
  $("#inFrom").addEventListener("keydown", (e) => { if (e.key === "Enter") make(); });
  $("#btnCopy").addEventListener("click", async () => { await copy(fullText); toast(T[formLang].copiedAll); });
  $("#btnCopyLink").addEventListener("click", () => copy(lastLink));
  $("#btnShare").addEventListener("click", () => navigator.share({ text: fullText }).catch(() => {}));
  $("#btnAgain").addEventListener("click", () => { $("#inFrom").value = ""; msgEdited = false; fillMsg(); $("#formStep").hidden = false; $("#doneStep").hidden = true; });

  // ---------- "Swipe up" hint (like the wedding invite) - shows when the viewer pauses ----------
  const sw = $("#swipe"); let swT = 0, swCount = 0;
  const atEnd = () => innerHeight + scrollY > document.documentElement.scrollHeight - 220;
  function swShow() { if (!document.body.classList.contains("revealed") || !sheet.hidden || atEnd()) return; sw.classList.add("show"); }
  function swHide() { clearTimeout(swT); sw.classList.remove("show"); }
  function swIdle(ms) { swHide(); swT = setTimeout(swShow, ms); }
  addEventListener("scroll", () => swIdle(swCount++ < 40 ? 3000 : 6000), { passive: true });
  addEventListener("pointerdown", () => sw.classList.contains("show") && swIdle(4500), { passive: true });
  new MutationObserver(() => { if (document.body.classList.contains("revealed")) swIdle(1200); })
    .observe(document.body, { attributes: true, attributeFilter: ["class"] });

  document.body.classList.add("locked");
  render();
})();
