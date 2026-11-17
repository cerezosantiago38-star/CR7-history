export type TabType = 'trofeos' | 'juego' | 'cronologia' | 'trivia';

export interface Trophy {
  id: string;
  name: string;
  shortName: string;
  date: string; // Exact format: DD/MM/AAAA
  displayDate: string; // e.g. "24 de Mayo de 2014"
  team: 'Sporting CP' | 'Manchester United' | 'Real Madrid' | 'Juventus' | 'Portugal' | 'Al-Nassr';
  teamBadgeColor: string;
  category: 'Champions' | 'Liga' | 'Copa' | 'Internacional Selección' | 'Mundial de Clubes / Supercopa' | 'Balón de Oro / Bota de Oro';
  isIndividual?: boolean;
  scoreOrContext: string;
  significance: string; // What it meant to him
  quote: string; // Quote from Cristiano
  iconType: 'champions' | 'ballon' | 'league' | 'cup' | 'globe' | 'euro';
}

export interface LuxuryItem {
  id: string;
  name: string;
  category: 'Superdeportivos' | 'Alta Relojería' | 'Mansiones & Hoteles' | 'Aviación & Yates';
  year: string;
  estimatedValue: string;
  description: string;
  details: string[];
  image: string;
}

export interface TimelineEvent {
  year: number;
  dateStr?: string;
  title: string;
  phase: 'Orígenes en Madeira' | 'Lisboa & Manchester' | 'La Gloria en Madrid' | 'Turín & Regreso' | 'Riad & Leyenda Global';
  description: string;
  luxuryHighlight?: string;
  keyAchievement: string;
  image?: string;
  luxuryAssetRef?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctLetter: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil' | 'Experto CR7';
}
