import React, { useState } from 'react';
import { MapPin, Camera, Stamp, Search, AlertOctagon, HelpCircle, FileSearch } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const ZAMAN_VERSIONS = [
  'Версия №1: Объект отправился на важную дипломатическую встречу.',
  'Версия №2: Кайрат нашёл место для отдыха, но забыл уведомить друзей.',
  'Версия №3: Объект снова занят личными делами. Подробности засекречены.',
  'Версия №4: Маршрут известен, цель миссии — нет.',
  'Версия №5: Следствие предполагает романтические обстоятельства и приятную компанию, но доказательств недостаточно.'
];

export const Dossier010ZamanInvestigation: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  const [accusationCount, setAccusationCount] = useState(0);
  const [caseClosedStamp, setCaseClosedStamp] = useState(false);
  const [accuseNotice, setAccuseNotice] = useState<string | null>(null);

  const handleInvestigateRoute = () => {
    sounds.playRadarPing();
    const v = ZAMAN_VERSIONS[Math.floor(Math.random() * ZAMAN_VERSIONS.length)];
    setCurrentVersion(v);
  };

  const handleAccuse = () => {
    sounds.playStamp();
    const nextCount = accusationCount + 1;
    setAccusationCount(nextCount);
    setAccuseNotice('«Кайрат, у тебя два варианта: рассказать правду или снова ответить через четыре часа».');

    if (nextCount >= 3) {
      setTimeout(() => {
        sounds.playStamp();
        setCaseClosedStamp(true);
      }, 400);
    }
  };

  return (
    <section id="zaman" className="py-12 border-b border-zinc-900 bg-black/90 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
            <Camera className="w-4 h-4 text-red-500 animate-pulse" />
            <span>ДОСЬЕ №010 // ОПЕРАЦИЯ «ЖК ЗАМАН»</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">КАМЕРА НОЧНОГО НАБЛЮДЕНИЯ CAM-14</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-wide uppercase">
            «ЗАМАН: МЕСТО, КУДА ВЕДУТ СЛЕДЫ».
          </h2>

          <p className="text-base text-zinc-300 font-mono border-l-2 border-red-500 pl-4 py-0.5">
            Кайрат снова замечен на маршруте, который не входит в официальное расписание дружеских встреч.
          </p>
        </div>

        {/* Tactical Night Case Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Surveillance Feed & Photo */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border-2 border-red-950 bg-zinc-950 shadow-[0_0_35px_rgba(220,38,38,0.2)]">
            <div className="relative aspect-video">
              <img
                src="/src/assets/images/zaman_complex_night_1792581456922.jpg"
                alt="ЖК Заман ночью"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
              />

              {/* Decorative HUD overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />

              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-red-900 text-red-400 font-mono text-xs px-2.5 py-1 rounded flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>REC // 03:14:08 AM</span>
              </div>

              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-zinc-800 text-zinc-300 font-mono text-xs px-2.5 py-1 rounded">
                СЕКТОР: ЖК «ЗАМАН» // ВЪЕЗД С ЮГА
              </div>

              {/* Route line simulation */}
              <div className="absolute bottom-10 right-10 bg-red-950/80 border border-red-600 text-white font-mono text-[11px] px-2 py-0.5 rounded shadow">
                GPS ТРЕК: ОБОРВАН НА ПАРКОВКЕ
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>СИГНАЛ ТЕЛЕФОНА: АВИАРЕЖИМ (?)</span>
              <span className="text-amber-400">ОТВЕТ ОЖИДАЕТСЯ: УТРОМ</span>
            </div>
          </div>

          {/* Investigation Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="text-xs font-mono text-zinc-400 border-b border-zinc-900 pb-3 flex justify-between items-center">
                <span className="text-red-400 font-bold uppercase">ПАНЕЛЬ РАССЛЕДОВАНИЯ</span>
                <span className="text-zinc-500">ДЕЛО #ZAMAN-007</span>
              </div>

              {/* Investigation Metrics */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Частота в районе:</span>
                  <span className="text-amber-400 font-bold">Подозрительно стабильная</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Официальная причина:</span>
                  <span className="text-red-400 font-bold">Засекречена</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Версия следствия:</span>
                  <span className="text-pink-400 font-bold">Отдых в приятной компании</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Объяснений получено:</span>
                  <span className="text-zinc-500 font-bold">Недостаточно</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Загадочность маршрута:</span>
                  <span className="text-red-500 font-bold tabular-nums">99%</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-red-950/40 border border-red-900/60 text-red-200">
                  <span>Статус дела:</span>
                  <span className="font-bold tracking-wider animate-pulse">«НУЖНЫ ОБЪЯСНЕНИЯ»</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleInvestigateRoute}
                  className="w-full px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-red-400" />
                  <span>РАССЛЕДОВАТЬ МАРШРУТ</span>
                </button>

                <button
                  onClick={handleAccuse}
                  className="w-full px-4 py-2.5 bg-red-950/70 hover:bg-red-900 text-red-100 border border-red-700 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                >
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span>ПРЕДЪЯВИТЬ ОБВИНЕНИЕ В ТАИНСТВЕННОСТИ ({accusationCount})</span>
                </button>
              </div>

              {/* Route Version Output */}
              {currentVersion && (
                <div className="p-3 rounded bg-zinc-900 border border-red-900/60 text-red-200 text-xs font-mono space-y-1 animate-in fade-in">
                  <div className="text-[10px] text-red-400 font-bold uppercase">ВЕРСИЯ ОПЕРАТИВНИКОВ:</div>
                  <div className="text-slate-100 font-semibold">{currentVersion}</div>
                </div>
              )}

              {/* Accusation Output */}
              {accuseNotice && (
                <div className="p-3 rounded bg-red-950/60 border border-red-700 text-red-100 text-xs font-mono animate-in fade-in">
                  {accuseNotice}
                </div>
              )}

              {/* Giant Red Rubber Stamp */}
              {caseClosedStamp && (
                <div className="p-4 rounded border-4 border-red-600 bg-red-950/80 text-center font-heading text-red-400 font-bold uppercase tracking-widest text-sm rotate-1 animate-in zoom-in-75 duration-300 shadow-[0_0_25px_rgba(239,68,68,0.6)]">
                  «ДЕЛО ЖК ЗАМАН: ЗАКРЫТО ДО ПОЯВЛЕНИЯ САМОГО КАЙРАТА С ОБЪЯСНЕНИЯМИ»
                </div>
              )}
            </div>

            <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">
              * Раздел представляет собой шуточную детективную пародию. Друзья предполагают романтический характер поездок, однако достоверных подтверждений этому нет.
            </div>
          </div>
        </div>

        {/* Punchline Footer Banner */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 text-center font-mono">
          <div className="text-lg font-heading text-white tracking-wider uppercase">
            «В ЖК ЗАМАН МОЖНО НАЙТИ МНОГОЕ. НО ОТВЕТ КАЙРАТА — НЕ ФАКТ».
          </div>
        </div>

      </div>
    </section>
  );
};
