/**
 * Enhanced Web Audio API synthesizer for meme sound effects and party synth groove.
 * 100% self-contained with no external audio file dependencies.
 */

let audioCtx: AudioContext | null = null;
let partyInterval: number | null = null;
let isPartyPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(
  type:
    | 'fanfare'
    | 'airhorn'
    | 'boing'
    | 'pop'
    | 'respect'
    | 'diplomat'
    | 'quack'
    | 'levelUp'
    | 'laser'
    | 'wheelTick'
    | 'cash'
    | 'whistle'
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (type) {
    case 'laser': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
      break;
    }

    case 'wheelTick': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
      break;
    }

    case 'cash': {
      // Cash register 'ka-ching'
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.35);
      break;
    }

    case 'whistle': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.15);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }

    case 'pop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    }

    case 'boing': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.15);
      osc.frequency.linearRampToValueAtTime(220, now + 0.3);
      osc.frequency.linearRampToValueAtTime(500, now + 0.45);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
      break;
    }

    case 'airhorn': {
      const freqs = [310, 311, 465, 467];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.setValueAtTime(freq * 1.05, now + 0.08);
        osc.frequency.setValueAtTime(freq, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.setValueAtTime(0.15, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });
      break;
    }

    case 'fanfare': {
      const notes = [
        { f: 261.63, t: 0, d: 0.12 },
        { f: 329.63, t: 0.13, d: 0.12 },
        { f: 392.0, t: 0.26, d: 0.15 },
        { f: 523.25, t: 0.42, d: 0.4 },
      ];
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.3, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.01, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
      break;
    }

    case 'diplomat': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
      break;
    }

    case 'quack': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }

    case 'levelUp':
    case 'respect': {
      const arpeggio = [523.25, 659.25, 783.99, 1046.5];
      arpeggio.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
      break;
    }
  }
}

/**
 * Interactive Party Mode Synthesizer Groove
 * Generates a retro chalga / dance synth bass groove on beat!
 */
export function togglePartyMusic(enable?: boolean): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (typeof enable === 'boolean') {
    isPartyPlaying = !enable;
  }

  if (isPartyPlaying) {
    if (partyInterval) {
      window.clearInterval(partyInterval);
      partyInterval = null;
    }
    isPartyPlaying = false;
    return false;
  } else {
    isPartyPlaying = true;
    let step = 0;
    const bassNotes = [110, 110, 130.81, 146.83, 164.81, 146.83, 130.81, 98];

    partyInterval = window.setInterval(() => {
      const t = ctx.currentTime;
      // Kick drum on every beat
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kick.frequency.setValueAtTime(130, t);
      kick.frequency.exponentialRampToValueAtTime(30, t + 0.12);
      kickGain.gain.setValueAtTime(0.4, t);
      kickGain.gain.exponentialRampToValueAtTime(0.01, t + 0.13);
      kick.connect(kickGain);
      kickGain.connect(ctx.destination);
      kick.start(t);
      kick.stop(t + 0.13);

      // Bass synth note
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'sawtooth';
      const freq = bassNotes[step % bassNotes.length];
      bass.frequency.setValueAtTime(freq, t);
      bassGain.gain.setValueAtTime(0.15, t);
      bassGain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start(t);
      bass.stop(t + 0.18);

      // Hi-hat sound
      if (step % 2 === 1) {
        const hat = ctx.createOscillator();
        const hatGain = ctx.createGain();
        hat.type = 'square';
        hat.frequency.setValueAtTime(2400, t);
        hatGain.gain.setValueAtTime(0.08, t);
        hatGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        hat.connect(hatGain);
        hatGain.connect(ctx.destination);
        hat.start(t);
        hat.stop(t + 0.05);
      }

      step++;
    }, 220); // ~136 BPM energetic rhythm
    return true;
  }
}
