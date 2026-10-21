import React, { useState } from 'react';
import { Swords, Shield, Heart, Zap, RotateCcw, AlertTriangle, Sparkles, Skull } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface BossAttack {
  name: string;
  dmg: number;
  desc: string;
  effectText: string;
}

const KAIRAT_BOSS_ATTACKS: BossAttack[] = [
  {
    name: 'ОТВЕТ ЧЕРЕЗ 4 ЧАСА',
    dmg: 22,
    desc: 'Кайрат читает сообщение, но закрывает мессенджер на 4 часа.',
    effectText: 'Терпение друзей истощается от бесконечного ожидания!'
  },
  {
    name: 'ОТКЛОНИТЬ ЗВОНОК',
    dmg: 18,
    desc: 'Сброс звонка в первую секунду ради решающего хода в «Дурака».',
    effectText: 'Гудки «Занято» наносят моральный урон!'
  },
  {
    name: 'СКРЫТЬСЯ С РАДАРА',
    dmg: 25,
    desc: 'Объект испаряется в ночном городе без предупреждения.',
    effectText: 'Все гео-локаторы выдают ошибку 404!'
  },
  {
    name: 'КОРОЛЕВСКОЕ ПРИГЛАШЕНИЕ',
    dmg: 15,
    desc: '«Кто будет? Куда идём? А почему так поздно? Посмотрим».',
    effectText: 'Дипломатический тупик снижает боевой дух команды!'
  },
  {
    name: 'БРАТ, Я ТЕБЕ ИСТОРИЮ РАССКАЖУ',
    dmg: 20,
    desc: 'Кайрат перехватывает инициативу и 45 минут рассказывает про давнее свидание.',
    effectText: 'Отряд оглушён романтическими подробностями!'
  },
  {
    name: 'ГАЗОВАЯ АТАКА',
    dmg: 24,
    desc: 'Локальное биохимическое испытание в закрытом помещении.',
    effectText: 'Друзья экстренно открывают все окна и форточки!'
  },
  {
    name: 'СЕКРЕТНЫЙ МАРШРУТ В ЗАМАН',
    dmg: 20,
    desc: 'Внезапный ночной вояж без предварительного согласования.',
    effectText: 'Следствие в замешательстве!'
  },
  {
    name: 'Я САМ ТЕБЕ ПОЗВОНЮ',
    dmg: 16,
    desc: 'Обещание перезвонить через пять минут растворяется в пространстве.',
    effectText: 'Прошло 3 дня, телефон всё ещё молчит!'
  },
  {
    name: 'Я ДУМАЛ, ВЫ САМИ ПОЗОВЁТЕ',
    dmg: 22,
    desc: 'Претензия за встречу, на которую Кайрат сам не проявил ни грамма инициативы.',
    effectText: 'Парадокс дружбы пробивает критический урон!'
  }
];

export const BossFightKairat: React.FC = () => {
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([
    'БИТВА НАЧАЛАСЬ! Финальный босс Кайрат вошёл в чат, но статус "Был в сети давно".'
  ]);
  const [turn, setTurn] = useState<'player' | 'boss'>('player');
  const [gameResult, setGameResult] = useState<'won' | 'lost' | null>(null);
  const [lastBossMove, setLastBossMove] = useState<string | null>(null);
  const [defenseActive, setDefenseActive] = useState(false);

  const executeBossTurn = (currentBossHp: number, currentDefense: boolean) => {
    if (currentBossHp <= 0) return;

    setTurn('boss');
    setTimeout(() => {
      const attack = KAIRAT_BOSS_ATTACKS[Math.floor(Math.random() * KAIRAT_BOSS_ATTACKS.length)];
      setLastBossMove(attack.name);

      const actualDmg = currentDefense ? Math.floor(attack.dmg / 2) : attack.dmg;
      sounds.playBossHit();

      setPlayerHp((prev) => {
        const next = Math.max(0, prev - actualDmg);
        if (next <= 0) {
          sounds.playError();
          setGameResult('lost');
          setBattleLog((l) => [
            `💀 Кайрат применил «${attack.name}» (-${actualDmg} терпения)!`,
            'КАЙРАТ ПОБЕДИЛ. ОН ОТКЛОНИЛ ТВОЙ ЗВОНОК И ПОШЁЛ В СЛЕДУЮЩИЙ РАУНД.',
            ...l
          ]);
        } else {
          setBattleLog((l) => [
            `💥 Кайрат использовал «${attack.name}»: ${attack.desc} (-${actualDmg} терпения)`,
            ...l
          ]);
        }
        return next;
      });

      setDefenseActive(false);
      setTurn('player');
    }, 900);
  };

  const handlePlayerAction = (type: 'call' | 'food' | 'girls' | 'diplomacy' | 'defend') => {
    if (turn !== 'player' || gameResult) return;

    sounds.playBlip(700, 0.08);

    if (type === 'defend') {
      setDefenseActive(true);
      setBattleLog((l) => [
        '🛡️ Отряд друзей включил режим дзэн-буддизма. Урон от следующей атаки снижен на 50%!',
        ...l
      ]);
      executeBossTurn(bossHp, true);
      return;
    }

    let dmg = 0;
    let logMsg = '';

    if (type === 'call') {
      dmg = 24;
      logMsg = '📱 Вы настойчиво звоните в третий раз подряд! Телефон Кайрата вибрирует (-24 HP Кайрата)';
    } else if (type === 'food') {
      dmg = 28;
      logMsg = '🍔 Вы отправили фото горячего донера и пообещали оплатить счёт! Кайрат дрогнул (-28 HP Кайрата)';
    } else if (type === 'girls') {
      dmg = 35;
      logMsg = '💃 Вы написали: «Тут знакомые девчонки пришли, про тебя спрашивают!». Кайрат мгновенно оживился (-35 HP Кайрата)';
    } else if (type === 'diplomacy') {
      dmg = 20;
      logMsg = '👑 Вы прислали ноту почтения Его Величеству. Кайрат задумался о выходе (-20 HP Кайрата)';
    }

    const nextBossHp = Math.max(0, bossHp - dmg);
    setBossHp(nextBossHp);

    if (nextBossHp <= 0) {
      sounds.playVictory();
      setGameResult('won');
      setBattleLog((l) => [
        logMsg,
        '🏆 ТЫ ПОБЕДИЛ КАЙРАТА! ОН УЖЕ НАПИСАЛ В ЧАТ, ЧТО ВЫ ЕГО НИКУДА НЕ ЗОВЁТЕ.',
        ...l
      ]);
      return;
    }

    setBattleLog((l) => [logMsg, ...l]);
    executeBossTurn(nextBossHp, false);
  };

  const handleRestart = () => {
    sounds.playBlip(500, 0.05);
    setBossHp(100);
    setPlayerHp(100);
    setTurn('player');
    setGameResult(null);
    setLastBossMove(null);
    setDefenseActive(false);
    setBattleLog(['БИТВА ПЕРЕЗАПУЩЕНА! Попытка №2 вытащить Кайрата из дома.']);
  };

  return (
    <section id="boss-fight" className="py-12 border-b border-zinc-900 bg-radial from-red-950/30 via-zinc-950 to-black relative">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
            <Swords className="w-4 h-4 text-red-500" />
            <span>БОСС-ФАЙТ // ФИНАЛЬНАЯ БИТВА ЗА ВЫХОД НА УЛИЦУ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-wide uppercase">
            «ГЛАВНЫЙ БОСС: КАЙРАТ, ГРОЗА МЕССЕНДЖЕРОВ»
          </h2>

          <p className="text-sm text-zinc-400 font-sans max-w-xl mx-auto">
            Сразитесь с легендарным повелителем пропущенных вызовов и ночных исчезновений.
            Сможет ли терпение отряда друзей превозмочь его карточную стратегию и королевский этикет?
          </p>
        </div>

        {/* Combat Arena Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Boss Side (Kairat) */}
          <div className={`p-6 rounded-2xl border bg-black/80 space-y-4 transition-all ${
            turn === 'boss' ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)]' : 'border-zinc-800'
          }`}>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-600 flex items-center justify-center text-red-400 font-heading text-xl font-bold">
                  👑
                </div>
                <div>
                  <div className="text-base font-bold text-white uppercase font-heading">
                    КАЙРАТ I (БОСС)
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    Статус: «Играет в Дурака ♠»
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-red-400 font-bold tabular-nums">
                {bossHp}/100 HP
              </span>
            </div>

            {/* Health Bar */}
            <div className="space-y-1">
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{ width: `${bossHp}%` }}
                />
              </div>
            </div>

            {/* Boss Move Indicator */}
            {lastBossMove && (
              <div className="p-2.5 rounded bg-red-950/40 border border-red-800 text-xs font-mono text-red-200">
                ⚡ Последний приём: <span className="font-bold text-white">«{lastBossMove}»</span>
              </div>
            )}

            <div className="text-xs font-mono text-zinc-500 space-y-1">
              <div>Арсенал босса: Ответ через 4 часа, Сброс звонка, Газовая атака, Заман-вояж, Обида на пустом месте.</div>
            </div>
          </div>

          {/* Player Side (Friend Squad) */}
          <div className={`p-6 rounded-2xl border bg-black/80 space-y-4 transition-all ${
            turn === 'player' ? 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)]' : 'border-zinc-800'
          }`}>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400 font-heading text-xl font-bold">
                  👥
                </div>
                <div>
                  <div className="text-base font-bold text-white uppercase font-heading">
                    ОТРЯД ДРУЗЕЙ
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    Ресурс: Терпение и надежда
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold tabular-nums">
                {playerHp}/100 HP
              </span>
            </div>

            {/* Health Bar */}
            <div className="space-y-1">
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {defenseActive && (
              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-xs font-mono text-emerald-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Защита активна (-50% урона)</span>
              </div>
            )}

            <div className="text-xs font-mono text-zinc-400">
              {turn === 'player' ? '👉 Ваш ход: выберите тактический аргумент' : '⏳ Ход Кайрата: ожидание вердикта...'}
            </div>
          </div>
        </div>

        {/* Combat Controls & Actions */}
        {!gameResult ? (
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Выберите действие отряда:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              <button
                onClick={() => handlePlayerAction('call')}
                disabled={turn !== 'player'}
                className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-left border border-zinc-700/80 transition-all font-mono text-xs cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-red-400">📱 Позвонить 3-й раз</div>
                <div className="text-[11px] text-zinc-400">Пробивает 24 урона через спам</div>
              </button>

              <button
                onClick={() => handlePlayerAction('food')}
                disabled={turn !== 'player'}
                className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-left border border-zinc-700/80 transition-all font-mono text-xs cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-amber-400">🍔 Обещать бесплатную еду</div>
                <div className="text-[11px] text-zinc-400">28 урона по аппетиту объекта</div>
              </button>

              <button
                onClick={() => handlePlayerAction('girls')}
                disabled={turn !== 'player'}
                className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-left border border-zinc-700/80 transition-all font-mono text-xs cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-pink-400">💃 Сказать: «Тут девушки»</div>
                <div className="text-[11px] text-zinc-400">35 крит. урона по романтическому коучу</div>
              </button>

              <button
                onClick={() => handlePlayerAction('diplomacy')}
                disabled={turn !== 'player'}
                className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-left border border-zinc-700/80 transition-all font-mono text-xs cursor-pointer group"
              >
                <div className="font-bold text-white group-hover:text-yellow-400">👑 Нота почтения Кайрату I</div>
                <div className="text-[11px] text-zinc-400">20 урона монаршему самолюбию</div>
              </button>

              <button
                onClick={() => handlePlayerAction('defend')}
                disabled={turn !== 'player'}
                className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-left border border-zinc-700/80 transition-all font-mono text-xs cursor-pointer group col-span-1 sm:col-span-2 lg:col-span-2"
              >
                <div className="font-bold text-emerald-300">🛡️ Тактическое терпение (Защита)</div>
                <div className="text-[11px] text-zinc-400">Снижает урон следующей коронной атаки Кайрата в 2 раза</div>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in zoom-in-95 duration-300">
            {gameResult === 'won' ? (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-zinc-950 border-2 border-emerald-500 text-white space-y-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <div className="text-xl font-heading font-bold text-emerald-400 uppercase tracking-wide">
                  🎉 ПОБЕДА ОТРЯДА ДРУЗЕЙ!
                </div>
                <div className="text-base font-bold text-white font-mono">
                  «ТЫ ПОБЕДИЛ КАЙРАТА! ОН УЖЕ НАПИСАЛ В ЧАТ, ЧТО ВЫ ЕГО НИКУДА НЕ ЗОВЁТЕ».
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Кайрат пообещал выйти через 15 минут (это значит через 3 часа, но это уже победа).
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/80 to-zinc-950 border-2 border-red-600 text-white space-y-2 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                <div className="text-xl font-heading font-bold text-red-400 uppercase tracking-wide">
                  💀 ТЕРПЕНИЕ ДРУЗЕЙ ИСТОЩЕНО!
                </div>
                <div className="text-base font-bold text-white font-mono">
                  «КАЙРАТ ПОБЕДИЛ. ОН ОТКЛОНИЛ ТВОЙ ЗВОНОК И ПОШЁЛ В СЛЕДУЮЩИЙ РАУНД».
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  Кайрат остался на диване, взял 6 козырей и включил авиарежим.
                </div>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>РЕВАНШ ПРОТИВ КАЙРАТА</span>
            </button>
          </div>
        )}

        {/* Combat Log */}
        <div className="p-4 rounded-xl bg-black/90 border border-zinc-800 space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">ХРОНИКА СРАЖЕНИЯ:</div>
          {battleLog.map((log, i) => (
            <div key={i} className="text-zinc-300 leading-relaxed border-b border-zinc-900/60 pb-1">
              {log}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
