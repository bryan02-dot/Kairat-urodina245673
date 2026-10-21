import React, { useState } from 'react';
import { Wine, AlertCircle, RefreshCw, Archive, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const BAR_RESULTS = [
  'Кайрат занят. Причина засекречена.',
  'Обнаружен новый эпизод сериала «Куда он опять делся?».',
  'Следствие подозревает, что вечер снова пошёл по сценарию без сценариста.',
  'Объект обещал объяснить завтра. Завтра пока не наступило.',
  'Архив пополнен. Яснее не стало.',
  'Оперативная съёмка зафиксировала тост: «За нас и за молчание в чате».',
  'Уровень таинственности бокала: 100%.',
];

export const Dossier002SecretBar: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<string | null>(null);
  const [checkCount, setCheckCount] = useState(0);

  const handleCheckVersion = () => {
    sounds.playBlip(750, 0.08);
    const next = BAR_RESULTS[Math.floor(Math.random() * BAR_RESULTS.length)];
    setCurrentResult(next);
    setCheckCount((c) => c + 1);
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-amber-500 font-bold tracking-wider">ДОСЬЕ №002 // СПЕЦ-ОТДЕЛ «НАПИТКИ И ТЕНИ»</span>
          <span className="text-zinc-500">ПРОТОКОЛ: ТАЙНЫЙ БАРКЕП</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Wine className="w-6 h-6 text-amber-500 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «ОН НЕ ПРОПАЛ. ОН ПРОСТО НЕ СООБЩИЛ, ГДЕ НАХОДИТСЯ».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Панель расследования привычки объекта регулярно употреблять напитки собственного приготовления,
            в том числе в строжайшем одиночестве и в режиме скрытности от любых дружеских радаров.
          </p>

          {/* Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Необъяснимых пропаж</div>
              <div className="text-amber-400 font-bold text-base">Много</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Уровень секретности</div>
              <div className="text-red-400 font-bold text-base">Максимальный</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Прозрачность планов</div>
              <div className="text-zinc-400 font-bold text-base">Отсутствует</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">«Я просто дома»</div>
              <div className="text-amber-400 font-bold text-base">Требует проверки</div>
            </div>
            <div className="col-span-2 p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Нераскрытых вечерних дел</div>
              <div className="text-red-400 font-bold text-base">Архив переполнен</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        <button
          onClick={handleCheckVersion}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-950/50 hover:bg-amber-900/70 text-amber-200 border border-amber-600/50 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.2)]"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>ПРОВЕРИТЬ ВЕРСИЮ {checkCount > 0 ? `(${checkCount})` : ''}</span>
        </button>

        {currentResult && (
          <div className="p-3.5 rounded bg-zinc-900/80 border border-amber-700/60 text-amber-100 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
            <Archive className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] text-amber-400/80 font-bold tracking-wider uppercase">РАССЛЕДОВАНИЕ ВЕЧЕРА:</div>
              <div className="text-sm font-semibold mt-0.5">{currentResult}</div>
            </div>
          </div>
        )}

        <div className="p-2.5 rounded bg-zinc-900/40 border border-zinc-800 text-[11px] font-mono text-zinc-400 leading-normal">
          ⚖️ <span className="text-zinc-300 font-medium">Примечание следствия:</span> Постоянное употребление алкоголя не является достижением или суперсилой. Юмор направлен исключительно на иронию над таинственностью планов и не романтизирует злоупотребление.
        </div>
      </div>
    </div>
  );
};
