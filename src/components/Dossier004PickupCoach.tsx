import React, { useState } from 'react';
import { Sparkles, AlertOctagon, RotateCcw, Award, Lightbulb } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Dossier004PickupCoach: React.FC = () => {
  const [stage, setStage] = useState<'idle' | 'charging' | 'frozen' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const startPickupMode = () => {
    sounds.playBlip(500, 0.1);
    setStage('charging');
    setProgress(0);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 3;
      if (curr >= 99) {
        curr = 99;
        setProgress(99);
        clearInterval(interval);
        setStage('frozen');

        // Freeze for 1.2s at 99%, then crash
        setTimeout(() => {
          sounds.playError();
          setStage('error');
        }, 1200);
      } else {
        setProgress(curr);
        if (curr % 15 === 0) {
          sounds.playBlip(450 + curr * 5, 0.04);
        }
      }
    }, 45);
  };

  const handleReset = () => {
    sounds.playBlip(400, 0.05);
    setStage('idle');
    setProgress(0);
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-purple-400 font-bold tracking-wider">ДОСЬЕ №004 // АКАДЕМИЯ ПИКАПА БЕЗ ПРАКТИКИ</span>
          <span className="text-zinc-500">СТАТУС: ТЕОРЕТИК ВЫСШЕЙ ЛИГИ</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «ОН ЗНАЕТ, С КЕМ ТЕБЕ ПОЗНАКОМИТЬСЯ. НО НЕ ЗНАЕТ, КАК ПОЗНАКОМИТЬСЯ САМ».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Кайрат — признанный гуру по раздаче бесплатных советов в области романтических знакомств.
            По необъяснимым законам физики его фундаментальная теория опережает реальную практику примерно на световой год.
          </p>

          {/* Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Советов друзьям</div>
              <div className="text-purple-400 font-bold text-base">∞ Бесконечность</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Знакомств лично</div>
              <div className="text-zinc-400 font-bold text-base">Засекречено</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Уверенность в других</div>
              <div className="text-amber-400 font-bold text-base">Максимальная</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Подойти самому</div>
              <div className="text-red-400 font-bold text-xs mt-1">Сервер не отвечает</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        {stage === 'idle' && (
          <button
            onClick={startPickupMode}
            className="w-full sm:w-auto px-5 py-2.5 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)]"
          >
            <Lightbulb className="w-4 h-4 text-purple-400" />
            <span>АКТИВИРОВАТЬ РЕЖИМ ЗНАКОМСТВА</span>
          </button>
        )}

        {(stage === 'charging' || stage === 'frozen') && (
          <div className="space-y-2 p-4 rounded bg-zinc-900/80 border border-purple-800/60">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                {stage === 'frozen'
                  ? 'СИСТЕМА ЗАВИСЛА... КАЙРАТ СМОТРИТ НА ДЕВУШКУ...'
                  : 'КАЙРАТ НАБИРАЕТ УВЕРЕННОСТЬ...'}
              </span>
              <span className="text-purple-400 font-bold tabular-nums">{progress}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-2.5 rounded overflow-hidden border border-zinc-800">
              <div
                className={`h-full transition-all duration-75 ${
                  stage === 'frozen' ? 'bg-amber-500 animate-pulse' : 'bg-purple-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {stage === 'error' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="p-4 rounded border border-red-800/80 bg-red-950/40 text-red-200 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold tracking-wider">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>ОШИБКА 99%: КРИТИЧЕСКИЙ СБОЙ ХРАБРОСТИ</span>
              </div>
              <div className="text-sm font-bold text-white pl-7">
                «ОПЕРАЦИЯ ПРЕРВАНА. ОБЪЕКТ РЕШИЛ ПОКА ОБСУДИТЬ ТЕОРИЮ С ДРУЗЬЯМИ».
              </div>
              <div className="text-zinc-400 pl-7 text-[11px]">
                Вердикт: Подойти к незнакомке не удалось. Кайрат заказал чай и уже 40 минут объясняет друзьям, как правильно это делать.
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ПОВТОРИТЬ ПОПЫТКУ ЗНАКОМСТВА</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
