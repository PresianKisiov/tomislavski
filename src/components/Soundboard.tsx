import React, { useState } from 'react';
import { Volume2, Music, Sparkles } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface SoundItem {
  id: string;
  name: string;
  desc: string;
  soundType: 'fanfare' | 'airhorn' | 'boing' | 'pop' | 'respect' | 'diplomat' | 'quack' | 'levelUp';
  icon: string;
}

export const Soundboard: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [comboCount, setComboCount] = useState<number>(0);

  const soundItems: SoundItem[] = [
    {
      id: 'sound_pop',
      name: 'Отваряне на Black Ram',
      desc: 'Свещеният звук на корка и започването на купона',
      soundType: 'pop',
      icon: '🍾',
    },
    {
      id: 'sound_airhorn',
      name: 'Квартален Airhorn',
      desc: 'Когато Томислав влезе в стаята и огънят се разгори',
      soundType: 'airhorn',
      icon: '📢',
    },
    {
      id: 'sound_diplomat',
      name: 'Дипломатически Бас Тъд',
      desc: 'Дълбокият бас при вдигането на средния пръст',
      soundType: 'diplomat',
      icon: '🖕',
    },
    {
      id: 'sound_fanfare',
      name: 'Царска Фанфара',
      desc: 'За официални срещи с боло-вратовръзката',
      soundType: 'fanfare',
      icon: '🎺',
    },
    {
      id: 'sound_quack',
      name: 'Звук „Прибрани Устни“',
      desc: 'Когато физиономията говори повече от хиляда думи',
      soundType: 'quack',
      icon: '🤐',
    },
    {
      id: 'sound_boing',
      name: 'Бягство от Връщане на 20 лв',
      desc: 'Пружинният скок на Томи към свободата',
      soundType: 'boing',
      icon: '🏃',
    },
    {
      id: 'sound_respect',
      name: 'Максимален Респект',
      desc: '8-битова магия за почетни братя',
      soundType: 'respect',
      icon: '👑',
    },
    {
      id: 'sound_levelUp',
      name: 'Левел Нагоре край Огъня',
      desc: 'Преминаване към следващото ниво на мъдрост',
      soundType: 'levelUp',
      icon: '🔥',
    },
  ];

  const handleTriggerSound = (item: SoundItem) => {
    playSound(item.soundType);
    setActiveSoundId(item.id);
    setComboCount((prev) => prev + 1);

    if (comboCount > 0 && comboCount % 5 === 0) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6'],
      });
    }

    setTimeout(() => {
      setActiveSoundId(null);
    }, 400);
  };

  return (
    <section id="soundboard" className="py-16 px-4 bg-stone-950 text-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>Интерактивна Акустика на Томислав</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
            СВЕЩЕНИЯТ САУНДБОРД
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Кликни върху плочките за да възпроизведеш звуците от вселената на Томислав!
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/30 text-xs text-amber-300 font-mono">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Комбо натискания: {comboCount}</span>
          </div>
        </div>

        {/* Soundboard grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {soundItems.map((item) => {
            const isActive = activeSoundId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTriggerSound(item)}
                aria-label={`Пусни звук ${item.name}`}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-500 border-amber-300 text-stone-950 scale-105 shadow-xl shadow-orange-500/40'
                    : 'bg-stone-900/90 border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/90 text-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{item.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        isActive
                          ? 'bg-black/80 text-yellow-300'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {isActive ? 'Свири!' : 'Пусни'}
                    </span>
                  </div>
                  <h3
                    className={`font-black text-sm sm:text-base leading-tight ${
                      isActive ? 'text-stone-950' : 'text-stone-100'
                    }`}
                  >
                    {item.name}
                  </h3>
                </div>

                <p
                  className={`text-[11px] mt-2 line-clamp-2 ${
                    isActive ? 'text-stone-900 font-medium' : 'text-stone-400'
                  }`}
                >
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
