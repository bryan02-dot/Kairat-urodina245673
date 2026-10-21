import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, Check, CheckCheck, MessageSquare, UserCheck, Flame, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Message {
  sender: 'user' | 'kairat' | 'system';
  text: string;
  time: string;
}

const PRESET_MESSAGES = [
  'Ты где?',
  'Пойдём гулять?',
  'Брат, ответь.',
  'Ты сегодня выйдешь?',
  'Ты видел моё сообщение?'
];

export const Dossier007MessengerSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'system',
      text: 'Чат зашифрован. Время ожидания ответа: от 2 до 4 часов.',
      time: '00:00'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [statusText, setStatusText] = useState('Был в сети: 4 часа назад');
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenarioMode, setScenarioMode] = useState<'standard' | 'kairatFirst'>('standard');
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, statusText]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text || isSimulating) return;

    sounds.playBlip(720, 0.06);
    setInputVal('');
    const nowTime = '22:15';

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text, time: nowTime }
    ]);

    setIsSimulating(true);

    // Comedy acceleration stages:
    const stages = [
      { delay: 800, status: 'Сообщение доставлено ✓' },
      { delay: 1800, status: 'Кайрат получил уведомление 📲' },
      { delay: 3000, status: 'Кайрат, возможно, посмотрел на экран 👀' },
      { delay: 4200, status: '⏳ Прошло 2 часа (Время: 00:15)' },
      { delay: 5600, status: '⏳ Прошло 4 часа (Время: 02:15)' },
      { delay: 7000, status: 'Кайрат печатает...' },
      { delay: 8400, status: 'Кайрат перестал печатать' },
    ];

    stages.forEach((st) => {
      setTimeout(() => {
        setStatusText(st.status);
        sounds.playBlip(500, 0.03);
      }, st.delay);
    });

    setTimeout(() => {
      sounds.playBlip(920, 0.15);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'kairat',
          text: 'А, брат, только увидел.',
          time: '02:16'
        }
      ]);
      setStatusText('Был в сети: только что (и уже вышел)');
      setIsSimulating(false);
    }, 9800);
  };

  const handleKairatFirstScenario = () => {
    sounds.playBlip(800, 0.1);
    setScenarioMode('kairatFirst');
    setIsSimulating(true);
    setStatusText('Кайрат внезапно в сети');

    setMessages([
      {
        sender: 'kairat',
        text: 'Брат, ты где? Есть срочный вопрос на 5 минут!',
        time: '19:40'
      }
    ]);

    setTimeout(() => {
      setStatusText('Вы ответили за 1 секунду:');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: 'Я тут! Что случилось, брат?',
          time: '19:40'
        }
      ]);

      setTimeout(() => {
        sounds.playError();
        setStatusText('Кайрат снова испарился. Был в сети: 19:40');
        setMessages((prev) => [
          ...prev,
          {
            sender: 'system',
            text: 'ОБЪЕКТ ПОКИНУЛ СЕТЬ. СЛЕДУЮЩЕЕ ПОЯВЛЕНИЕ ЧЕРЕЗ 4 ЧАСА.',
            time: '19:41'
          }
        ]);
        setIsSimulating(false);
      }, 2500);
    }, 1500);
  };

  const handleResetChat = () => {
    sounds.playBlip(400, 0.05);
    setScenarioMode('standard');
    setIsSimulating(false);
    setStatusText('Был в сети: 4 часа назад');
    setMessages([
      {
        sender: 'system',
        text: 'Чат зашифрован. Время ожидания ответа: от 2 до 4 часов.',
        time: '00:00'
      }
    ]);
  };

  return (
    <section id="messenger" className="py-12 border-b border-zinc-900 bg-zinc-950/60 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
            ДОСЬЕ №007 // ХРОНОМЕТРАЖ МЕССЕНДЖЕРА
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-wide uppercase">
            «СООБЩЕНИЕ ДОСТАВЛЕНО. ОТВЕТ ОЖИДАЕТСЯ В СЛЕДУЮЩЕЙ ЭПОХЕ».
          </h2>
          <p className="text-sm text-zinc-400 font-sans max-w-xl mx-auto">
            Интерактивный симулятор переписки с Кайратом. Испытайте на себе всю гамму чувств
            человека, ждущего простого ответа на вопрос «Ты где?».
          </p>
        </div>

        {/* Messenger Phone Frame */}
        <div className="rounded-2xl border border-zinc-800 bg-black/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
          {/* Top Bar of Messenger */}
          <div className="p-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow">
                К
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Кайрат (Объект 007)</span>
                  <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.2 rounded font-mono">
                    2–4 ч
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-400 animate-pulse">
                  {statusText}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleKairatFirstScenario}
                disabled={isSimulating}
                className="px-2.5 py-1 text-[11px] font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
                title="Сценарий: Кайрат написал первым!"
              >
                ⚡ Сценарий «Кайрат пишет 1-м»
              </button>
              <button
                onClick={handleResetChat}
                className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                title="Сбросить чат"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div
            ref={chatScrollRef}
            className="p-4 sm:p-6 space-y-3 min-h-[300px] max-h-[380px] overflow-y-auto font-sans text-sm bg-gradient-to-b from-zinc-950 to-black"
          >
            {messages.map((m, idx) => {
              if (m.sender === 'system') {
                return (
                  <div key={idx} className="flex justify-center my-2">
                    <span className="text-[11px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full text-center">
                      {m.text}
                    </span>
                  </div>
                );
              }

              const isUser = m.sender === 'user';
              return (
                <div
                  key={idx}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl ${
                      isUser
                        ? 'bg-red-600 text-white rounded-br-none shadow-md'
                        : 'bg-zinc-800 text-slate-100 rounded-bl-none border border-zinc-700'
                    }`}
                  >
                    <div>{m.text}</div>
                    <div
                      className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${
                        isUser ? 'text-red-200' : 'text-zinc-400 font-mono'
                      }`}
                    >
                      <span>{m.time}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Presets Chips */}
          <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-mono text-zinc-500">Быстрый вопрос:</span>
            {PRESET_MESSAGES.map((msg) => (
              <button
                key={msg}
                onClick={() => handleSendMessage(msg)}
                disabled={isSimulating}
                className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {msg}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Напишите Кайрату (он ответит через геологическую эру)..."
              disabled={isSimulating}
              className="flex-1 bg-zinc-950 border border-zinc-800 text-sm text-white px-3 py-2 rounded-lg focus:outline-none focus:border-red-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSimulating || !inputVal.trim()}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-40 text-white rounded-lg flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              <span>ОТПРАВИТЬ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Punchline Banner */}
        <div className="p-4 rounded-xl border border-red-950 bg-red-950/20 text-center font-mono space-y-1">
          <div className="text-red-400 font-bold text-sm uppercase tracking-wider">
            «СКОРОСТЬ ОТВЕТА ДРУЗЕЙ: МГНОВЕННАЯ. СКОРОСТЬ ОТВЕТА КАЙРАТА: ГЕОЛОГИЧЕСКАЯ».
          </div>
          <div className="text-xs text-zinc-400">
            Легенда гласит: если написать Кайрату в четверг, в субботу ночью можно услышать: «Ой, только до телефона добрался».
          </div>
        </div>

      </div>
    </section>
  );
};
