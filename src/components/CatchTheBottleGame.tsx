import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RotateCcw, Trophy, Sparkles, Volume2 } from 'lucide-react';
import { playSound } from '../utils/soundEffects';
import { evaluateMiniGameScore, MiniGameScoreResult } from '../utils/tomislavRules';
import confetti from 'canvas-confetti';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'black_ram' | 'twenty_bgn' | 'wood' | 'water';
  emoji: string;
  points: number;
}

export const CatchTheBottleGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [bottlesCount, setBottlesCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [result, setResult] = useState<MiniGameScoreResult | null>(null);

  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tomi_arcade_high');
      return saved ? parseInt(saved, 10) : 350;
    }
    return 350;
  });

  const playerPosRef = useRef<number>(200);
  const itemsRef = useRef<FallingItem[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Start game handler
  const startGame = () => {
    playSound('fanfare');
    setScore(0);
    setBottlesCount(0);
    setTimeLeft(30);
    itemsRef.current = [];
    playerPosRef.current = 200;
    setGameState('playing');
    setResult(null);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        playerPosRef.current = Math.max(30, playerPosRef.current - 25);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        playerPosRef.current = Math.min(370, playerPosRef.current + 25);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Touch / Mouse controls on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    playerPosRef.current = Math.max(35, Math.min(canvas.width - 35, x));
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Handle game over
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameover');
      const evalRes = evaluateMiniGameScore(score, bottlesCount);
      setResult(evalRes);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('tomi_arcade_high', score.toString());
      }
      playSound('fanfare');
      confetti({ particleCount: 60, spread: 80 });
    }
  }, [timeLeft, gameState, score, bottlesCount, highScore]);

  // Main canvas render loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nextItemId = 1;

    const gameLoop = (timestamp: number) => {
      // Spawn items
      if (timestamp - lastSpawnRef.current > 450) {
        lastSpawnRef.current = timestamp;
        const types: Array<{
          type: FallingItem['type'];
          emoji: string;
          points: number;
        }> = [
          { type: 'black_ram', emoji: '🥃', points: 100 },
          { type: 'twenty_bgn', emoji: '💸', points: 200 },
          { type: 'wood', emoji: '🪵', points: 50 },
          { type: 'water', emoji: '💧', points: -50 },
        ];
        const chosen = types[Math.floor(Math.random() * types.length)];
        const newItem: FallingItem = {
          id: nextItemId++,
          x: Math.random() * (canvas.width - 60) + 30,
          y: -20,
          speed: Math.random() * 2.5 + 2.5,
          type: chosen.type,
          emoji: chosen.emoji,
          points: chosen.points,
        };
        itemsRef.current.push(newItem);
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background warm brick / fireplace texture
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fire gradient at bottom
      const fireGrad = ctx.createLinearGradient(0, canvas.height - 40, 0, canvas.height);
      fireGrad.addColorStop(0, 'rgba(234, 88, 12, 0)');
      fireGrad.addColorStop(1, 'rgba(234, 88, 12, 0.4)');
      ctx.fillStyle = fireGrad;
      ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

      // Update & Draw Items
      const playerX = playerPosRef.current;
      const playerY = canvas.height - 45;
      const playerWidth = 70;

      itemsRef.current.forEach((item, index) => {
        item.y += item.speed;

        // Draw item emoji
        ctx.font = '26px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, item.x, item.y);

        // Check collision with player
        if (
          item.y >= playerY - 15 &&
          item.y <= playerY + 25 &&
          Math.abs(item.x - playerX) < playerWidth / 2 + 15
        ) {
          // Catch!
          if (item.type === 'black_ram') {
            playSound('pop');
            setBottlesCount((b) => b + 1);
          } else if (item.type === 'twenty_bgn') {
            playSound('cash');
          } else if (item.type === 'water') {
            playSound('quack');
          } else {
            playSound('respect');
          }

          setScore((s) => Math.max(0, s + item.points));
          itemsRef.current.splice(index, 1);
        } else if (item.y > canvas.height + 20) {
          // Missed item
          itemsRef.current.splice(index, 1);
        }
      });

      // Draw Player: Tomislav basket / avatar
      ctx.save();
      // Draw crate / hands
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(playerX - playerWidth / 2, playerY, playerWidth, 18, 6);
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Tomislav label / avatar
      ctx.font = 'bold 11px Montserrat, sans-serif';
      ctx.fillStyle = '#1c1917';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ТОМИСЛАВ', playerX, playerY + 9);

      // Draw avatar head above crate
      ctx.font = '24px sans-serif';
      ctx.fillText('😎', playerX, playerY - 14);
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState]);

  return (
    <section className="py-16 px-4 bg-stone-900 text-white relative border-t border-amber-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Официална Аркадна Игра</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-100">
          ХВАНИ BLACK RAM-А!
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Бутилки Black Ram, 20-левки и цепеници падат от небето! Движи Томислав наляво-надясно, за да събереш възможно най-много точки за 30 секунди. Пази се от минералната вода!
        </p>

        {/* HUD Bar */}
        <div className="max-w-md mx-auto my-6 grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase block">Точки</span>
            <span className="text-xl font-black text-amber-400 font-mono">{score}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase block">Оставащо време</span>
            <span className={`text-xl font-black font-mono ${timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-stone-200'}`}>
              {timeLeft} сек
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-500/30">
            <span className="text-[10px] text-stone-400 uppercase block">Рекорд</span>
            <span className="text-xl font-black text-yellow-300 font-mono">{highScore}</span>
          </div>
        </div>

        {/* Canvas Screen */}
        <div className="relative max-w-md mx-auto aspect-[4/3] rounded-3xl overflow-hidden border-4 border-amber-500/60 shadow-2xl bg-stone-950">
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            onPointerMove={handlePointerMove}
            className="w-full h-full cursor-ew-resize touch-none select-none"
          />

          {/* Start Screen Overlay */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
              <span className="text-5xl block mb-2">🥃</span>
              <h3 className="text-2xl font-black text-amber-300 mb-1">
                ГОТОВ ЛИ СИ ЗА ЕКШЪН?
              </h3>
              <p className="text-xs text-stone-300 max-w-xs mb-6">
                Движи мишката или пръста си наляво-надясно (или ползвай стрелките на клавиатурата).
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-base shadow-lg shadow-orange-500/30 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-stone-950" />
                <span>СТАРТИРАЙ ИГРАТА!</span>
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === 'gameover' && result && (
            <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <Trophy className="w-12 h-12 text-yellow-400 mb-1 animate-bounce" />
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                КРАЙ НА ИГРАТА
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {result.rank}
              </h3>
              <p className="text-amber-300 font-mono text-2xl font-extrabold my-1">
                {result.score} ТОЧКИ
              </p>
              <p className="text-xs text-stone-300 max-w-xs mb-4">
                {result.achievedTitle}
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Играй отново</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-stone-400 flex items-center justify-center gap-4">
          <span>🥃 Black Ram: +100</span>
          <span>💸 20 лева: +200</span>
          <span>🪵 Цепеници: +50</span>
          <span>💧 Вода: -50</span>
        </div>
      </div>
    </section>
  );
};
