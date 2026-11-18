// The door's sound: synthesized acoustic wood/brass resonant knock with Web Audio,
// and ambient background wedding music playback with seamless mute/unmute control.
// Audio is always ON by default on page load. Muted state is in-memory only
// and never persisted across reloads, so reloads always start fresh with sound active.
const STORAGE_KEY = 'invitation-sound-muted';
try {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
} catch {
  // ignore in-app browser restrictions
}

let muted = false;
let context: AudioContext | undefined;
let master: GainNode | undefined;
let noiseBuffer: AudioBuffer | undefined;
let musicAudio: HTMLAudioElement | undefined;
let musicStarted = false;
const listeners = new Set<() => void>();

type AudioContextClass = typeof AudioContext;
const AudioContextCtor: AudioContextClass | undefined =
  typeof window === 'undefined'
    ? undefined
    : (window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioContextClass }).webkitAudioContext);

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

/** A tone that glides from one pitch to another while it fades. */
function tone(
  ctx: AudioContext,
  out: AudioNode,
  at: number,
  type: OscillatorType,
  from: number,
  to: number,
  duration: number,
  peak: number,
) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + duration * 0.6);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(peak, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain);
  gain.connect(out);
  osc.start(at);
  osc.stop(at + duration + 0.05);
}

/** A short burst of filtered noise: clicks, scrapes, thuds. */
function burst(
  ctx: AudioContext,
  out: AudioNode,
  at: number,
  duration: number,
  type: BiquadFilterType,
  frequency: number,
  q: number,
  peak: number,
) {
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

/** Rich acoustic wood and brass knock (low wooden thud + metallic resonance). */
function playAcousticKnock(ctx: AudioContext, out: AudioNode, at: number) {
  tone(ctx, out, at, 'sine', 170, 52, 0.26, 0.95);
  tone(ctx, out, at, 'triangle', 310, 120, 0.12, 0.35);

  try {
    const len = Math.floor(0.05 * ctx.sampleRate);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (2 * Math.random() - 1) * (1 - i / len);
    }
    const noise = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    noise.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.value = 1100;
    filter.Q.value = 0.8;
    gain.gain.value = 0.55;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(out);
    noise.start(at);
  } catch {
    // optional audio fallback
  }

  tone(ctx, out, at + 0.012, 'sine', 2600, 2500, 0.2, 0.07);
  tone(ctx, out, at + 0.012, 'sine', 3900, 3800, 0.14, 0.04);
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
}

/** The leaves meeting the wall: a low thud. */
function thud(ctx: AudioContext, out: AudioNode, at: number) {
  tone(ctx, out, at, 'sine', 64, 38, 0.4, 0.6);
  burst(ctx, out, at, 0.18, 'lowpass', 220, 0.7, 0.35);
}

/** A soft bell chime chord as the courtyard comes into view. */
function chime(ctx: AudioContext, out: AudioNode, at: number) {
  for (const [freq, peak, decay] of [[784, 0.12, 2.6], [1175, 0.08, 2.2], [1568, 0.06, 1.8], [2349, 0.03, 1.4]] as const) {
    tone(ctx, out, at, 'sine', freq, freq * 0.998, decay, peak);
  }
}

function getMusicAudio(): HTMLAudioElement | undefined {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return undefined;
  if (!musicAudio) {
    const base = import.meta.env.BASE_URL ?? '/';
    const src = `${base}assets/audio/wedding-music.mp3`;
    musicAudio = new Audio(src);
    musicAudio.loop = true;
    musicAudio.preload = 'auto';
    musicAudio.volume = muted ? 0 : 0.45;
  }
  return musicAudio;
}

export const sound = {
  isMuted: () => muted,
  setMuted(next: boolean) {
    muted = next;
    if (musicAudio) {
      if (next) {
        musicAudio.pause();
      } else {
        musicAudio.volume = 0.45;
        if (musicStarted) {
          musicAudio.play().catch(() => {});
        }
      }
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  /** Starts ambient background wedding music with a gentle fade-in over 3.5 - 4 seconds. */
  startMusic(fadeDurationMs = 4000) {
    if (muted) return;
    const audio = getMusicAudio();
    if (!audio) return;

    if (!musicStarted) {
      musicStarted = true;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            const targetVol = 0.6;
            const startTime = performance.now();
            function fadeIn() {
              if (!musicAudio || muted) return;
              const elapsed = performance.now() - startTime;
              const progress = Math.min(1, elapsed / fadeDurationMs);
              // Ease-out curve for smooth rising volume
              const eased = 1 - Math.pow(1 - progress, 2);
              musicAudio.volume = Math.max(0, Math.min(1, eased * targetVol));
              if (progress < 1) {
                requestAnimationFrame(fadeIn);
              }
            }
            requestAnimationFrame(fadeIn);
          })
          .catch(() => {});
      }
    } else if (audio.paused) {
      audio.play().catch(() => {});
    }
  },
  /** Plays an acoustic wooden/brass knocker sound. Does not start music until opening. */
  playKnock() {
    if (muted) return;
    const engine = audio();
    if (!engine) return;
    const { ctx, out } = engine;
    void ctx.resume();
    playAcousticKnock(ctx, out, ctx.currentTime + 0.01);
  },
  /** Plays the grand opening sequence and starts the ambient wedding music fading in. */
  playOpening() {
    sound.startMusic(4000);
    if (muted) return;
    const engine = audio();
    if (!engine) return;
    const { ctx, out } = engine;
    void ctx.resume();
    const start = ctx.currentTime + 0.02;
    rings(ctx, out, start + 0.1);
    chime(ctx, out, start + 1.2);
  },
};
