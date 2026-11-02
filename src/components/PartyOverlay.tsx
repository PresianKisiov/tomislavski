import React, { useState, useEffect } from 'react';
import { Flame, Music, Volume2, Sparkles, Zap, Glasses } from 'lucide-react';
import { togglePartyMusic, playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface PartyOverlayProps {
  isPartyActive: boolean;
  onToggleParty: () => void;
}

export const PartyOverlay: React.FC<PartyOverlayProps> = ({ isPartyActive, onToggleParty }) => {
  const [lasersActive, setLasersActive] = useState<boolean>(false);

  useEffect(() => {
    if (isPartyActive) {
      playSound('airhorn');
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.2 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'],
      });
    }
  }, [isPartyActive]);

  const handleToggleLasers = () => {
    playSound('laser');
    setLasersActive((prev) => !prev);
  };

  return (
    <>
      {/* Floating Turbo Party Button at Bottom-Right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {isPartyActive && (
          <button
            onClick={handleToggleLasers}
            className={`px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              lasersActive
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-900 border border-red-500/50 text-red-400 hover:bg-stone-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lasersActive ? '🔴 ЛАЗЕРИ: ВКЛЮЧЕНИ' : 'Включи лазери'}</span>
          </button>
        )}

        <button
          onClick={onToggleParty}
          aria-label="Превключи турбо парти режим"
          className={`px-4 sm:px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 transition-all cursor-pointer active:scale-95 ${
            isPartyActive
              ? 'bg-gradient-to-r from-red-600 via-pink-600 to-amber-500 text-white border-2 border-yellow-300 animate-bounce'
              : 'bg-stone-900/90 hover:bg-stone-850 text-amber-300 border-2 border-amber-500/50 hover:border-amber-400 backdrop-blur-md'
          }`}
        >
          <Flame className={`w-5 h-5 ${isPartyActive ? 'text-yellow-200 animate-spin' : 'text-orange-400'}`} />
          <span>{isPartyActive ? '🎉 ТУРБО РЕЖИМ: АКТИВЕН!' : '🔥 ПУСНИ ТУРБО ТОМИ РЕЖИМ'}</span>
          <Music className="w-4 h-4" />
        </button>
      </div>

      {/* Screen party lighting effect when active */}
      {isPartyActive && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Neon pulsating border lights */}
          <div className="absolute inset-0 border-8 border-amber-500/40 animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-amber-400 to-fuchsia-500 animate-pulse" />

          {/* Floating animated party emojis */}
          <div className="absolute top-1/4 left-10 text-4xl animate-bounce">🥃</div>
          <div className="absolute top-1/3 right-12 text-5xl animate-pulse">🔥</div>
          <div className="absolute bottom-1/4 left-20 text-4xl animate-bounce">👑</div>
          <div className="absolute bottom-1/3 right-24 text-4xl animate-pulse">💸</div>

          {/* Laser beam lines across screen if laser eyes active */}
          {lasersActive && (
            <>
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_#ef4444] opacity-80 animate-ping" />
              <div className="absolute top-2/3 left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_#ef4444] opacity-80 animate-ping" />
            </>
          )}
        </div>
      )}
    </>
  );
};
