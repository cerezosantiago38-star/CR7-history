import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950 mt-16 py-12 px-4 sm:px-6 text-neutral-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        <div>
          <span className="text-base font-extrabold text-white tracking-wider">
            CRISTIANO RONALDO · CR7
          </span>
          <p className="text-xs text-neutral-400 mt-1 max-w-md leading-relaxed">
            Homenaje enciclopédico e interactivo al máximo goleador en la historia del fútbol profesional: palmarés, simulador de faltas, vida de lujo y trivia con solucionario.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
          <button onClick={() => { onSelectTab('trofeos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
            Palmarés de Trofeos
          </button>
          <button onClick={() => { onSelectTab('juego'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
            Simulador de Gol
          </button>
          <button onClick={() => { onSelectTab('cronologia'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
            Cronología Luxury
          </button>
          <button onClick={() => { onSelectTab('trivia'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">
            Trivia ABC
          </button>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
        <span>© {new Date().getFullYear()} CR7 Legacy Interactive. Datos oficiales recopilados de UEFA, FIFA y France Football.</span>
        <span>«El talento sin trabajo duro no es nada.» — Cristiano Ronaldo</span>
      </div>
    </footer>
  );
};
