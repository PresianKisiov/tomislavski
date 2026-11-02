import React, { useState } from 'react';
import { evaluateTomislavQuiz } from '../utils/tomislavRules';
import { HelpCircle, Award, CheckCircle2, RotateCcw, Printer, Sparkles } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
}

export const FriendshipQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Пресиан');

  const questions: Question[] = [
    {
      id: 1,
      question: 'Какво прави Томислав, когато някой на масата каже: „Стига толкова, време е да си ходим“?',
      options: [
        'Налива още една чаша Black Ram и пали нова цепеница в камината (Правилният път)',
        'Обува си обувките и си тръгва кротко в 21:00 часа',
        'Започва да пие минерална вода и пита за зелен чай',
      ],
    },
    {
      id: 2,
      question: 'Кой е върховният параден тоалет на Томислав за официален прием?',
      options: [
        'Смокинг с папионка от Армани',
        'Бяла риза с надписи на английски и метална тексаска боло-вратовръзка',
        'Спортен клин за йога',
      ],
    },
    {
      id: 3,
      question: 'Какъв е дипломатическият протокол на Томислав при среща с хейтъри?',
      options: [
        'Еднозначен, изчистен среден пръст пред огъня със суров поглед',
        'Дълъг доклад от 40 страници с аргументи и графики',
        'Извинява се и си навежда главата',
      ],
    },
  ];

  const handleSelectOption = (optionIdx: number) => {
    playSound('pop');
    const newAnswers = [...selectedAnswers, optionIdx];
    setSelectedAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      playSound('fanfare');
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#eab308', '#f59e0b', '#10b981'],
      });
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    playSound('boing');
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
  };

  const result = quizFinished ? evaluateTomislavQuiz(selectedAnswers) : null;

  return (
    <section id="quiz" className="py-16 px-4 bg-stone-900 text-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Официален Тест за Лоялност</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
            ТЕСТ: КОЛКО ДОБРЕ ПОЗНАВАШ ТОМИСЛАВ?
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2">
            Отговори на 3-те контролни въпроса за да получиш Официален Диплом за Почетен Брат на Томислав!
          </p>
        </div>

        {!quizFinished ? (
          <div className="bg-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-stone-400 font-bold mb-4">
              <span>Въпрос {currentStep + 1} от {questions.length}</span>
              <span className="text-amber-400">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-stone-800 h-2 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-black text-amber-200 mb-6 leading-snug">
              {questions[currentStep].question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-400 hover:bg-stone-800/80 transition-all font-semibold text-sm sm:text-base text-stone-200 flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt}</span>
                  <span className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs text-stone-400 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 font-bold transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Certificate / Result */
          <div className="space-y-6">
            <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-4 border-amber-500/70 shadow-2xl text-center">
              {/* Decorative Certificate Frame */}
              <div className="border-2 border-dashed border-amber-400/40 p-6 rounded-2xl relative">
                <span className="text-4xl block mb-2">📜</span>
                <span className="text-xs font-black uppercase tracking-widest text-orange-400 block mb-1">
                  РЕПУБЛИКА ТОМИСЛАВИЯ • МИНИСТЕРСТВО НА ОГЪНЯ
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-black text-amber-300 uppercase tracking-tight">
                  ОФИЦИАЛЕН ДИПЛОМ
                </h3>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
                  Сертификат за Почетно Братство край Камината
                </p>

                <div className="my-6 max-w-lg mx-auto">
                  <p className="text-sm text-stone-300">
                    С настоящото удостоверение се потвърждава, че:
                  </p>
                  <div className="my-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-center font-bold text-2xl text-amber-300 bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 focus:outline-none px-4 py-1"
                      placeholder="Въведи твоето име..."
                    />
                  </div>
                  <p className="text-xs text-stone-400 italic">
                    (Кликни на името, за да го смениш)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 max-w-md mx-auto mb-6">
                  <div className="text-lg font-black text-amber-200">
                    Ранг: {result?.title} ({result?.percentage}%)
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {result?.comment}
                  </p>
                </div>

                {/* Badges & Stamps */}
                <div className="flex flex-wrap items-center justify-around gap-4 pt-4 border-t border-amber-500/30 text-left text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">
                      Подпис на Председателя:
                    </span>
                    <span className="font-serif italic text-base text-amber-300 font-bold">
                      Томислав I Великолепни ✍️
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex flex-col items-center justify-center text-[9px] font-bold text-amber-400 uppercase tracking-tighter text-center rotate-[-12deg] bg-amber-500/10">
                    <span>ПЕЧАТ</span>
                    <span>BLACK RAM</span>
                    <span>✓ ОДОБРЕНО</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">
                      Дата на валидност:
                    </span>
                    <span className="font-mono text-stone-200 font-bold">
                      ЗАВИНАГИ (БЕЗСРОЧНО)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>Принтирай / Запази Диплома</span>
              </button>
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Започни теста отначало</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
