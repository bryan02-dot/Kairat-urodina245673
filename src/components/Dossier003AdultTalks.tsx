import React, { useState } from 'react';
import { HeartHandshake, Flame, ArrowRight, MessageSquareWarning, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const SAMPLE_TOPICS = [
  'Погода в Астане',
  'Замена масла в авто',
  'Курс доллара и инфляция',
  'Покупка микроволновки',
  'Новый фильм в кинотеатре'
];

const ANALYSIS_RESULTS = [
  'Тема разговора: погода. Через 30 секунд обсуждаются отношения.',
  'Исходная тема потеряна. Все участники перешли к историям из личной жизни.',
  'Кайрат снова открыл архив воспоминаний: «Кстати, помню одну девушку...».',
  'Разговор не завершён. Обнаружена дополнительная глава романа.',
  'Система рекомендует вернуть разговор к первоначальному вопросу. Шанс успеха: 0%.',
  'Переход выполнен с рекордной скоростью: от выбора зимней резины к философии поцелуев.'
];

export const Dossier003AdultTalks: React.FC = () => {
  const [topic, setTopic] = useState(SAMPLE_TOPICS[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = () => {
    sounds.playBlip(620, 0.1);
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      const res = ANALYSIS_RESULTS[Math.floor(Math.random() * ANALYSIS_RESULTS.length)];
      setResult(res);
      sounds.playBlip(880, 0.15);
    }, 700);
  };

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700/80 transition-all shadow-lg relative">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5 text-xs font-mono">
          <span className="text-pink-500 font-bold tracking-wider">ДОСЬЕ №003 // ДЕПАРТАМЕНТ РОМАНТИКИ И ИСТОРИЙ</span>
          <span className="text-zinc-500">РЕЖИМ: 18+ DIALOGUE ENGINE</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-pink-500 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
              «СЕКЦИЯ ВЗРОСЛЫХ ТЕМ. НЕПРЕРЫВНОЕ ВЕЩАНИЕ».
            </h2>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Эксперты установили: после определённого количества минут разговора о жизни Кайрат способен
            перевести абсолютно любую нейтральную тему в обсуждение девушек, поцелуев и драматических личных историй.
          </p>

          {/* Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Упомянуть девушку</div>
              <div className="text-pink-400 font-bold text-base tabular-nums">97%</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Подробная история</div>
              <div className="text-red-400 font-bold text-base tabular-nums">100%</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Длительность</div>
              <div className="text-amber-400 font-bold text-xs mt-1">До новой аудитории</div>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <div className="text-zinc-500">Смена темы</div>
              <div className="text-emerald-400 font-bold text-base">Максимальная</div>
            </div>
          </div>

          {/* Topic selector */}
          <div className="pt-2">
            <label className="text-xs font-mono text-zinc-400 block mb-2">
              Исходная нейтральная тема для проверки девиации:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTopic(t);
                    sounds.playBlip(500, 0.04);
                  }}
                  className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors cursor-pointer ${
                    topic === t
                      ? 'bg-pink-950/70 border-pink-700 text-pink-200'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-900/80 space-y-4">
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="w-full sm:w-auto px-5 py-2.5 bg-pink-950/60 hover:bg-pink-900/80 text-pink-200 border border-pink-700/60 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(236,72,153,0.2)]"
        >
          <MessageSquareWarning className="w-4 h-4 text-pink-400" />
          <span>{analyzing ? 'АНАЛИЗ ТЕМАТИЧЕСКОГО СДВИГА...' : 'ЗАПУСТИТЬ АНАЛИЗ РАЗГОВОРА'}</span>
        </button>

        {result && (
          <div className="p-3.5 rounded bg-zinc-900/80 border border-pink-800/60 text-pink-100 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
            <HeartHandshake className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                ИСХОД: {topic} ➔ РАЗГОВОР ПРО ДЕВУШЕК
              </div>
              <div className="text-sm font-semibold mt-0.5">{result}</div>
            </div>
          </div>
        )}

        <div className="text-[11px] font-mono text-zinc-500">
          * Все совпадения с реальными свиданиями Кайрата подтверждаются исключительно самим Кайратом.
        </div>
      </div>
    </div>
  );
};
