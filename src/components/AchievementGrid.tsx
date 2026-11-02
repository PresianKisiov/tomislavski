import React, { useState } from 'react';
import { TOMISLAV_ACHIEVEMENTS, TomiAchievement, TOMISLAV_PHOTOS } from '../data/tomislavData';
import { Trophy, Sparkles, X, Volume2, Flame, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface AchievementGridProps {
  onUnlockBonus: () => void;
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({ onUnlockBonus }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<TomiAchievement | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [runawayOffset, setRunawayOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [runawayAttempts, setRunawayAttempts] = useState<number>(0);

  const handleAchievementClick = (ach: TomiAchievement) => {
    playSound(ach.sound);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#f97316', '#eab308', '#ec4899'],
    });

    if (!unlockedAchievements.includes(ach.id)) {
      setUnlockedAchievements((prev) => [...prev, ach.id]);
      onUnlockBonus();
    }
    setSelectedAchievement(ach);
  };

  const handleRunawayHover = () => {
    playSound('boing');
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 120;
    setRunawayOffset({ x: randomX, y: randomY });
    setRunawayAttempts((prev) => prev + 1);
  };

  return (
    <section id="achievements" className="py-16 px-4 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Залата на Славата на Томислав</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
            КОМИЧНИ ПОСТИЖЕНИЯ
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-3">
            Натисни всеки от бутоните по-долу, за да тестваш легендарните способности на Томислав, да чуеш автентичен звук и да отключиш секретното досие!
          </p>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-stone-400">
            <span>
              Отключени постижения:{' '}
              <strong className="text-amber-400">{unlockedAchievements.length}</strong> / {TOMISLAV_ACHIEVEMENTS.length}
            </span>
          </div>
        </div>

        {/* Special Runaway Mini Joke Widget */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-stone-800 to-amber-950/40 border border-red-500/30 text-center relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-red-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>СПЕЦИАЛНО ПРЕДИЗВИКАТЕЛСТВО</span>
              </div>
              <h3 className="text-lg font-bold text-stone-100 mt-1">
                Поискай си 20-те лева, които Томи взе назаем за цигари
              </h3>
              <p className="text-xs text-stone-300">
                {runawayAttempts === 0
                  ? 'Опитай се да цъкнеш бутона. Томислав обаче е по-бърз от звука!'
                  : `Опити за връщане на дълга: ${runawayAttempts}. Томислав се изплъзва с елегантна походка!`}
              </p>
            </div>

            <div className="relative h-14 w-64 flex items-center justify-center">
              <button
                onMouseEnter={handleRunawayHover}
                onClick={() => {
                  playSound('quack');
                  alert('НЕВЪЗМОЖНО! Томислав ти остави само празна кутия и една топла прегръдка!');
                }}
                style={{
                  transform: `translate(${runawayOffset.x}px, ${runawayOffset.y}px)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 font-black text-xs sm:text-sm shadow-lg text-white border border-red-400/50 cursor-pointer whitespace-nowrap active:scale-95"
              >
                💸 Върни 20-те лева!
              </button>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TOMISLAV_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`group relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-stone-800/90 to-stone-900/90 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-stone-800/40 hover:bg-stone-800/70 border-stone-700 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-stone-900 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {ach.icon}
                    </div>
                    {isUnlocked ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                        ОТКЛЮЧЕНО ✓
                      </span>
                    ) : (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-700/60 text-stone-400 font-semibold">
                        НОВО
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {ach.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-700/60">
                  <button
                    onClick={() => handleAchievementClick(ach)}
                    aria-label={`Активирай постижение ${ach.title}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>{ach.funnyEffect}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/60 p-6 sm:p-8 text-white shadow-2xl shadow-orange-500/20">
            <button
              onClick={() => setSelectedAchievement(null)}
              aria-label="Затвори детайли за постижението"
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">{selectedAchievement.icon}</span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Секретно Досие за Томислав
              </span>
              <h3 className="text-2xl font-black text-stone-100 mt-1">
                {selectedAchievement.dialogContent.heading}
              </h3>
            </div>

            {/* Accompanying Photo snippet */}
            <div className="my-4 rounded-2xl overflow-hidden border border-amber-500/40 relative aspect-video bg-black">
              <img
                src={TOMISLAV_PHOTOS[selectedAchievement.dialogContent.photoIndex].url}
                alt="Томислав в действие"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-300 font-bold">
                <span>{selectedAchievement.dialogContent.statName}</span>
                <span className="px-2 py-0.5 rounded bg-black/70 text-yellow-300 font-mono">
                  {selectedAchievement.dialogContent.statValue}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              {selectedAchievement.dialogContent.body}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs italic text-center">
              {selectedAchievement.dialogContent.quote}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  playSound(selectedAchievement.sound);
                  confetti({ particleCount: 30, spread: 50 });
                }}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Чуй отново звука</span>
              </button>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
