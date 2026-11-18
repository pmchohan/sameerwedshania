// The door's sound, made on the spot with Web Audio: no audio files to download, nothing to license.
// Sounds only ever play after the guest's own tap, which is what browsers require anyway.
const STORAGE_KEY = 'invitation-sound-muted';

type AudioContextClass = typeof AudioContext;
const AudioContextCtor: AudioContextClass | undefined =
  typeof window === 'undefined' ? undefined : (window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextClass }).webkitAudioContext);

const readMuted = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

let muted = readMuted();
let context: AudioContext | undefined;
let master: GainNode | undefined;
let noiseBuffer: AudioBuffer | undefined;
const listeners = new Set<() => void>();

function audio(): { ctx: AudioContext; out: GainNode } | undefined {
  if (!AudioContextCtor) return undefined;
  if (!context || !master) {
    context = new AudioContextCtor();
    master = context.createGain();
    master.gain.value = 0.85;
    const limiter = context.createDynamicsCompressor();
    master.connect(limiter);
    limiter.connect(context.destination);
  }
  return { ctx: context, out: master };
}

function noiseSource(ctx: AudioContext): AudioBufferSourceNode {
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  return source;
}

/** A short burst of filtered noise: clicks, scrapes, thuds. */
function burst(ctx: AudioContext, out: AudioNode, at: number, duration: number, type: BiquadFilterType, frequency: number, q: number, peak: number) {
  const source = noiseSource(ctx);
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = frequency;
  filter.Q.value = q;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(at, Math.random() * 1.5, duration + 0.05);
}

/** A tone that glides from one pitch to another while it fades. */
function tone(ctx: AudioContext, out: AudioNode, at: number, type: OscillatorType, from: number, to: number, duration: number, peak: number) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + duration);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain);
  gain.connect(out);
  osc.start(at);
  osc.stop(at + duration + 0.05);
}

/** The bolt sliding back: two metal clicks and a clunk. */
function latch(ctx: AudioContext, out: AudioNode, at: number) {
  burst(ctx, out, at, 0.03, 'bandpass', 3200, 2, 0.55);
  tone(ctx, out, at, 'sine', 1100, 650, 0.05, 0.12);
  burst(ctx, out, at + 0.09, 0.03, 'bandpass', 2400, 2, 0.5);
  tone(ctx, out, at + 0.13, 'triangle', 230, 110, 0.14, 0.4);
}

/** The brass rings knocking against the wood. */
function rings(ctx: AudioContext, out: AudioNode, at: number) {
  for (const [offset, base] of [[0, 1450], [0.07, 1310]] as const) {
    tone(ctx, out, at + offset, 'sine', base, base * 0.995, 0.7, 0.1);
    tone(ctx, out, at + offset, 'sine', base * 1.59, base * 1.58, 0.45, 0.05);
    burst(ctx, out, at + offset, 0.04, 'highpass', 4000, 1, 0.12);
  }
}

/** Old hinges: a slow, wavering low note with a rasp of wood on wood. */
function creak(ctx: AudioContext, out: AudioNode, at: number, duration: number) {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(68, at);
  osc.frequency.linearRampToValueAtTime(98, at + duration * 0.5);
  osc.frequency.linearRampToValueAtTime(80, at + duration);
  const wobble = ctx.createOscillator();
  wobble.frequency.value = 6.5;
  const wobbleDepth = ctx.createGain();
  wobbleDepth.gain.value = 5;
  wobble.connect(wobbleDepth);
  wobbleDepth.connect(osc.frequency);
  const body = ctx.createBiquadFilter();
  body.type = 'bandpass';
  body.frequency.value = 420;
  body.Q.value = 5;
  const soften = ctx.createBiquadFilter();
  soften.type = 'lowpass';
  soften.frequency.value = 1100;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.linearRampToValueAtTime(0.26, at + 0.3);
  gain.gain.setValueAtTime(0.26, at + duration - 0.5);
  gain.gain.linearRampToValueAtTime(0.0001, at + duration);
  osc.connect(body);
  body.connect(soften);
  soften.connect(gain);
  gain.connect(out);
  osc.start(at);
  wobble.start(at);
  osc.stop(at + duration + 0.05);
  wobble.stop(at + duration + 0.05);

  const rasp = noiseSource(ctx);
  const rasper = ctx.createBiquadFilter();
  rasper.type = 'bandpass';
  rasper.frequency.value = 700;
  rasper.Q.value = 1;
  const raspGain = ctx.createGain();
  raspGain.gain.setValueAtTime(0.0001, at);
  raspGain.gain.linearRampToValueAtTime(0.05, at + 0.4);
  raspGain.gain.linearRampToValueAtTime(0.0001, at + duration);
  rasp.connect(rasper);
  rasper.connect(raspGain);
  raspGain.connect(out);
  rasp.start(at, 0, duration + 0.05);
}

/** The leaves meeting the wall: a low thud. */
function thud(ctx: AudioContext, out: AudioNode, at: number) {
  tone(ctx, out, at, 'sine', 64, 38, 0.4, 0.6);
  burst(ctx, out, at, 0.18, 'lowpass', 220, 0.7, 0.35);
}

/** A soft bell chord as the courtyard comes into view. */
function chime(ctx: AudioContext, out: AudioNode, at: number) {
  for (const [freq, peak, decay] of [[784, 0.12, 2.6], [1175, 0.08, 2.2], [1568, 0.06, 1.8], [2349, 0.03, 1.4]] as const) {
    tone(ctx, out, at, 'sine', freq, freq * 0.998, decay, peak);
  }
}

export const sound = {
  isMuted: () => muted,
  setMuted(next: boolean) {
    muted = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    } catch {
      // in-app browsers can block storage; the choice then lasts until the page closes
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  /** Plays a single crisp brass knocker ring sound. */
  playKnock() {
    if (muted) return;
    const engine = audio();
    if (!engine) return;
    const { ctx, out } = engine;
    void ctx.resume();
    rings(ctx, out, ctx.currentTime + 0.01);
  },
  /** Plays the whole opening, timed to the door animation. Call it from the guest's tap. */
  playOpening() {
    if (muted) return;
    const engine = audio();
    if (!engine) return;
    const { ctx, out } = engine;
    void ctx.resume();
    const start = ctx.currentTime + 0.02;
    latch(ctx, out, start);
    rings(ctx, out, start + 0.55);
    creak(ctx, out, start + 0.75, 2.1);
    thud(ctx, out, start + 2.9);
    chime(ctx, out, start + 3.05);
  },
};
