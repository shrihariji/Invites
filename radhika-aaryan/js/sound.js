/* Small sound kit made in code (no audio files): temple bell, tabla, chime, silk whoosh. */
window.SFX = (() => {
  let ac = null, master = null, on = true;
  const ctx = () => {
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      master = ac.createGain(); master.gain.value = 0.7;
      const comp = ac.createDynamicsCompressor(); master.connect(comp); comp.connect(ac.destination);
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  };
  const env = (g, t, a, peak, d) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); };

  function bell(f = 660, vol = 0.35, when = 0) {
    if (!on) return; const c = ctx(), t = c.currentTime + when;
    // inharmonic partials of a brass temple bell
    [[1, 1, 3.2], [2.02, .55, 2.4], [2.76, .4, 1.8], [4.07, .22, 1.2], [5.43, .14, .9], [6.8, .08, .6]].forEach(([r, a, d]) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = f * r; o.detune.value = (Math.random() - .5) * 8;
      env(g, t, 0.004, vol * a, d); o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .1);
    });
  }
  function noise(dur) {
    const c = ctx(), b = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), ch = b.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b; return s;
  }
  function tabla(kind = "dha") {
    if (!on) return; const c = ctx(), t = c.currentTime;
    // bayan (bass) - pitch bend down
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(kind === "na" ? 110 : 150, t); o.frequency.exponentialRampToValueAtTime(70, t + .35);
    env(g, t, .003, kind === "na" ? .25 : .7, .5); o.connect(g); g.connect(master); o.start(t); o.stop(t + .6);
    // dayan (treble ring)
    const o2 = c.createOscillator(), g2 = c.createGain();
    o2.type = "triangle"; o2.frequency.value = kind === "na" ? 520 : 390;
    env(g2, t, .002, .28, kind === "na" ? .45 : .25); o2.connect(g2); g2.connect(master); o2.start(t); o2.stop(t + .5);
    // skin slap
    const n = noise(.08), bp = c.createBiquadFilter(), g3 = c.createGain();
    bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 1.2; env(g3, t, .001, .35, .06);
    n.connect(bp); bp.connect(g3); g3.connect(master); n.start(t);
  }
  function whoosh(dur = 1.6) {
    if (!on) return; const c = ctx(), t = c.currentTime;
    const n = noise(dur), f = c.createBiquadFilter(), g = c.createGain();
    f.type = "bandpass"; f.Q.value = .7; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(2600, t + dur * .6);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16, t + dur * .35); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    n.connect(f); f.connect(g); g.connect(master); n.start(t);
  }
  function chime() { [784, 988, 1175, 1568].forEach((f, i) => bell(f, .12, i * .11)); }
  function pop() { bell(1320, .06); }

  return {
    unlock: ctx, bell, tabla, whoosh, chime, pop,
    get on() { return on; }, set on(v) { on = v; }
  };
})();
