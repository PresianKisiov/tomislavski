import React, { useState } from 'react';
import { ShieldAlert, Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { generateEmergencyExcuse } from '../utils/tomislavRules';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const EmergencyExcuseModal: React.FC = () => {
  const [situation, setSituation] = useState<'late' | 'no_money' | 'missed_call' | 'party_excuse'>('late');
  const [copied, setCopied] = useState(false);

  const currentExcuse = generateEmergencyExcuse(situation);

  const handleCopy = () => {
    playSound('levelUp');
    navigator.clipboard?.writeText?.(currentExcuse);
    setCopied(true);
    confetti({ particleCount: 25, spread: 50 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 bg-stone-950 text-white relative border-t border-amber-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Спешна Помощ от Томислав</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
          СПЕШЕН ГЕНЕРАТОР НА ОПРАВДАНИЯ
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Шефът ти се кара? Приятелката ти звъни за 10-ти път? Избери ситуацията и прати официално алиби, заверено от Томислав!
        </p>

        <div className="mt-8 bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto text-left shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { id: 'late', label: '🚗 Закъснявам', desc: 'Бях задържан' },
              { id: 'no_money', label: '💸 Нямам пари', desc: 'Парите са илюзия' },
              { id: 'missed_call', label: '📵 Не вдигнах', desc: 'Гръмогласен смях' },
              { id: 'party_excuse', label: '🍾 Бях на купон', desc: 'Официален банкет' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  playSound('pop');
                  setSituation(btn.id as typeof situation);
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  situation === btn.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                    : 'bg-stone-800/40 border-stone-700/60 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">{btn.label}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{btn.desc}</div>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 relative">
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Готово за изпращане съобщение:
              </span>
              <span className="text-[10px] text-stone-500">100% Достоверно</span>
            </div>
            <p className="text-base sm:text-lg text-stone-100 font-serif italic leading-relaxed">
              {currentExcuse}
            </p>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleCopy}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-stone-950" />
                  <span>Копирано в клипборда!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-950" />
                  <span>Копирай за Viber / WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
