import React, { useState } from 'react';
import { Search, HelpCircle, AlertOctagon, Terminal, Share2, Check, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const SecretEnding: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [foundAttempted, setFoundAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTryFind = () => {
    sounds.playBlip(400, 0.1);
    setSearching(true);
    setProgress(0);
    setFoundAttempted(false);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 5;
      setProgress(curr);
      if (curr % 20 === 0) {
        sounds.playBlip(300 + curr * 6, 0.04);
      }
      if (curr >= 100) {
        clearInterval(interval);
        setSearching(false);
        setFoundAttempted(true);
        sounds.playError();
      }
    }, 40);
  };

  const handleShare = () => {
    sounds.playBlip(880, 0.08);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-black relative border-t-2 border-red-950/60 overflow-hidden">
      {/* Background terminal ambiance */}
      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
        
        {/* Terminal Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-red-500 uppercase tracking-widest">
          <Terminal className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>СЕКРЕТНЫЙ ЭПИЛОГ // ФИНАЛЬНЫЙ ВОПРОС СЛЕДСТВИЯ</span>
        </div>

        <div className="space-y-4">
          <p className="text-sm md:text-base text-zinc-400 font-mono">
            «Вы прошли все материалы дела. Ознакомились с показаниями, картами и тактикой».
            <br />
            <span className="text-zinc-500">Но остался один главный, неразрешимый вопрос:</span>
          </p>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-red-500 uppercase tracking-tight text-shadow-red animate-pulse">
            ГДЕ КАЙРАТ?
          </h2>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!searching && !foundAttempted && (
            <button
              onClick={handleTryFind}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono text-sm tracking-wider font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(239,68,68,0.5)] cursor-pointer inline-flex items-center gap-3"
            >
              <Search className="w-5 h-5" />
              <span>ПОПРОБОВАТЬ НАЙТИ КАЙРАТА</span>
            </button>
          )}

          {searching && (
            <div className="max-w-md mx-auto space-y-2 p-4 rounded-xl bg-zinc-950 border border-red-900">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>ГЛОБАЛЬНОЕ СКАНИРОВАНИЕ ВСЕХ ЧАТОВ...</span>
                <span className="text-red-400 font-bold tabular-nums">{progress}%</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {foundAttempted && (
            <div className="space-y-6 max-w-2xl mx-auto animate-in zoom-in-95 duration-400">
              <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.3)] space-y-3">
                <div className="flex items-center justify-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  <span>ИТОГОВЫЙ ОТЧЁТ СИСТЕМЫ</span>
                </div>
                <div className="text-xl sm:text-2xl font-heading font-bold text-white uppercase">
                  «ОБЪЕКТ НЕ НАЙДЕН. ПОСЛЕДНИЙ ОТВЕТ ОЖИДАЕТСЯ ЧЕРЕЗ 2–4 ЧАСА».
                </div>
              </div>

              {/* Philosophical punchlines */}
              <div className="space-y-4 font-mono text-sm sm:text-base leading-relaxed px-4">
                <p className="text-amber-300 font-bold text-lg sm:text-xl font-heading uppercase tracking-wide">
                  «Кайрат — это не человек. Это уведомление, на которое ты так и не получил ответ».
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
                  «Его можно найти в разговорах про девушек, услышать в очередной истории, увидеть в игре “Дурак”, но поймать на совместной прогулке — уже отдельный квест».
                </p>
              </div>

              {/* Share Dossier Button */}
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleShare}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">ССЫЛКА СКОПИРОВАНА В БУФЕР!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-red-400" />
                      <span>ОТПРАВИТЬ ДОСЬЕ В ГРУППУ ДРУЗЕЙ И КАЙРАТУ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleTryFind}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 rounded font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Искать снова
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
