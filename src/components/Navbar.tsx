import React from 'react';
import { Flame, Sparkles, Trophy, Award, Music, HelpCircle, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/soundEffects';

interface NavbarProps {
  respectCount: number;
  onAddRespect: () => void;
  respectTitle: string;
}

export const Navbar: React.FC<NavbarProps> = ({ respectCount, onAddRespect, respectTitle }) => {
  const handleRespectClick = () => {
    playSound('respect');
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.1, x: 0.85 },
      colors: ['#f59e0b', '#ef4444', '#eab308'],
    });
    onAddRespect();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/85 border-b border-amber-500/20 px-4 py-3 text-white transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
        {/* Logo and title */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 p-[2px] shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                ТОМИСЛАВ
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold tracking-wide">
                VIP ЕЛИТ
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Официалният пародиен култ край камината
            </p>
          </div>
        </a>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-stone-300">
          <a
            href="#achievements"
            className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Постижения</span>
          </a>
          <a
            href="#gallery"
            className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Галерия & Мемета</span>
          </a>
          <a
            href="#aura"
            className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Аура Тест</span>
          </a>
          <a
            href="#soundboard"
            className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <Music className="w-4 h-4 text-red-400" />
            <span>Саундборд</span>
          </a>
          <a
            href="#quiz"
            className="px-3 py-1.5 rounded-lg hover:text-amber-400 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Тест за Брат</span>
          </a>
        </div>

        {/* Respect Counter Button */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex flex-col text-right text-xs">
            <span className="text-stone-400">Твоят ранг:</span>
            <span className="text-amber-300 font-bold tracking-tight">{respectTitle}</span>
          </div>
          <button
            onClick={handleRespectClick}
            aria-label="Дай респект за Томислав"
            className="relative px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-600/30 flex items-center gap-2 border border-amber-400/40 cursor-pointer transition-all"
          >
            <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
            <span>Респект за Томи</span>
            <span className="px-1.5 py-0.5 rounded-md bg-stone-900/60 text-yellow-300 font-mono text-xs">
              {respectCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
