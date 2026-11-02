import React, { useState } from 'react';
import { calculateTomislavAura, AuraInput, AuraResult } from '../utils/tomislavRules';
import { Award, Sparkles, Flame, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const AuraCalculator: React.FC = () => {
  const [outfitScore, setOutfitScore] = useState<number>(10);
  const [drinkPreference, setDrinkPreference] = useState<'black_ram' | 'rakia' | 'energy_drink' | 'water'>('black_ram');
  const [fireplaceProximity, setFireplaceProximity] = useState<number>(9);
  const [attitude, setAttitude] = useState<'diplomat' | 'passport_face' | 'model' | 'philosopher'>('passport_face');
  const [result, setResult] = useState<AuraResult | null>(null);

  const handleCalculate = () => {
    playSound('fanfare');
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#eab308', '#f59e0b', '#ef4444'],
    });

    const aura = calculateTomislavAura({
      outfitScore,
      drinkPreference,
      fireplaceProximity,
      attitude,
    });
    setResult(aura);
  };

  const handleReset = () => {
    playSound('boing');
    setResult(null);
  };

  return (
    <section id="aura" className="py-16 px-4 bg-stone-950 text-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Официален Алгоритъм за Харизма</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
            ТОМИ АУРА КАЛКУЛАТОР
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Провери дали имаш потенциала да седнеш на масата на Томислав край камината, или аурата ти още е в подготвителна фаза.
          </p>
        </div>

        <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 1. Outfit Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                1. Избери официален дрес-код:
              </label>
              <div className="space-y-2">
                {[
                  { label: '👔 Бяла риза с тексаска боло-вратовръзка (+1000)', val: 10 },
                  { label: '🖤 Черен суичър за тежки размисли (+600)', val: 7 },
                  { label: '🧥 Кожено яке тип „Люлински баровец“ (+400)', val: 5 },
                  { label: '🩳 Домашни анцузи с капки от лютеница (0)', val: 1 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setOutfitScore(item.val);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      outfitScore === item.val
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                        : 'bg-stone-800/40 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Drink Preference */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                2. Какво сипваме в чашата?
              </label>
              <div className="space-y-2">
                {[
                  { id: 'black_ram', label: '🥃 Black Ram Уиски (Елитът на трапезата)' },
                  { id: 'rakia', label: '🍇 Двойно препечена гроздова от дядо' },
                  { id: 'energy_drink', label: '⚡ Енергийна напитка (за да издържиш до сутринта)' },
                  { id: 'water', label: '💧 Минерална вода (Томислав ще те погледне тъжно)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setDrinkPreference(item.id as typeof drinkPreference);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      drinkPreference === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                        : 'bg-stone-800/40 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Fireplace Proximity */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  3. Близост до камината:
                </label>
                <span className="text-xs font-mono text-orange-400 font-bold">
                  {fireplaceProximity === 10
                    ? 'Седиш директно в жарта (Легенда!)'
                    : `${fireplaceProximity * 10}% близост`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={fireplaceProximity}
                onChange={(e) => setFireplaceProximity(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>0 (Замръзваш на терасата)</span>
                <span>5 (Нормално)</span>
                <span>10 (Буквално си феникс)</span>
              </div>
            </div>

            {/* 4. Pose / Attitude */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                4. Избери лицева мимика:
              </label>
              <div className="space-y-2">
                {[
                  { id: 'passport_face', label: '🤐 Прибрани устни навътре в черепа (+12,000)' },
                  { id: 'diplomat', label: '🖕 Дипломатичен международен поздрав (+8,888)' },
                  { id: 'model', label: '😎 Поза „Схванат врат на фотомодел“ (+9,999)' },
                  { id: 'philosopher', label: '🤔 Поглед в пода тип „Кой съм аз?“ (+7,777)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setAttitude(item.id as typeof attitude);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      attitude === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                        : 'bg-stone-800/40 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-8 pt-6 border-t border-stone-800 text-center">
            <button
              onClick={handleCalculate}
              aria-label="Изчисли аурата"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-base sm:text-lg shadow-xl shadow-orange-500/30 transition-all cursor-pointer active:scale-95 inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>ИЗЧИСЛИ ТОМИ АУРАТА!</span>
            </button>
          </div>

          {/* Result Presentation */}
          {result && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-900 border-2 border-amber-400/60 text-center animate-fadeIn shadow-xl">
              <span className="text-xs uppercase font-extrabold text-orange-400 tracking-widest block mb-1">
                РЕЗУЛТАТ ОТ ЛАБОРАТОРИЯТА НА ТОМИСЛАВ
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-amber-300">
                {result.tier}
              </h3>

              <div className="my-3 inline-block px-4 py-1.5 rounded-full bg-stone-800/90 border border-amber-500/40 font-mono text-xl sm:text-2xl font-bold text-yellow-300">
                ⚡ {result.score.toLocaleString()} ТОМИ ТОЧКИ
              </div>

              <p className="text-base sm:text-lg text-stone-200 max-w-xl mx-auto my-2">
                {result.verdict}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <span>Официален бадж: {result.badge}</span>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors underline cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Пробвай с друга комбинация</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
