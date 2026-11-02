import React, { useState, useEffect } from 'react';
import { Flame, AlertTriangle, Sparkles, X, Share2, Volume2 } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

const NEWS_ITEMS = [
  'ИЗВЪНРЕДНО: Заводите на Black Ram обявиха Томислав за почетен съсобственик след 72-часов банкет край камината!',
  'СЕНЗАЦИЯ: НАСА откри ново съзвездие на нощното небе с формата на боло-вратовръзката на Томислав!',
  'СКАНДАЛ: Гражданин се опита да си поиска 20 лева от Томислав — получи 4-часова лекция за духовното извисяване и безплатна цепеница!',
  'МЕТЕОРОЛОГИЧЕН ШОК: Температурата около камината на Томислав достигна 1200°C само от неговия суров поглед!',
  'МОДЕН СВЯТ В СТУПОР: Gucci и Balenciaga закриват ревютата си, признавайки превъзходството на бялата риза с надписи!',
  'НАУЧНО ОТКРИТИЕ: Българската академия на науките доказа, че прибирането на устни на Томислав отваря портал към друго измерение!',
  'ДИПЛОМАЦИЯ: ООН кани Томислав за главен преговарящ — дипломатическият му жест със среден пръст слага край на глобалните спорове!',
];

export const BreakingNewsTicker: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalHeadline, setModalHeadline] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % NEWS_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenNews = (headline: string) => {
    playSound('fanfare');
    confetti({ particleCount: 30, spread: 60 });
    setModalHeadline(headline);
  };

  const handleNextNews = () => {
    playSound('boing');
    setCurrentIdx((prev) => (prev + 1) % NEWS_ITEMS.length);
  };

  return (
    <>
      <div className="bg-red-950 border-b border-red-600/40 text-white py-1.5 px-3 flex items-center justify-between text-xs sm:text-sm overflow-hidden select-none">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 rounded bg-red-600 font-black tracking-widest text-[10px] uppercase animate-pulse flex items-center gap-1 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
            ИЗВЪНРЕДНО
          </span>
          <span className="hidden md:inline text-red-300 font-bold text-xs uppercase">
            ТВ ТОМИСЛАВ 24/7:
          </span>
        </div>

        {/* Scrolling text */}
        <div
          onClick={() => handleOpenNews(NEWS_ITEMS[currentIdx])}
          className="flex-1 mx-3 truncate cursor-pointer hover:text-amber-300 transition-colors font-medium text-stone-200"
          title="Кликни за детайли"
        >
          {NEWS_ITEMS[currentIdx]}
        </div>

        <button
          onClick={handleNextNews}
          aria-label="Следваща сензационна новина"
          className="flex-shrink-0 px-2 py-0.5 rounded bg-stone-900/80 hover:bg-stone-800 text-[11px] font-bold text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">Следващ скандал</span>
        </button>
      </div>

      {/* Breaking news modal */}
      {modalHeadline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border-2 border-red-500 p-6 text-white shadow-2xl shadow-red-500/20">
            <button
              onClick={() => setModalHeadline(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs uppercase tracking-widest inline-block mb-2">
                СЕНЗАЦИОНЕН БЮЛЕТИН
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 leading-tight">
                {modalHeadline}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs sm:text-sm text-stone-300 space-y-2">
              <p>
                <strong>Репортер от мястото на събитието:</strong> Очевидци твърдят, че атмосферата около Томислав е била нажежена до червено, а всяка капка Black Ram е била изпита с подобаващ тост.
              </p>
              <p className="text-stone-400 italic">
                „Няма да коментирам нищо без моята боло-вратовръзка и запалена камина!“ — заяви лаконично Томислав пред събралото се множество.
              </p>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(modalHeadline);
                  playSound('levelUp');
                  alert('Новината е копирана! Изпрати я на приятели във Viber/WhatsApp!');
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Сподели сензацията</span>
              </button>
              <button
                onClick={() => setModalHeadline(null)}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs"
              >
                Затвори
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
