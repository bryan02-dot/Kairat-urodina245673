import React, { useState } from 'react';
import { Shield, EyeOff, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const NIGHT_VERSIONS = [
  { id: 'A', text: 'Версия А: объект решил побыть один.' },
  { id: 'B', text: 'Версия Б: объект занят секретной миссией.' },
  { id: 'C', text: 'Версия В: объект опять забыл, что у него есть друзья.' },
  { id: 'D', text: 'Версия Г: даже сам объект не готов объяснить свой маршрут.' },
];

export const Dossier001Disappearance: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const handleReveal = () => {
    sounds.playStamp();
    setRevealed(true);
    setSelectedVersion(NIGHT_VERSIONS[Math.floor(Math.random() * NIGHT_VERSIONS.length)].id);
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative overflow-hidden group">
      {/* Top Tag & ID */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
        <span className="text-red-500 font-bold tracking-wider">ДОСЬЕ №001 // АРХИВ INTERPOL</span>
        <span className="text-zinc-500">ГРИФ: СОВЕРШЕННО СЕКРЕТНО</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Photo evidence */}
        <div className="md:col-span-4 relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-square">
          <img
            src="/src/assets/images/kairat_classified_portrait_1792581455925.jpg"
            alt="Кайрат фоторобот"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
            TARGET-007
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded">
            СЛЕД ПРЕРВАН
          </div>
        </div>

        {/* Info & Text */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            «ДНЁМ ОН ЕСТЬ. НОЧЬЮ ЕГО ИЩЕТ ИНТЕРПОЛ».
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Кайрат — загадочная личность, способная исчезать из информационного пространства без предварительного уведомления.
            Особенно подозрительна активность объекта в ночное время.
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Уровень загадочности</div>
              <div className="text-red-400 font-bold text-base tabular-nums">99%</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Доступность друзьям</div>
              <div className="text-amber-400 font-bold text-base">Критически низкая</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Шанс объяснения</div>
              <div className="text-zinc-400 font-bold text-base">Неизвестен</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Вопросов «Ты где?»</div>
              <div className="text-red-400 font-bold text-base">Засекречено</div>
            </div>
            <div className="col-span-2 p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Прозрачность ночных маршрутов</div>
              <div className="text-red-500 font-bold text-base font-mono">404 — НЕ НАЙДЕНО</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Versions */}
      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-950/70 hover:bg-red-900 text-red-200 border border-red-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.2)]"
          >
            <EyeOff className="w-4 h-4 text-red-400" />
            <span>РАСКРЫТЬ НОЧНОЕ ДЕЛО</span>
          </button>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span>СЛЕДСТВЕННЫЕ ВЕРСИИ ИСЧЕЗНОВЕНИЯ:</span>
              <button
                onClick={handleReveal}
                className="text-red-400 hover:text-red-300 underline text-[11px] cursor-pointer"
              >
                Сменить версию
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {NIGHT_VERSIONS.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVersion(v.id);
                    sounds.playBlip(550, 0.05);
                  }}
                  className={`p-3 rounded border transition-all cursor-pointer flex items-start gap-2 ${
                    selectedVersion === v.id
                      ? 'bg-red-950/60 border-red-600 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${selectedVersion === v.id ? 'text-red-400' : 'text-zinc-600'}`} />
                  <span>{v.text}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded bg-amber-950/20 border border-amber-900/40 text-[11px] font-mono text-amber-300/80">
              ⚠️ Предупреждение: Все версии вымышлены. Следствие не располагает доказательствами.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
