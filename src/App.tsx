/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroRadar } from './components/HeroRadar';
import { Dossier001Disappearance } from './components/Dossier001Disappearance';
import { Dossier002SecretBar } from './components/Dossier002SecretBar';
import { Dossier003AdultTalks } from './components/Dossier003AdultTalks';
import { Dossier004PickupCoach } from './components/Dossier004PickupCoach';
import { Dossier005HisMajesty } from './components/Dossier005HisMajesty';
import { Dossier006FriendshipProtocol } from './components/Dossier006FriendshipProtocol';
import { Dossier007MessengerSimulator } from './components/Dossier007MessengerSimulator';
import { Dossier008DurakTournament } from './components/Dossier008DurakTournament';
import { Dossier009GasAlert } from './components/Dossier009GasAlert';
import { Dossier010ZamanInvestigation } from './components/Dossier010ZamanInvestigation';
import { BossFightKairat } from './components/BossFightKairat';
import { SecretEnding } from './components/SecretEnding';
import { sounds } from './utils/soundEffects';
import { ShieldCheck, ArrowUp, FolderKanban } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const scrollToTop = () => {
    sounds.playBlip(600, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 flex flex-col selection:bg-red-900/60 selection:text-white">
      {/* Sound & Navigation Header */}
      <Header soundEnabled={soundEnabled} onToggleSound={toggleSound} />

      {/* Main Container */}
      <main className="flex-1">
        {/* Section 1: Hero Surveillance Radar */}
        <HeroRadar />

        {/* Dossiers Grid Section */}
        <section id="dossier-grid" className="py-12 md:py-16 px-4 md:px-8 border-b border-zinc-900 bg-black/60">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Dossier Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest font-bold">
                  <FolderKanban className="w-4 h-4 text-red-500" />
                  <span>МАТЕРИАЛЫ СЛЕДСТВИЯ // ТОМА 001 — 006</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-wide uppercase mt-1">
                  ДОСЬЕ НА ОБЪЕКТ «КАЙРАТ»
                </h2>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                Рассекречено следственной группой друзей · 2026
              </div>
            </div>

            {/* Dossiers 001 - 006 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 001: Король ночных исчезновений */}
              <Dossier001Disappearance />

              {/* 002: Секретный бармен собственной квартиры */}
              <Dossier002SecretBar />

              {/* 003: Специалист по теме 18+ */}
              <Dossier003AdultTalks />

              {/* 004: Пикап-коуч без практики */}
              <Dossier004PickupCoach />

              {/* 005: Его Величество Кайрат I */}
              <Dossier005HisMajesty />

              {/* 006: Сам не зовёт, но обижается */}
              <Dossier006FriendshipProtocol />
            </div>

          </div>
        </section>

        {/* Section 8: Досье №007 — Мессенджер 2–4 часа */}
        <Dossier007MessengerSimulator />

        {/* Secondary Dossiers Section: 008 & 009 */}
        <section className="py-12 md:py-16 px-4 md:px-8 border-b border-zinc-900 bg-black/40">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="border-b border-zinc-800 pb-4">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                ОПЕРАТИВНЫЕ СВОДКИ // ТОМА 008 — 009
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-wide uppercase mt-1">
                СПЕЦИАЛЬНЫЕ ОПЕРАЦИИ
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 008: Операция «Дурак» */}
              <Dossier008DurakTournament />

              {/* 009: Газовая служба Кайрата */}
              <Dossier009GasAlert />
            </div>
          </div>
        </section>

        {/* Section 11: Досье №010 — Операция «ЖК Заман» */}
        <Dossier010ZamanInvestigation />

        {/* Section 12: Главный босс — Кайрат */}
        <BossFightKairat />

        {/* Section 13: Секретная концовка — Где Кайрат? */}
        <SecretEnding />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-zinc-900 bg-black text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>KAIRAT.EXE // СЕКРЕТНЫЙ АРХИВ ДРУЗЕЙ 007</span>
          </div>

          <div className="text-center sm:text-left text-zinc-600">
            Все совпадения с реальным Кайратом не случайны, но созданы с любовью и уважением.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>НАВЕРХ</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
