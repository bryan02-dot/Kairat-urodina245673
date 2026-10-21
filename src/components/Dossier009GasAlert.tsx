import React, { useState } from 'react';
import { Wind, AlertTriangle, ShieldAlert, DoorOpen, Skull, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Dossier009GasAlert: React.FC = () => {
  const [alarmActive, setAlarmActive] = useState(false);
  const [evacuated, setEvacuated] = useState(false);

  const handleCheckAir = () => {
    sounds.playSiren();
    setAlarmActive(true);
    setEvacuated(false);
  };

  const handleEvacuate = () => {
    sounds.playBlip(900, 0.1);
    setEvacuated(true);
    setTimeout(() => {
      setAlarmActive(false);
    }, 1800);
  };

  return (
    <div
      className={`rounded-xl border transition-all p-6 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden ${
        alarmActive
          ? 'border-red-600 bg-red-950/50 shadow-[0_0_35px_rgba(239,68,68,0.4)] animate-pulse'
          : 'border-zinc-800/80 bg-zinc-950/70 hover:border-zinc-700/80'
      }`}
    >
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-yellow-500 font-bold tracking-wider flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-yellow-500" />
            ДОСЬЕ №009 // САНИТАРНО-ЭКОЛОГИЧЕСКИЙ НАДЗОР
          </span>
          <span className="text-zinc-500">КОД: ОЗОНОВЫЙ КРИЗИС</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «САНИТАРНАЯ ЗОНА. ВХОД НА СВОЙ СТРАХ И РИСК».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            По единодушным свидетельствам очевидцев из ближайшего круга общения,
            Кайрат способен создать чрезвычайную биохимическую ситуацию локального масштаба,
            даже не вставая с любимого стула.
          </p>

          {/* Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Частота инцидентов</div>
              <div className="text-yellow-400 font-bold text-base">Подозрительно высокая</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Вентиляция</div>
              <div className="text-red-400 font-bold text-base">Сверхурочно</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Уровень угрозы</div>
              <div className="text-amber-400 font-bold text-xs mt-1">Зависит от окон</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Свидетелей</div>
              <div className="text-red-500 font-bold text-xs mt-1">Больше, чем хотелось</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        {!alarmActive ? (
          <button
            onClick={handleCheckAir}
            className="w-full sm:w-auto px-5 py-2.5 bg-yellow-950/60 hover:bg-yellow-900/80 text-yellow-200 border border-yellow-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(234,179,8,0.2)]"
          >
            <Wind className="w-4 h-4 text-yellow-400" />
            <span>ПРОВЕРИТЬ ВОЗДУХ В КОМНАТЕ</span>
          </button>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="p-4 rounded-lg bg-red-900/80 border-2 border-red-500 text-white font-mono space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-red-200 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-red-400 animate-spin" />
                <span>ТРЕВОГА МУЛЬТЯШНОГО МАСШТАБА:</span>
              </div>
              <div className="text-lg font-extrabold text-white">
                «ОШИБКА 666: АТМОСФЕРА ПОКИНУЛА ЧАТ».
              </div>
              <div className="text-xs text-red-200">
                Датчики зашкаливают. Кайрат сидит с невозмутимым лицом и спрашивает: «А чё пахнет разве?».
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleEvacuate}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                <DoorOpen className="w-4 h-4" />
                <span>ЭВАКУАЦИЯ ДРУЗЕЙ В БЕЗОПАСНЫЙ СЕКТОР</span>
              </button>

              {evacuated && (
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Друзья успешно эвакуированы на балкон!</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-[11px] font-mono text-zinc-500">
          * Используются исключительно мультяшные звуки и игровые предупреждения. Никакой токсичности, кроме дружеской иронии.
        </div>
      </div>
    </div>
  );
};
