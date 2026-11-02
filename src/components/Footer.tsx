import React from 'react';
import { Flame, Sparkles, Heart } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const handleEasterEgg = () => {
    playSound('airhorn');
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.8 },
      colors: ['#ea580c', '#f59e0b', '#ef4444', '#38bdf8'],
    });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-12 px-4 border-t border-amber-500/20 text-center">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          <span className="text-xl font-extrabold text-stone-100 tracking-wider">
            ТОМИСЛАВ ОФИЦИАЛЕН ПАРОДИЕН САЙТ
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
          Този сайт е създаден с единствена цел: чисто забавление, смях и почит към великия Томислав!
          Всички цитати, постижения и снимки са част от златното наследство на квартала.
        </p>

        <div className="pt-2">
          <button
            onClick={handleEasterEgg}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/30 text-amber-300 font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer hover:border-amber-400"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>🚨 Секретен Бутон: Включи Режим „Томи на Макс“</span>
          </button>
        </div>

        <div className="text-[11px] text-stone-500 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Томислав Култ Клуб. Всички права над Black Ram са запазени.</span>
          <span className="flex items-center gap-1">
            Направено с <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> и огън в камината
          </span>
        </div>
      </div>
    </footer>
  );
};
