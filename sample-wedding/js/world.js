/* Version 2 "one-shot": one continuous royal world behind the whole invite.
   The palace slowly pushes in as you scroll, and the light changes colour for each event - no cuts. */
(() => {
  const world = document.getElementById("world");
  if (!world || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const img = world.querySelector("img.palace"), wash = world.querySelector(".wash");

  // camera push through the whole page
  if (!calm) gsap.fromTo(img, { scale: 1.02, yPercent: 0 }, { scale: 1.45, yPercent: -6, ease: "none",
    scrollTrigger: { trigger: "#app", start: "top top", end: "bottom bottom", scrub: 1.2 } });

  // the toran garland rises out of view once the guest starts scrolling
  const tor = world.querySelector(".toran");
  if (tor && !calm) gsap.to(tor, { yPercent: -105, ease: "none", scrollTrigger: { trigger: "#app", start: "top top", end: "+=" + innerHeight * .9, scrub: .6 } });

  // the hero couple steps back as the invitation text arrives, so later sections stay clean
  // the couple rises in once the envelope has opened
  const hc = document.querySelector(".hero-couple");
  const rise = () => gsap.to(hc, { opacity: 1, y: 0, duration: 1.4, delay: 1.5, ease: "power3.out" });
  if (hc) {
    if (!document.body.classList.contains("locked")) rise();
    else new MutationObserver((m, o) => { if (!document.body.classList.contains("locked")) { o.disconnect(); rise(); } })
      .observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  // colour of the light for each part of the invite
  const LIGHT = [   // bright daylight palette (sample)
    [".hero",        "#ffd9e6", "#ffe3a3", .5],
    ["#journey",     "#d9ecff", "#ffd6ec", .6],
    [".save",        "#ffe7b8", "#ffc7dc", .62],
    [".glance",      "#fff0c2", "#ffd0e4", .64],
    ["#ev-mehendi",  "#d6f5c9", "#ffd3e6", .55],
    ["#ev-survani",  "#ffd0f2", "#cfe0ff", .55],
    ["#ev-mandva",   "#fff3a6", "#ffd27a", .55],
    ["#ev-lagna",    "#ffd6d0", "#ffc9a0", .55],
    [".moments",     "#e2f0ff", "#ffd9ec", .66],
    [".family",      "#fff1d0", "#ffd5e5", .7],
    ["#studio",      "#fff1d0", "#ffc4da", .74]
  ];
  const setLight = ([, a, b, o]) => gsap.to(wash, { "--w1": a, "--w2": b, opacity: o, duration: 1.4, ease: "sine.inOut", overwrite: "auto" });
  LIGHT.forEach((row) => {
    const el = document.querySelector(row[0]);
    if (el) ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onEnter: () => setLight(row), onEnterBack: () => setLight(row) });
  });
  setLight(LIGHT[0]);
})();
