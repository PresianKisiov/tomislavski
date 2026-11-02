import React, { useState } from 'react';
import { Sparkles, Trophy, RotateCw, Flame, Award, X } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Sector {
  label: string;
  icon: string;
  color: string;
  verdict: string;
}

const SECTORS: Sector[] = [
  {
    label: 'Бутилка Black Ram',
    icon: '🥃',
    color: '#d97706',
    verdict: 'ПЕЧЕЛИШ! Томислав лично ти сипва 100 мл високооктанов еликсир!',
  },
  {
    label: 'Връща ти 20-те лева',
    icon: '💸',
    color: '#dc2626',
    verdict: 'ХА-ХА, ИЗМАМА! Томислав казва: „Парите вече са изпити, но ти давам приятелство!“',
  },
  {
    label: 'Паспортна Физиономия',
    icon: '🤐',
    color: '#7c3aed',
    verdict: 'Томислав прибира устните си специално за теб пред огледалото!',
  },
  {
    label: 'Златна Наздравица',
    icon: '👑',
    color: '#ea580c',
    verdict: 'Всички около камината стават на крака и викат „НАЗДРАВЕ ЗА ТОМИСЛАВ!“',
  },
  {
    label: 'Дипломатичен Поздрав',
    icon: '🖕',
    color: '#b91c1c',
    verdict: 'Получаваш културен поздрав със среден пръст от разстояние!',
  },
  {
    label: 'Чувал с Цепеници',
    icon: '🪵',
    color: '#ca8a04',
    verdict: 'Печелиш 3 часа безплатно греене точно на 15 см от пламъка!',
  },
];

export const WheelOfFortune: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedPrize, setSelectedPrize] = useState<Sector | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    // Play initial sound
    playSound('wheelTick');

    // Interval ticking sound effect while spinning
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      playSound('wheelTick');
      tickCount++;
      if (tickCount > 18) clearInterval(tickInterval);
    }, 120);

    // Pick random sector
    const randomIndex = Math.floor(Math.random() * SECTORS.length);
    const sectorAngle = 360 / SECTORS.length;
    // Calculate final angle ensuring at least 5 full rotations (1800 deg)
    const extraSpins = 360 * 5;
    const targetAngle = extraSpins + (360 - randomIndex * sectorAngle - sectorAngle / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setSelectedPrize(SECTORS[randomIndex]);

      if (randomIndex === 1) {
        // Runaway / fake debt
        playSound('boing');
      } else {
        playSound('fanfare');
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ef4444', '#eab308'],
        });
      }
    }, 3200);
  };

  return (
    <section className="py-16 px-4 bg-stone-950 text-white relative overflow-hidden border-t border-amber-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Казино „Край Камината“</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
          КОЛЕЛОТО НА КЪСМЕТА НА ТОМИСЛАВ
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Завърти официалното колело на съдбата! Можеш ли да спечелиш Black Ram или ще получиш само културен дипломатичен поздрав?
        </p>

        {/* Wheel Container */}
        <div className="relative my-10 flex flex-col items-center justify-center">
          {/* Wheel pointer at top */}
          <div className="z-20 -mb-4 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(245,158,11,0.8)] animate-bounce" />
          </div>

          {/* The Spinning Wheel */}
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full p-3 bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
            <div
              className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)'
                  : 'none',
              }}
            >
              {/* SVG Wheel Render */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {SECTORS.map((sector, i) => {
                  const angle = 360 / SECTORS.length;
                  const startAngle = i * angle;
                  const endAngle = (i + 1) * angle;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);

                  const textAngle = startAngle + angle / 2;
                  const textRad = ((textAngle - 90) * Math.PI) / 180;
                  const tx = 50 + 32 * Math.cos(textRad);
                  const ty = 50 + 32 * Math.sin(textRad);

                  return (
                    <g key={i}>
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                        fill={sector.color}
                        stroke="#1c1917"
                        strokeWidth="0.8"
                      />
                      <text
                        x={tx}
                        y={ty}
                        fill="#ffffff"
                        fontSize="7"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                      >
                        {sector.icon}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Hub Button */}
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              aria-label="Завърти колелото"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-stone-950 border-4 border-amber-400 text-amber-300 font-black text-xs uppercase flex flex-col items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-80"
            >
              <RotateCw className={`w-5 h-5 mb-1 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'ВЪРТИ' : 'ВЪРТИ!'}</span>
            </button>
          </div>

          {/* Spin CTA Button */}
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-base shadow-xl shadow-orange-500/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSpinning ? 'Колелото определя съдбата ти...' : '🎲 ЗАВЪРТИ ЗА НАГРАДА!'}
          </button>
        </div>

        {/* Prize Modal */}
        {selectedPrize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md rounded-3xl bg-stone-900 border-2 border-amber-400 p-6 text-center text-white shadow-2xl shadow-orange-500/20">
              <button
                onClick={() => setSelectedPrize(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-5xl block mb-2">{selectedPrize.icon}</span>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">
                РЕЗУЛТАТ ОТ КОЛЕЛЕТО НА ТОМИСЛАВ
              </span>
              <h3 className="text-2xl font-black text-amber-300 mt-1 mb-3">
                {selectedPrize.label}
              </h3>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed bg-stone-950 p-4 rounded-2xl border border-stone-800">
                {selectedPrize.verdict}
              </p>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPrize(null);
                    spinWheel();
                  }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all"
                >
                  Завърти отново
                </button>
                <button
                  onClick={() => setSelectedPrize(null)}
                  className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs"
                >
                  Затвори
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
