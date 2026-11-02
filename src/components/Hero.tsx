import React, { useState } from 'react';
import { TOMISLAV_PHOTOS, TOMISLAV_QUOTES } from '../data/tomislavData';
import { Flame, Sparkles, Volume2, Award, ChevronRight, Share2, Check } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface HeroProps {
  onSelectPhotoModal: (photoIndex: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPhotoModal }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const activePhoto = TOMISLAV_PHOTOS[activePhotoIdx];

  const handleNextQuote = () => {
    playSound('boing');
    setQuoteIdx((prev) => (prev + 1) % TOMISLAV_QUOTES.length);
  };

  const handleCopyQuote = () => {
    playSound('levelUp');
    navigator.clipboard?.writeText?.(TOMISLAV_QUOTES[quoteIdx]);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const handleFireBlast = () => {
    playSound('fanfare');
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#dc2626', '#fef08a'],
    });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white">
      {/* Ambient background glow mimicking fireplace embers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/15 via-orange-500/15 to-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top comedic banner */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase animate-pulse">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Официален Пародиен Фен Клуб • Black Ram Лимитирана Серия</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Callouts */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-orange-400 font-extrabold tracking-widest text-xs uppercase">
                Легендата от Огнището
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-none uppercase">
                ТОМИСЛАВ <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  ВЕЛИКОЛЕПНИ
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-stone-300 font-medium max-w-2xl pt-2">
                Международен посланик на Black Ram, майстор на топлата камина, висш квартален дипломат и абсолютен световен шампион по прибиране на устни.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="bg-stone-900/80 border border-amber-500/20 rounded-xl p-3 text-center">
                <span className="text-2xl block">🥃</span>
                <span className="text-xs text-stone-400 block mt-1">Любимо питие</span>
                <span className="font-bold text-amber-300 text-sm">Black Ram</span>
              </div>
              <div className="bg-stone-900/80 border border-amber-500/20 rounded-xl p-3 text-center">
                <span className="text-2xl block">🔥</span>
                <span className="text-xs text-stone-400 block mt-1">Огън в душата</span>
                <span className="font-bold text-orange-400 text-sm">1200°C</span>
              </div>
              <div className="bg-stone-900/80 border border-amber-500/20 rounded-xl p-3 text-center">
                <span className="text-2xl block">⚡</span>
                <span className="text-xs text-stone-400 block mt-1">Аура рейтинг</span>
                <span className="font-bold text-yellow-300 text-sm">+99,999</span>
              </div>
              <div className="bg-stone-900/80 border border-amber-500/20 rounded-xl p-3 text-center">
                <span className="text-2xl block">👔</span>
                <span className="text-xs text-stone-400 block mt-1">Дрес код</span>
                <span className="font-bold text-stone-200 text-sm">Боло Шик</span>
              </div>
            </div>

            {/* Dynamic Quote Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-stone-900/70 to-stone-900/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 relative shadow-inner">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Златна Мисъл на Томислав #{quoteIdx + 1}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyQuote}
                    aria-label="Копирай цитат"
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                  >
                    {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copiedQuote ? 'Копиран!' : 'Копирай'}</span>
                  </button>
                  <button
                    onClick={handleNextQuote}
                    aria-label="Следваща мъдрост на Томислав"
                    className="p-1.5 px-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-colors text-xs flex items-center gap-1"
                  >
                    <span>Друга мъдрост</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-stone-100 italic text-base sm:text-lg font-serif">
                {TOMISLAV_QUOTES[quoteIdx]}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#achievements"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-extrabold text-base shadow-xl shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                🏆 Разгледай Смешните Постижения
              </a>
              <button
                onClick={handleFireBlast}
                aria-label="Разпали фойерверки за Томи"
                className="px-5 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 border border-amber-500/40 text-amber-300 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer hover:border-amber-400"
              >
                <Flame className="w-5 h-5 text-orange-400" />
                <span>Огнено Наздраве!</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Photo & Mood Selector */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The Active Portrait Container */}
            <div className="relative group w-full max-w-sm sm:max-w-md">
              {/* Outer decorative golden border frame */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-700 shadow-2xl shadow-orange-500/25">
                <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-[3/4] border-2 border-amber-300/40">
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                  {/* Top category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
                      #{activePhoto.category}
                    </span>
                  </div>

                  {/* Bottom photo info */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-stone-900/90 backdrop-blur-md border border-amber-500/30">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-stone-100 text-sm sm:text-base line-clamp-1">
                        {activePhoto.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold whitespace-nowrap">
                        +{activePhoto.auraBonus} Аура
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 italic mt-1 line-clamp-2">
                      {activePhoto.tagline}
                    </p>
                    <button
                      onClick={() => onSelectPhotoModal(activePhotoIdx)}
                      aria-label="Отвори детайли за снимката"
                      className="mt-2 w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Виж шедьовъра на цял екран</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood / Pose quick switcher carousel */}
            <div className="w-full max-w-sm sm:max-w-md mt-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Избери настроение на Томислав:
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {activePhotoIdx + 1} / {TOMISLAV_PHOTOS.length}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {TOMISLAV_PHOTOS.slice(0, 4).map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      playSound('pop');
                      setActivePhotoIdx(i);
                    }}
                    aria-label={`Избери поза ${photo.title}`}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all p-0.5 ${
                      activePhotoIdx === i
                        ? 'border-amber-400 ring-2 ring-orange-500/50 scale-105'
                        : 'border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {TOMISLAV_PHOTOS.slice(4, 8).map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => {
                      playSound('pop');
                      setActivePhotoIdx(i + 4);
                    }}
                    aria-label={`Избери поза ${photo.title}`}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all p-0.5 ${
                      activePhotoIdx === i + 4
                        ? 'border-amber-400 ring-2 ring-orange-500/50 scale-105'
                        : 'border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
