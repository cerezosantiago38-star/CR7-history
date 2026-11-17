import { LuxuryItem, TimelineEvent } from '../types';

export const LUXURY_ASSETS: LuxuryItem[] = [
  {
    id: "bugatti-centodieci",
    name: "Bugatti Centodieci (Edición Limitada 1 de 10)",
    category: "Superdeportivos",
    year: "2020",
    estimatedValue: "€10.000.000",
    description: "Una joya automotriz ultra exclusiva producida para conmemorar los 110 años de Bugatti. Solo existen diez unidades en todo el planeta y Cristiano adquirió la suya personalizada con su logo CR7 tras conquistar el Scudetto con la Juventus.",
    details: [
      "Motor W16 de 8.0 litros con 4 turbos y 1.600 Caballos de Fuerza",
      "Velocidad punta de 380 km/h y 0-100 km/h en 2.4 segundos",
      "Carrocería en fibra de carbono mate con detalles personalizados",
      "Placa interior grabada con el número conmemorativo y siglas CR7"
    ],
    image: "/src/assets/images/cr7_luxury_supercar_1794329073968.jpg"
  },
  {
    id: "gulfstream-jet",
    name: "Jet Privado Gulfstream G650ER",
    category: "Aviación & Yates",
    year: "2023",
    estimatedValue: "€65.000.000",
    description: "El avión ejecutivo insignia de máxima autonomía. Permite viajar de Riad a Madrid o Lisboa sin escalas a una velocidad cercana a la del sonido, equipado con suite privada con cama king size, baño con ducha y salón de reuniones.",
    details: [
      "Alcance intercontinental de hasta 13.890 km sin escalas",
      "Capacidad para 18 pasajeros en asientos ejecutivos de cuero cosidos a mano",
      "Conexión satelital Ka-band de alta velocidad y cocina gourmet para chef privado",
      "Presurización de cabina a baja altitud para evitar el cansancio del deportista"
    ],
    image: "/src/assets/images/cr7_luxury_private_jet_1794329075464.jpg"
  },
  {
    id: "jacob-watch",
    name: "Jacob & Co. Bugatti Chiron Tourbillon Esmeraldas & Diamantes",
    category: "Alta Relojería",
    year: "2022",
    estimatedValue: "€1.500.000",
    description: "Una pieza única de alta relojería creada especialmente por Jacob Arabo para Cristiano Ronaldo. La esfera alberga una réplica en miniatura del motor W16 de Bugatti en cristal de zafiro cuyos 16 pistones se mueven al accionar el pulsador.",
    details: [
      "Caja en titanio y oro blanco engastada con 232 diamantes talla baguette y 109 esmeraldas",
      "Calibre JCAM37 con tourbillon volante inclinado a 30 grados",
      "Indicador de reserva de marcha con el diseño del manómetro de combustible Bugatti",
      "Grabado especial en el zafiro trasero con la firma personal de Cristiano"
    ],
    image: "/src/assets/images/cr7_luxury_horology_1794329075115.jpg"
  },
  {
    id: "azimut-yacht",
    name: "Superyate Azimut Grande 27 Metri ('CG Mare')",
    category: "Aviación & Yates",
    year: "2020",
    estimatedValue: "€6.500.000",
    description: "Bautizado con las iniciales de Cristiano y Georgina ('CG'), este yate de lujo de 27 metros de eslora es el santuario de vacaciones de la familia en las aguas cristalinas de Mallorca, Cerdeña y la Costa Azul.",
    details: [
      "Diseñado por Stefano Righini con superestructura íntegra en fibra de carbono",
      "5 camarotes de ensueño con baños en suite y vestidores privados",
      "Solárium en flybridge con jacuzzi panorámico, bar y plataforma hidráulica de baño",
      "Motores gemelos MAN V12 de 1.900 CV cada uno para navegación de crucero a 28 nudos"
    ],
    image: "/src/assets/images/cr7_luxury_supercar_1794329073968.jpg"
  },
  {
    id: "pestana-hotels",
    name: "Cadena de Hoteles Boutique Pestana CR7 Lifestyle",
    category: "Mansiones & Hoteles",
    year: "2016-Presente",
    estimatedValue: "€100.000.000+",
    description: "Alianza hotelera de lujo entre Cristiano y Dionísio Pestana con hoteles premium en Gran Vía de Madrid, Baixa de Lisboa, Times Square en Nueva York, Funchal (Madeira) y Marrakech.",
    details: [
      "Hoteles dirigidos al viajero contemporáneo con diseño de autor y azoteas exclusivas",
      "Rooftops panorámicos con vistas 360°, coctelería de autor y piscinas infinitas",
      "Gimnasios equipados con la rutina física y biométrica diseñada por Cristiano",
      "Valorado como uno de los negocios hoteleros más rentables fundados por un atleta"
    ],
    image: "/src/assets/images/cr7_trophy_ballon_dor_1794329072715.jpg"
  },
  {
    id: "cascais-mansion",
    name: "Supermansión Quinta da Marinha (Cascais, Portugal)",
    category: "Mansiones & Hoteles",
    year: "2023-2025",
    estimatedValue: "€22.000.000",
    description: "La residencia privada más costosa construida en la historia de Portugal. Ubicada en la Riviera portuguesa de Cascais, cuenta con piscina de cristal suspendida, suite principal de 300 m² y garaje subterráneo para 20 bólidos.",
    details: [
      "Terreno de más de 10.000 m² a orillas del Océano Atlántico",
      "Piscina climatizada interior de mármol italiano y piscina exterior con pasarela submarina",
      "Griferías en oro macizo, mármoles de Carrara importados y cristales blindados inteligentes",
      "Pista de tenis privada, campo de fútbol 7 con césped FIFA y helipuerto propio"
    ],
    image: "/src/assets/images/cr7_luxury_supercar_1794329073968.jpg"
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: 1985,
    dateStr: "5 de Febrero de 1985",
    title: "Nacimiento en la Humildad de Madeira",
    phase: "Orígenes en Madeira",
    description: "Nace en Santo António, Funchal (Isla de Madeira), el menor de cuatro hermanos de una familia muy humilde. Su padre Dinis era utilero del Andorinha y jardinero; su madre Dolores limpiaba casas. Su nombre 'Ronaldo' fue en homenaje a Ronald Reagan.",
    keyAchievement: "Da sus primeras patadas en el CF Andorinha y luego en el CD Nacional de Madeira."
  },
  {
    year: 1997,
    dateStr: "Agosto de 1997",
    title: "El Viaje Solitario a Lisboa (Academia Sporting)",
    phase: "Lisboa & Manchester",
    description: "Con tan solo 12 años, cruza el océano Atlántico solo y con lágrimas en los ojos para internarse en la pensión del Sporting Clube de Portugal. Soportó burlas por su acento de la isla, lo que forjó su mentalidad de acero: 'Trabajaré el doble que cualquiera para que nadie vuelva a reírse'.",
    keyAchievement: "Asciende por todas las categorías juveniles en tiempo récord hasta debutar en primera."
  },
  {
    year: 2003,
    dateStr: "6 de Agosto de 2003",
    title: "El Partido que Asombró a Sir Alex Ferguson",
    phase: "Lisboa & Manchester",
    description: "Inauguración del Estádio José Alvalade: Sporting CP 3 - 1 Manchester United. Cristiano, con 18 años, desquició a John O'Shea y Gary Neville con sus regates. En el vestuario tras el pitido final, los jugadores del United rogaron a Sir Alex que no salieran de Lisboa sin ficharlo.",
    keyAchievement: "Fichaje por el Manchester United por £12.24 millones, el juvenil más caro de Inglaterra."
  },
  {
    year: 2008,
    dateStr: "2008",
    title: "La Conquista de Europa y Primer Ferrari",
    phase: "Lisboa & Manchester",
    description: "Temporada de ensueño con 42 goles en el Manchester United: campeón de Champions League en Moscú y Premier League. Se corona con su primer Balón de Oro y adquiere sus primeros deportivos de alta gama, entre ellos el Ferrari 599 GTB Fiorano.",
    luxuryHighlight: "Inicio de su mítica colección de superdeportivos en Cheshire, Manchester.",
    keyAchievement: "Primer Balón de Oro, Bota de Oro europea y Champions League con el United."
  },
  {
    year: 2009,
    dateStr: "6 de Julio de 2009",
    title: "Presentación Galáctica en el Santiago Bernabéu",
    phase: "La Gloria en Madrid",
    description: "Presentado ante 85.000 aficionados en un Santiago Bernabéu a rebosar (récord mundial absoluto de asistencia para una presentación deportiva). Adquiere su icónica mansión en la exclusiva urbanización La Finca de Pozuelo de Alarcón (€7.5M), diseñada por Joaquín Torres.",
    luxuryHighlight: "Mansión de 4.000 m² en La Finca con garaje climatizado y helipuerto.",
    keyAchievement: "Fichaje récord histórico de 94 millones de euros al Real Madrid."
  },
  {
    year: 2014,
    dateStr: "24 de Mayo de 2014",
    title: "La Décima y la Llegada del Bugatti Veyron",
    phase: "La Gloria en Madrid",
    description: "Récord estratosférico de 17 goles en la Champions League para levantar La Décima en Lisboa. Se corona con su segundo Balón de Oro consecutivo (tercero global) y añade a su garaje el Bugatti Veyron Grand Sport Vitesse de 1.200 CV.",
    luxuryHighlight: "Adquisición del Bugatti Veyron y de su primer jet privado Gulfstream G200.",
    keyAchievement: "Máximo goleador histórico en una sola edición de Champions League (17 goles)."
  },
  {
    year: 2016,
    dateStr: "10 de Julio de 2016",
    title: "Gloria Eterna con Portugal y Hoteles Pestana CR7",
    phase: "La Gloria en Madrid",
    description: "Campeón de la Eurocopa 2016 en París, el primer título mayor de la historia de Portugal. Ese mismo verano inaugura el primer hotel de su cadena Pestana CR7 en su natal Funchal y en Lisboa, junto a su propio museo oficial.",
    luxuryHighlight: "Lanzamiento global del imperio Pestana CR7 y compra del Bugatti Chiron.",
    keyAchievement: "Eurocopa 2016 + Champions League 2016 + Cuarto Balón de Oro."
  },
  {
    year: 2018,
    dateStr: "2018",
    title: "Tres Champions Consecutivas y Mudanza a Turín",
    phase: "Turín & Regreso",
    description: "Conquista su quinta Champions League (la tercera consecutiva del Madrid) en Kiev tras marcar el legendario gol de chilena en Turín. En verano protagoniza el fichaje del siglo en Italia al unirse a la Juventus por €117M, instalándose en una majestuosa villa doble en las colinas de Turín.",
    luxuryHighlight: "Villa colosal en la colina de San Vito, Turín, con dos villas independientes rodeadas de pinos.",
    keyAchievement: "Quinta Champions League y máximo goleador histórico del Real Madrid (450 goles)."
  },
  {
    year: 2020,
    dateStr: "2020",
    title: "El Centodieci de €10M y el Superyate 'CG Mare'",
    phase: "Turín & Regreso",
    description: "Conquista su segundo Scudetto italiano consecutivo. Para celebrar el récord de títulos, encarga el ultra exclusivo Bugatti Centodieci (€10M) y bota el superyate Azimut Grande 27 Metri bautizado como 'CG Mare' con el que pasa las vacaciones en el Mediterráneo junto a Georgina.",
    luxuryHighlight: "Bugatti Centodieci (1 de 10 en el mundo) y superyate Azimut de 27 metros.",
    keyAchievement: "Bicampeón de Serie A con 31 goles ligueros a sus 35 años."
  },
  {
    year: 2023,
    dateStr: "Enero de 2023",
    title: "La Revolución de Arabia Saudita y el Gulfstream G650ER",
    phase: "Riad & Leyenda Global",
    description: "Firma el contrato deportivo más lucrativo de todos los tiempos con Al-Nassr FC de Riad (€200M anuales). Se hospeda inicialmente en la 'Kingdom Suite' de dos plantas y 17 habitaciones en el rascacielos Kingdom Centre antes de instalarse en un palacio de lujo en Al-Muhammadiyah.",
    luxuryHighlight: "Suite presidencial de 17 habitaciones en Kingdom Tower y adquisición del Gulfstream G650ER (€65M).",
    keyAchievement: "Lidera la transformación del fútbol saudí ganando la Arab Club Champions Cup."
  },
  {
    year: 2025,
    dateStr: "2025 - Presente",
    title: "Hito Histórico: +900 Goles y el Palacio de Cascais",
    phase: "Riad & Leyenda Global",
    description: "Supera la barrera de los 900 goles oficiales en su carrera profesional, consolidándose en el Libro Guinness como el mayor goleador en toda la historia de la humanidad. Culmina la construcción de su superresidencia de Quinta da Marinha (€22M) en Portugal y añade a su colección el Ferrari Daytona SP3.",
    luxuryHighlight: "Supermansión Quinta da Marinha en Cascais con piscina suspendida y Ferrari Daytona SP3.",
    keyAchievement: "Primer futbolista en la historia en alcanzar más de 900 goles oficiales reconocidos por FIFA."
  }
];
