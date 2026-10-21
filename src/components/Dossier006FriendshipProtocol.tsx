import React, { useState } from 'react';
import { Calculator, AlertTriangle, Scale, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const CALC_ERRORS = [
  'ОШИБКА 403: ВЗАИМНОСТЬ ДОСТУПА ЗАПРЕЩЕНА.',
  'Кайрат ожидал приглашение, которое сам не отправил.',
  'Система обнаружила одностороннюю доставку инициативы.',
  'Дружба требует двустороннего подключения. Один пользователь пока ожидает.',
  'Парадокс Кайрата: «Вы меня не позвали туда, куда я сам отказался идти».',
  'Баланс дружбы: 0 исходящих / 100 входящих обид.'
];

export const Dossier006FriendshipProtocol: React.FC = () => {
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const calculateJustice = () => {
    sounds.playBlip(650, 0.08);
    setCalculating(true);
    setResult(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      sounds.playBlip(400 + step * 80, 0.03);
      if (step >= 6) {
        clearInterval(interval);
        setCalculating(false);
        const err = CALC_ERRORS[Math.floor(Math.random() * CALC_ERRORS.length)];
        setResult(err);
        sounds.playError();
      }
    }, 120);
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-orange-500 font-bold tracking-wider">ДОСЬЕ №006 // СОЦИОЛОГИЧЕСКИЙ ПАРАДОКС</span>
          <span className="text-zinc-500">ИНДЕКС ОБИДЫ: 100%</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-orange-500 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «ПРОТОКОЛ ДРУЖБЫ: ТЫ ОБЯЗАН ПОЗВАТЬ МЕНЯ, ХОТЯ Я ТЕБЯ НЕ ЗВАЛ».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Кайрат обладает уникальной системой социальных ожиданий. Он может месяцами не инициировать встречи,
            но при этом свято ожидать личного персонального приглашения и искренне расстраиваться, если его не позвали.
          </p>

          {/* Comedy Formula Box */}
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-orange-950/80 space-y-3 font-mono text-xs">
            <div className="text-[11px] text-orange-400 font-bold uppercase tracking-wider">
              ФОРМУЛА СОЦИАЛЬНОЙ ДИНАМИКИ КАЙРАТА:
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-zinc-300">
                <span>Инициатива Кайрата позвать погулять:</span>
                <span className="text-red-400 font-bold tabular-nums">0%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Ожидание, что его обязаны позвать:</span>
                <span className="text-emerald-400 font-bold tabular-nums">100%</span>
              </div>
              <div className="flex justify-between items-center text-zinc-300">
                <span>Вероятность претензии «А чё вы меня не позвали?»:</span>
                <span className="text-orange-400 font-bold uppercase">КРИТИЧЕСКАЯ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        <button
          onClick={calculateJustice}
          disabled={calculating}
          className="w-full sm:w-auto px-5 py-2.5 bg-orange-950/60 hover:bg-orange-900/80 text-orange-200 border border-orange-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.2)]"
        >
          {calculating ? (
            <>
              <Calculator className="w-4 h-4 text-orange-400 animate-spin" />
              <span>ВЫЧИСЛЕНИЕ МАТРИЦЫ СПРАВЕДЛИВОСТИ...</span>
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 text-orange-400" />
              <span>РАССЧИТАТЬ СПРАВЕДЛИВОСТЬ</span>
            </>
          )}
        </button>

        {result && (
          <div className="p-4 rounded bg-red-950/40 border border-red-800/80 text-red-200 text-xs font-mono flex items-start gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                РЕЗУЛЬТАТ КАЛЬКУЛЯЦИИ:
              </div>
              <div className="text-sm font-bold text-white">{result}</div>
              <div className="text-[11px] text-zinc-400 pt-1">
                Совет алгоритма: Просто сразу извинитесь перед Кайратом, что пошли в магазин без него.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
