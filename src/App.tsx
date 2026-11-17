/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { TrophiesSection } from './components/TrophiesSection';
import { GameSection } from './components/GameSection';
import { TimelineLuxurySection } from './components/TimelineLuxurySection';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';
import { Trophy, Gamepad2, Sparkles, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('trofeos');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Bar following contract */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        
        {/* Quick Section Switcher Bar */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-neutral-900/80 rounded-2xl border border-neutral-800">
            <button
              onClick={() => setCurrentTab('trofeos')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'trofeos'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Trophy className="w-4 h-4 shrink-0" />
              <span>Trofeos & Palmarés</span>
            </button>

            <button
              onClick={() => setCurrentTab('juego')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'juego'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4 shrink-0" />
              <span>Juego de Tiros CR7</span>
            </button>

            <button
              onClick={() => setCurrentTab('cronologia')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'cronologia'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Cronología Luxury</span>
            </button>

            <button
              onClick={() => setCurrentTab('trivia')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'trivia'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Trivia ABC</span>
            </button>
          </div>
        </div>

        {/* Dynamic section rendering */}
        <div className="transition-opacity duration-300">
          {currentTab === 'trofeos' && <TrophiesSection />}
          {currentTab === 'juego' && <GameSection />}
          {currentTab === 'cronologia' && <TimelineLuxurySection />}
          {currentTab === 'trivia' && <QuizSection />}
        </div>

      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}
