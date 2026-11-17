import React from 'react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-16">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('trofeos')}
          className="text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          CR7 LEGACY
        </button>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-neutral-400">
          <button
            onClick={() => onSelectTab('trofeos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'trofeos'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Trofeos
          </button>

          <button
            onClick={() => onSelectTab('juego')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'juego'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Juego CR7
          </button>

          <button
            onClick={() => onSelectTab('cronologia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'cronologia'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Cronología Luxury
          </button>

          <button
            onClick={() => onSelectTab('trivia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'trivia'
                ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                : 'hover:text-white'
            }`}
          >
            Trivia ABC
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => onSelectTab(currentTab === 'juego' ? 'trofeos' : 'juego')}
            className="px-4 py-2 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {currentTab === 'juego' ? 'Ver Trofeos' : 'Tiro al Gol'}
          </button>
        </div>

      </div>
    </header>
  );
};
