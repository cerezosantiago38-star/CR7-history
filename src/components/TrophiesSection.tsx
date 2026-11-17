import React, { useState, useMemo } from 'react';
import { TROPHIES_LIST, TROPHY_SYNTHESIS } from '../data/trophiesData';
import { Trophy } from '../types';
import { Trophy as TrophyIcon, Search, Calendar, Shield, Quote, Sparkles, BookOpen, ChevronRight, X, ExternalLink } from 'lucide-react';

export const TrophiesSection: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTrophyModal, setActiveTrophyModal] = useState<Trophy | null>(null);
  const [isSynthesisExpanded, setIsSynthesisExpanded] = useState<boolean>(true);

  // Filtered trophies
  const filteredTrophies = useMemo(() => {
    return TROPHIES_LIST.filter(t => {
      const matchesClub = selectedClub === 'todos' || t.team.toLowerCase().includes(selectedClub.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || t.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.significance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.date.includes(searchQuery);
      return matchesClub && matchesCategory && matchesSearch;
    });
  }, [selectedClub, selectedCategory, searchQuery]);

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <TrophyIcon className="w-4 h-4 text-amber-400" />
          <span>Palmarés Histórico & Fechas Exactas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Los Trofeos de Cristiano Ronaldo: Gloria, Fechas & Significado Personal
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Consulta el registro cronológico oficial de cada campeonato, la fecha exacta de su conquista, el club con el que alzó la copa y las emotivas palabras con las que Cristiano definió lo que cada título significó para su vida y legado.
        </p>
      </div>

      {/* Hero Showcase Banner Image */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 mb-10 group">
        <img
          src="/src/assets/images/cr7_trophy_ballon_dor_1794329072715.jpg"
          alt="Exposición de trofeos de Cristiano Ronaldo: Champions League y Balón de Oro"
          className="w-full h-64 sm:h-80 object-cover object-center brightness-90 group-hover:scale-101 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
            <span>Museo CR7 Funchal & Sala de Trofeos</span>
            <span>·</span>
            <span>Récord Universal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white max-w-xl">
            Cinco Champions League, Cinco Balones de Oro y Más de 900 Goles
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
            «Los trofeos colectivos son la base; sin ellos, los individuales no existen. Cada medalla lleva el sudor de miles de horas en el gimnasio y sobre el césped.»
          </p>
        </div>
      </div>

      {/* RESULTADO CONCRETO Y SÍNTESIS LARGA (Requested by user) */}
      <div className="mb-12 rounded-2xl border border-amber-500/30 bg-linear-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {TROPHY_SYNTHESIS.title}
            </h3>
          </div>
          <button
            onClick={() => setIsSynthesisExpanded(!isSynthesisExpanded)}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            {isSynthesisExpanded ? 'Plegar análisis' : 'Desplegar análisis completo'}
          </button>
        </div>

        {/* Global Key Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">Títulos Colectivos</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-num text-amber-400 mt-0.5">
              {TROPHY_SYNTHESIS.totalCollectiveTrophies}
            </div>
            <span className="text-[11px] text-neutral-400">4 Países + Selección</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">UEFA Champions League</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-num text-blue-400 mt-0.5">
              {TROPHY_SYNTHESIS.totalChampionsLeague}
            </div>
            <span className="text-[11px] text-neutral-400">1 Man Utd + 4 Real Madrid</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">Balones de Oro</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-num text-amber-300 mt-0.5">
              {TROPHY_SYNTHESIS.totalBallonDor}
            </div>
            <span className="text-[11px] text-neutral-400">2008, 2013, 2014, 2016, 2017</span>
          </div>
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <span className="text-xs text-neutral-400">Botas de Oro Europeas</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono-num text-emerald-400 mt-0.5">
              {TROPHY_SYNTHESIS.totalGoldenBoots}
            </div>
            <span className="text-[11px] text-neutral-400">2008, 2011, 2014, 2015</span>
          </div>
        </div>

        {/* Detailed Long Synthesis Text */}
        {isSynthesisExpanded && (
          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-5">
            <p className="whitespace-pre-line">{TROPHY_SYNTHESIS.detailedAnalysisText}</p>

            {/* Distribution Breakdown per Team Table */}
            <div className="mt-5 pt-4 border-t border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Distribución de Títulos por Escuadra & Selección
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TROPHY_SYNTHESIS.breakdownByClub.map((b) => (
                  <div key={b.team} className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-white">{b.team}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{b.note}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-xs font-bold font-mono-num text-amber-400 shrink-0">
                      {b.titles} {b.titles === 1 ? 'título' : 'títulos'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Toolbar & Search */}
      <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por trofeo, equipo, fecha (ej. 2014, Champions)..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Club Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'todos', label: 'Todos los Equipos' },
            { id: 'Real Madrid', label: 'Real Madrid' },
            { id: 'Manchester', label: 'Man Utd' },
            { id: 'Portugal', label: 'Portugal' },
            { id: 'Juventus', label: 'Juventus' },
            { id: 'Al-Nassr', label: 'Al-Nassr' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedClub(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedClub === item.id
                  ? 'bg-amber-500 text-black font-bold shadow-xs'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trophy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrophies.map((trophy) => (
          <div
            key={trophy.id}
            onClick={() => setActiveTrophyModal(trophy)}
            className="group cursor-pointer rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-amber-500/50 hover:bg-neutral-900 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header with Exact Date & Club Tag */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2.5">
                <div className="flex items-center gap-1.5 font-mono text-amber-400 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{trophy.date}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-300">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{trophy.team}</span>
                </div>
              </div>

              {/* Trophy Name */}
              <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {trophy.name}
              </h4>

              {/* Match Context */}
              <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2">
                {trophy.scoreOrContext}
              </p>

              {/* What it meant to him (Significance preview) */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">
                  Significado para CR7:
                </span>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-3 leading-relaxed italic">
                  «{trophy.significance}»
                </p>
              </div>
            </div>

            {/* Read quote CTA */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-amber-400 group-hover:text-amber-300">
              <span className="flex items-center gap-1">
                <Quote className="w-3.5 h-3.5" />
                <span>Ver palabras de Cristiano</span>
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredTrophies.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/40">
          <p className="text-neutral-400 text-sm">No se encontraron trofeos con los filtros seleccionados.</p>
          <button
            onClick={() => { setSelectedClub('todos'); setSelectedCategory('todas'); setSearchQuery(''); }}
            className="mt-3 px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white rounded-lg"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Detail Modal for Selected Trophy */}
      {activeTrophyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            
            {/* Close button */}
            <button
              onClick={() => setActiveTrophyModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Día exacto: {activeTrophyModal.displayDate} ({activeTrophyModal.date})</span>
            </div>

            <h3 className="text-2xl font-black text-white">
              {activeTrophyModal.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-400 pb-4 border-b border-neutral-800">
              <span className="text-neutral-200 font-semibold">{activeTrophyModal.team}</span>
              <span>·</span>
              <span>Categoría: {activeTrophyModal.category}</span>
            </div>

            {/* Match details */}
            <div className="mt-5 space-y-4">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Contexto & Resultado de la Final
                </h5>
                <p className="text-sm text-neutral-200 mt-1 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  {activeTrophyModal.scoreOrContext}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  ¿Qué significó este trofeo para Cristiano Ronaldo?
                </h5>
                <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                  {activeTrophyModal.significance}
                </p>
              </div>

              {/* Direct quote */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                  <Quote className="w-4 h-4" />
                  <span>Declaración Directa de Cristiano Ronaldo</span>
                </div>
                <p className="text-sm italic text-neutral-100 font-serif-luxury leading-relaxed">
                  {activeTrophyModal.quote}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveTrophyModal(null)}
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
