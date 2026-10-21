import React from 'react';
import { Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ soundEnabled, onToggleSound }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-red-950/60 px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-red-500 font-heading text-lg md:text-xl font-bold tracking-wider uppercase whitespace-nowrap shrink-0 hover:text-red-400 transition-colors"
        >
          <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
          <span>KAIRAT.EXE // ДОСЬЕ №007</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-slate-400 font-mono">
          <a href="#radar" className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0">
            Радар
          </a>
          <a href="#dossier-grid" className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0">
            Материалы Дела
          </a>
          <a href="#messenger" className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0">
            Мессенджер
          </a>
          <a href="#zaman" className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0">
            ЖК Заман
          </a>
          <a href="#boss-fight" className="hover:text-red-400 transition-colors whitespace-nowrap shrink-0">
            Битва с Боссом
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action (Sound Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all border ${
              soundEnabled
                ? 'bg-red-950/80 text-red-300 border-red-700/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title={soundEnabled ? 'Отключить звуковые эффекты' : 'Включить звуковые эффекты'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">ЗВУК: ВКЛ</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <span className="hidden sm:inline">ЗВУК: ВЫКЛ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
