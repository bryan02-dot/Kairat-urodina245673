import React, { useState } from 'react';
import { Crown, Sparkles, ScrollText, CheckCircle2, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const INVITATION_PROMPTS = [
  'Брат, пошли гулять.',
  'Мы уже все собрались.',
  'Твоё присутствие крайне необходимо.',
  'Ваше Величество, карета подана.'
];

const ROYAL_REPLIES = [
  '«Посмотрим».',
  '«Кто будет?»',
  '«А куда?»',
  '«Я щас подумаю».',
  '«Давайте попозже».',
  '«Сегодня не получится».',
  '«Я только прилёг...»'
];

interface ReplyHistory {
  prompt: string;
  reply: string;
  time: string;
}

export const Dossier005HisMajesty: React.FC = () => {
  const [history, setHistory] = useState<ReplyHistory[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [royalApproval, setRoyalApproval] = useState(false);

  const sendInvitation = (promptText: string) => {
    sounds.playBlip(700, 0.08);
    const newCount = attempts + 1;
    setAttempts(newCount);

    const randomReply = ROYAL_REPLIES[Math.floor(Math.random() * ROYAL_REPLIES.length)];
    const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setHistory((prev) => [{ prompt: promptText, reply: randomReply, time: timeStr }, ...prev.slice(0, 4)]);

    if (newCount >= 4 && !royalApproval) {
      setTimeout(() => {
        sounds.playFanfare();
        setRoyalApproval(true);
      }, 500);
    }
  };

  return (
    <div className="rounded-xl border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/30 via-zinc-950 to-zinc-950 p-6 md:p-8 flex flex-col justify-between hover:border-amber-400 transition-all shadow-[0_0_25px_rgba(245,158,11,0.15)] relative overflow-hidden">
      {/* Background Throne Room Accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between border-b border-amber-900/50 pb-4 mb-5 text-xs font-mono">
          <span className="text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-amber-400" />
            ДОСЬЕ №005 // КОРОЛЕВСКИЙ ПРОТОКОЛ КАЙРАТА I
          </span>
          <span className="text-amber-300/70">СТАТУС: АУДИЕНЦИЯ НЕ ГАРАНТИРОВАНА</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-200 tracking-wide uppercase">
              «ЧТОБЫ ВЫВЕСТИ КАЙРАТА НА УЛИЦУ, НЕОБХОДИМО ПРОВЕСТИ ДИПЛОМАТИЧЕСКИЕ ПЕРЕГОВОРЫ».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Обычное приглашение не соответствует монаршему статусу объекта. Для выхода из квартиры требуется
            строго соблюсти вековой протокол, проявить безграничное почтение, предоставить гарантии комфорта и,
            желательно, направить делегацию в парадной форме.
          </p>

          {/* Palace Protocol Buttons */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono text-amber-400/90 font-semibold uppercase tracking-wider">
              Дипломатическая нота (выберите обращение к Монарху):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INVITATION_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendInvitation(prompt)}
                  className="px-4 py-2.5 rounded bg-amber-950/40 hover:bg-amber-900/60 active:bg-amber-800 text-amber-200 border border-amber-600/50 text-xs font-mono transition-all text-left flex items-center justify-between group cursor-pointer shadow-sm"
                >
                  <span>{prompt}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Royal Response Timeline */}
      <div className="mt-6 pt-5 border-t border-amber-900/40 space-y-4">
        {history.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex justify-between">
              <span>Хроника переговоров (попыток: {attempts}):</span>
              <span className="text-amber-400">Кайрат I на связи</span>
            </div>
            <div className="space-y-1.5">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-black/60 border border-amber-950 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-zinc-300 animate-in fade-in"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-[10px]">[{item.time}]</span>
                    <span className="text-zinc-400">Вы: «{item.prompt}»</span>
                  </div>
                  <div className="text-amber-300 font-bold sm:text-right pl-4 sm:pl-0">
                    Кайрат: {item.reply}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Royal Approval Decree */}
        {royalApproval && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-amber-950/80 via-yellow-950/50 to-amber-950/80 border-2 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-in zoom-in-95 duration-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-heading font-bold tracking-wider text-base uppercase">
              <ScrollText className="w-5 h-5 text-amber-300" />
              <span>ОФИЦИАЛЬНЫЙ УКАЗ ЕГО ВЕЛИЧЕСТВА:</span>
            </div>
            <div className="text-sm font-bold text-white font-mono leading-relaxed">
              «ПОЗДРАВЛЯЕМ! ПРИГЛАШЕНИЕ ПРИНЯТО К РАССМОТРЕНИЮ. СРОК РАССМОТРЕНИЯ — ОТ 2 ДО 4 РАБОЧИХ ЧАСОВ».
            </div>
            <div className="text-xs text-amber-300/80 font-mono">
              Примечание канцелярии: Рассмотрение может быть приостановлено в случае непредвиденной партии в карты или дневного сна.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
