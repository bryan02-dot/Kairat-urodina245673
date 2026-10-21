import React, { useState } from 'react';
import { PhoneCall, PhoneOff, PhoneForwarded, Spade, Heart, Club, Diamond, AlertCircle, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Dossier008DurakTournament: React.FC = () => {
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'rejected' | 'busy'>('idle');
  const [callAttempts, setCallAttempts] = useState(0);

  const startCalling = () => {
    sounds.playRingtone();
    setCallStatus('calling');
  };

  const handleAction = (action: 'accept' | 'reject' | 'pretendBusy') => {
    const nextAttempts = callAttempts + 1;
    setCallAttempts(nextAttempts);

    if (action === 'accept') {
      // Even if user presses accept, Kairat rejects it anyway!
      sounds.playCardSlap();
      setCallStatus('rejected');
    } else if (action === 'reject') {
      sounds.playCardSlap();
      setCallStatus('rejected');
    } else {
      sounds.playBlip(350, 0.1);
      setCallStatus('busy');
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
            <Spade className="w-4 h-4 text-emerald-400" />
            ДОСЬЕ №008 // СЕКРЕТНЫЙ ТУРНИР «ДУРАК ОНЛАЙН»
          </span>
          <span className="text-zinc-500">РЕЖИМ: «НЕ БЕСПОКОИТЬ»</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Durak Table Image */}
          <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-zinc-800 bg-black aspect-video md:aspect-[4/3]">
            <img
              src="/src/assets/images/durak_cards_tournament_1792581456738.jpg"
              alt="Турнир по дураку"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-125 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-800">
              КОЗЫРЬ: ПИКИ ♠
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-zinc-300 text-[10px] font-mono px-2 py-0.5 rounded">
              ХОД КАЙРАТА
            </div>
          </div>

          {/* Stats & Context */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «ЗВОНОК ОТ ДРУГА? НЕ МОГУ. ИДЁТ МЕЖДУНАРОДНЫЙ ТУРНИР ПО КАРТОЧНОЙ СТРАТЕГИИ».
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              Звонить Кайрату во время решающего подкидного раунда — государственное преступление против его рейтинга.
              Палец рефлекторно нажимает красную кнопку сброса быстрее, чем мозг успевает прочесть имя звонящего.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-2.5 py-1 text-xs font-mono">
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500">Шанс отклонения</div>
                <div className="text-red-400 font-bold text-base">Высокий</div>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500">Важность партии</div>
                <div className="text-amber-400 font-bold text-base">Гос. уровень</div>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500">Обратный звонок</div>
                <div className="text-zinc-400 font-bold text-base">Неизвестно</div>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500">Дружеский статус</div>
                <div className="text-emerald-400 font-bold text-xs mt-1">«Перезвонит позже»</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Incoming Call Simulator */}
      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        {callStatus === 'idle' && (
          <button
            onClick={startCalling}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>СДЕЛАТЬ ВХОДЯЩИЙ ЗВОНОК КАЙРАТУ</span>
          </button>
        )}

        {callStatus === 'calling' && (
          <div className="p-4 rounded-xl bg-zinc-900 border-2 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  📞
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400">ВХОДЯЩИЙ ВЫЗОВ НА ТЕЛЕФОН КАЙРАТА:</div>
                  <div className="text-sm font-bold text-white">«Лучший Друг (Звонок №{callAttempts + 1})»</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 animate-ping">● ВЫЗОВ...</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => handleAction('accept')}
                className="flex-1 min-w-[120px] px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-mono text-xs font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>ПРИНЯТЬ</span>
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="flex-1 min-w-[120px] px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-mono text-xs font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>ОТКЛОНИТЬ</span>
              </button>
              <button
                onClick={() => handleAction('pretendBusy')}
                className="flex-1 min-w-[150px] px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-mono text-xs font-bold uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                <PhoneForwarded className="w-3.5 h-3.5" />
                <span>СДЕЛАТЬ ВИД, ЧТО ЗАНЯТ</span>
              </button>
            </div>
          </div>
        )}

        {(callStatus === 'rejected' || callStatus === 'busy') && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="p-4 rounded border border-red-800/80 bg-red-950/40 text-red-200 text-xs font-mono space-y-1.5">
              <div className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>ВЫЗОВ ОТКЛОНЁН АБОНЕНТОМ:</span>
              </div>
              <div className="text-sm font-bold text-white">
                «Абонент временно недоступен. Возможная причина: критически важная партия в “Дурака”».
              </div>
              {callAttempts >= 2 && (
                <div className="text-amber-300 pt-1 text-[11px]">
                  «Кайрат не смог ответить на звонок, но его игровые навыки продолжают развиваться».
                </div>
              )}
            </div>

            <button
              onClick={startCalling}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ПОЗВОНИТЬ ЕЩЁ РАЗ (ПОПЫТКА {callAttempts + 1})</span>
            </button>
          </div>
        )}

        <div className="text-[11px] font-mono text-zinc-500">
          * Все звонки и уведомления являются частью юмористической симуляции и не совершают реальных вызовов.
        </div>
      </div>
    </div>
  );
};
