import React, { useState, useEffect, useRef } from 'react';
import { Crosshair, Radar, AlertTriangle, Search, Radio, Compass, ShieldQuestion } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const SEARCH_RESULTS = [
  'Объект не найден. Возможно, снова занят.',
  'Сигнал обнаружен. Источник сигнала отказывается отвечать.',
  'Геопозиция недоступна. Друзья подозревают очередное исчезновение.',
  'Объект, вероятно, занят партией в «Дурака».',
  'Поиски продолжаются. Терпение друзей заканчивается.',
  'Радиоперехват: «Брат, я щас выйду». Прошло 3 часа.',
  'Спутник зафиксировал перемещение дивана в сторону сна.'
];

export const HeroRadar: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [searchReport, setSearchReport] = useState<string | null>(null);
  const [searchCount, setSearchCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const blips = [
      { x: 0.35, y: 0.4, label: 'ЖК Заман (?)', color: '#ef4444', pulse: 0 },
      { x: 0.65, y: 0.3, label: 'Секретный Бар', color: '#f59e0b', pulse: 0.5 },
      { x: 0.52, y: 0.68, label: 'Диван (база)', color: '#10b981', pulse: 0.8 },
      { x: 0.22, y: 0.72, label: 'Турнир "Дурак"', color: '#38bdf8', pulse: 0.3 },
      { x: 0.75, y: 0.75, label: 'Неизвестный сектор', color: '#dc2626', pulse: 0.9 },
    ];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 16;

      ctx.clearRect(0, 0, width, height);

      // Radar dark background
      ctx.fillStyle = '#050c08';
      ctx.fillRect(0, 0, width, height);

      // Tactical grid
      ctx.strokeStyle = '#064e3b33';
      ctx.lineWidth = 1;

      // Concentric circles
      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();

      // Degrees ticks
      ctx.fillStyle = '#059669';
      ctx.font = '9px JetBrains Mono';
      ctx.fillText('0° N', centerX - 12, centerY - radius + 12);
      ctx.fillText('90° E', centerX + radius - 36, centerY + 3);
      ctx.fillText('180° S', centerX - 16, centerY + radius - 6);
      ctx.fillText('270° W', centerX - radius + 6, centerY + 3);

      // Rotating sweep cone
      const sweepGradient = ctx.createConicGradient(angle, centerX, centerY);
      sweepGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      sweepGradient.addColorStop(0.12, 'rgba(16, 185, 129, 0.05)');
      sweepGradient.addColorStop(0.13, 'rgba(16, 185, 129, 0)');
      sweepGradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Sweep leading line
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      // Render blips
      blips.forEach((blip) => {
        const bx = width * blip.x;
        const by = height * blip.y;
        const dist = Math.hypot(bx - centerX, by - centerY);
        if (dist <= radius) {
          ctx.beginPath();
          ctx.arc(bx, by, 4, 0, Math.PI * 2);
          ctx.fillStyle = blip.color;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(bx, by, 7 + Math.sin(Date.now() * 0.005 + blip.pulse * 5) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = blip.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#cbd5e1';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(blip.label, bx + 8, by - 4);
        }
      });

      angle += 0.025;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleStartSearch = () => {
    if (isScanning) return;
    sounds.playRadarPing();
    setIsScanning(true);
    setScanProgress(0);
    setSearchReport(null);

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      setScanProgress(current);
      if (current % 20 === 0) {
        sounds.playBlip(700 + current * 4, 0.05);
      }
      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        const result = SEARCH_RESULTS[Math.floor(Math.random() * SEARCH_RESULTS.length)];
        setSearchReport(result);
        setSearchCount((prev) => prev + 1);
        sounds.playError();
      }
    }, 50);
  };

  return (
    <section id="radar" className="relative py-12 md:py-20 px-4 md:px-8 border-b border-red-950/40 bg-radial from-red-950/20 via-black to-black overflow-hidden">
      {/* Background scanlines */}
      <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Dossier Hero Headline & Search Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-red-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-red-400 font-bold">
                <Radio className="w-4 h-4 animate-pulse text-red-500" />
                СИСТЕМА СЛЕЖЕНИЯ: АКТИВНА
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">СЕКТОР: СНГ / СНГ-007</span>
              <span className="text-zinc-600">/</span>
              <span className="text-amber-500">ПРИОРИТЕТ: ВЫСШИЙ</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase font-heading leading-none">
                KAIRAT — ПОСЛЕДНИЙ СИГНАЛ <span className="text-red-500 text-shadow-red">НЕ УСТАНОВЛЕН</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-mono border-l-2 border-red-600 pl-4 py-1">
                «Он был в сети. Он видел сообщение. Он отклонил звонок. Его местоположение неизвестно».
              </p>
            </div>

            <p className="text-sm text-slate-400 max-w-xl">
              Секретное подразделение друзей ведёт круглосуточный мониторинг радиочастот.
              Объект обладает аномальной способностью растворяться во времени именно тогда,
              когда все уже забронировали столик или вышли на улицу.
            </p>

            {/* Action Bar */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleStartSearch}
                  disabled={isScanning}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-60 text-white font-mono text-sm tracking-wider font-bold rounded transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-3 cursor-pointer"
                >
                  {isScanning ? (
                    <>
                      <Radar className="w-5 h-5 animate-spin text-white" />
                      <span>СКАНИРОВАНИЕ ЧАСТОТ...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>НАЧАТЬ ОПЕРАЦИЮ ПОИСКА КАЙРАТА</span>
                    </>
                  )}
                </button>

                <div className="text-xs font-mono text-zinc-400">
                  Попыток поиска: <span className="text-amber-400 font-bold tabular-nums">{searchCount}</span>
                </div>
              </div>

              {/* Progress bar when scanning */}
              {isScanning && (
                <div className="space-y-1.5 max-w-md">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>ПЕРЕХВАТ СИГНАЛА СЕТИ...</span>
                    <span className="text-red-400 tabular-nums">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 border border-zinc-800 h-2 rounded overflow-hidden">
                    <div
                      className="bg-red-600 h-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Search result report card */}
              {searchReport && (
                <div className="p-4 rounded border border-red-800/80 bg-red-950/40 text-red-200 text-sm font-mono flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs text-red-400 tracking-wider font-bold">ОТЧЁТ РАЗВЕДКИ:</div>
                    <div className="text-sm font-semibold">{searchReport}</div>
                  </div>
                </div>
              )}

              <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-zinc-600" />
                <span>Последний раз на связи — когда ему самому что-то понадобилось.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Decorative Radar Map & Coordinates */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-2 rounded-xl bg-zinc-950/90 border border-emerald-950 shadow-[0_0_30px_rgba(5,150,105,0.15)]">
              {/* Radar status header */}
              <div className="flex items-center justify-between text-xs font-mono px-3 py-1.5 bg-black/60 border-b border-emerald-900/40 text-emerald-500 mb-2">
                <span className="flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  GEO-SAT RADAR // SIMULATION
                </span>
                <span className="text-zinc-500">43.2389° N, 76.8897° E</span>
              </div>

              {/* Radar Canvas */}
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="rounded-lg w-full max-w-[340px] sm:max-w-[360px] aspect-square block"
              />

              {/* Radar legends */}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-emerald-950/60 text-[11px] font-mono text-zinc-400 px-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>ЖК Заман: 99% загадки</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Диван: Режим «Сплю»</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span>Дурак: «Не звоните»</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Бармен: Секретно</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-zinc-600 mt-3 text-center max-w-xs">
              * Карта носит исключительно декоративный игровой характер и не отображает реальное местоположение.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
