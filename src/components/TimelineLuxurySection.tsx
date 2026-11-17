import React, { useState } from 'react';
import { TIMELINE_EVENTS, LUXURY_ASSETS } from '../data/timelineLuxuryData';
import { LuxuryItem, TimelineEvent } from '../types';
import { Sparkles, Gem, Clock, Car, Plane, Home, Shield, ExternalLink, X, ChevronRight, Check } from 'lucide-react';

export const TimelineLuxurySection: React.FC = () => {
  const [subTab, setSubTab] = useState<'timeline' | 'luxury'>('timeline');
  const [selectedPhase, setSelectedPhase] = useState<string>('todas');
  const [selectedLuxuryCategory, setSelectedLuxuryCategory] = useState<string>('todas');
  const [activeAssetModal, setActiveAssetModal] = useState<LuxuryItem | null>(null);

  const filteredTimeline = TIMELINE_EVENTS.filter(event => {
    return selectedPhase === 'todas' || event.phase === selectedPhase;
  });

  const filteredLuxury = LUXURY_ASSETS.filter(item => {
    return selectedLuxuryCategory === 'todas' || item.category === selectedLuxuryCategory;
  });

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <Gem className="w-4 h-4 text-amber-400" />
          <span>Biografía & Vida de Lujo</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Cronología de Vida & Imperio Luxury de Cristiano Ronaldo
        </h2>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Desde las calles empedradas de Santo António en Madeira hasta convertirse en el primer futbolista milmillonario de la historia. Descubre su trayectoria año a año y su deslumbrante flota de hiperdeportivos Bugatti, alta relojería con esmeraldas, jets privados y superyates.
        </p>
      </div>

      {/* Hero Luxury Collage Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        
        {/* Card 1: Supercars Bugatti */}
        <div
          onClick={() => { setSubTab('luxury'); setSelectedLuxuryCategory('Superdeportivos'); }}
          className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer h-60 md:h-72"
        >
          <img
            src="/src/assets/images/cr7_luxury_supercar_1794329073968.jpg"
            alt="Flota de superdeportivos de Cristiano Ronaldo"
            className="w-full h-full object-cover brightness-85 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Garaje de +€25M
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Bugatti Centodieci & Hypercars
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2">
              Edición 1 de 10 en el mundo de €10M, Bugatti Chiron, Ferrari Daytona SP3 y Rolls-Royce.
            </p>
          </div>
        </div>

        {/* Card 2: Haute Horlogerie */}
        <div
          onClick={() => { setSubTab('luxury'); setSelectedLuxuryCategory('Alta Relojería'); }}
          className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer h-60 md:h-72"
        >
          <img
            src="/src/assets/images/cr7_luxury_horology_1794329075115.jpg"
            alt="Alta relojería y diamantes de Cristiano Ronaldo"
            className="w-full h-full object-cover brightness-85 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Alta Relojería Única
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Jacob & Co. Bugatti Chiron Tourbillon
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2">
              Engastado con 232 diamantes y 109 esmeraldas, con un motor W16 en miniatura de zafiro.
            </p>
          </div>
        </div>

        {/* Card 3: Private Aviation & Yacht */}
        <div
          onClick={() => { setSubTab('luxury'); setSelectedLuxuryCategory('Aviación & Yates'); }}
          className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer h-60 md:h-72"
        >
          <img
            src="/src/assets/images/cr7_luxury_private_jet_1794329075464.jpg"
            alt="Interior de jet privado y estilo de vida luxury de Cristiano"
            className="w-full h-full object-cover brightness-85 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
              Vuelos & Mares Privados
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              Gulfstream G650ER & Yate 'CG Mare'
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2">
              Jet intercontinental de €65M y superyate Azimut de 27 metros en el Mediterráneo.
            </p>
          </div>
        </div>

      </div>

      {/* Sub-navigation Switcher: Cronología vs Flota Luxury */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'timeline'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Línea de Tiempo Biográfica (1985 - 2026)
          </button>
          <button
            onClick={() => setSubTab('luxury')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              subTab === 'luxury'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            Colección de Lujos & Activos Millonarios
          </button>
        </div>

        {subTab === 'timeline' && (
          <span className="hidden sm:inline-block text-xs text-neutral-400">
            {filteredTimeline.length} Hitos Biográficos
          </span>
        )}
      </div>

      {/* SUB-VIEW 1: CRONOLOGÍA BIOGRÁFICA */}
      {subTab === 'timeline' && (
        <div>
          {/* Phase Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            {[
              { id: 'todas', label: 'Toda la Trayectoria' },
              { id: 'Orígenes en Madeira', label: '1985-1996 Madeira' },
              { id: 'Lisboa & Manchester', label: '1997-2008 Sporting & United' },
              { id: 'La Gloria en Madrid', label: '2009-2018 Real Madrid' },
              { id: 'Turín & Regreso', label: '2018-2022 Juventus & United' },
              { id: 'Riad & Leyenda Global', label: '2023-Presente Al-Nassr' },
            ].map(phase => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedPhase === phase.id
                    ? 'bg-neutral-200 text-black font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {phase.label}
              </button>
            ))}
          </div>

          {/* Timeline Vertical Track */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-800 space-y-10 my-4">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                
                {/* Year Marker on line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

                {/* Event Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 hover:border-neutral-700 hover:bg-neutral-900 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-black font-mono-num text-amber-400">
                        {item.year}
                      </span>
                      {item.dateStr && (
                        <span className="text-xs text-neutral-400 font-mono">
                          · {item.dateStr}
                        </span>
                      )}
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                      {item.phase}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key achievement pill */}
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span><strong className="text-neutral-200">Hito clave:</strong> {item.keyAchievement}</span>
                    </div>

                    {item.luxuryHighlight && (
                      <div className="flex items-center gap-1 text-amber-400 font-medium">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{item.luxuryHighlight}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: COLECCIÓN DE LUJOS & ACTIVOS */}
      {subTab === 'luxury' && (
        <div>
          {/* Luxury Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            {[
              { id: 'todas', label: 'Todos los Activos de Lujo' },
              { id: 'Superdeportivos', label: 'Superdeportivos Bugatti & Ferrari' },
              { id: 'Alta Relojería', label: 'Alta Relojería & Diamantes' },
              { id: 'Mansiones & Hoteles', label: 'Mansiones & Hoteles Pestana' },
              { id: 'Aviación & Yates', label: 'Jets Privados & Yates' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedLuxuryCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedLuxuryCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Luxury Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLuxury.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveAssetModal(item)}
                className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-xs border border-amber-500/30 text-xs font-bold font-mono-num text-amber-400">
                      {item.estimatedValue}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                      <span>{item.category}</span>
                      <span>·</span>
                      <span>{item.year}</span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h4>

                    <p className="text-xs text-neutral-300 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>Ver especificaciones y detalles</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Asset Detail Modal */}
      {activeAssetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            
            <button
              onClick={() => setActiveAssetModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-60 rounded-xl overflow-hidden mb-5">
              <img
                src={activeAssetModal.image}
                alt={activeAssetModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>{activeAssetModal.category} · Adquirido en {activeAssetModal.year}</span>
              <span className="text-base font-bold font-mono-num text-amber-400">{activeAssetModal.estimatedValue}</span>
            </div>

            <h3 className="text-2xl font-black text-white">
              {activeAssetModal.name}
            </h3>

            <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
              {activeAssetModal.description}
            </p>

            <div className="mt-5 pt-4 border-t border-neutral-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Especificaciones & Detalles Exclusivos
              </h5>
              <div className="space-y-2">
                {activeAssetModal.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveAssetModal(null)}
                className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg transition-colors"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
