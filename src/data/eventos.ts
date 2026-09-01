export interface Sessao {
  hora: string;
  titulo: string;
  orador?: string;
  empresa?: string;
  tipo: 'Keynote' | 'Painel' | 'Workshop' | 'Networking' | 'Mesa Redonda';
}

export interface DiaCronograma {
  dia: string;
  data: string;
  tema: string;
  sessoes: Sessao[];
}

export interface GrupoPanfleto {
  titulo: string;
  imagens: string[];
}

export interface Orador {
  nome: string;
  empresa: string;
  iniciais: string;
}

export interface Evento {
  id: string;
  ano: number;
  nome: string;
  subtitulo: string;
  dataTexto: string;
  local: string;
  corDestaque: string;
  logoUrl?: string; // Caminho para o logo do evento
  estado: 'proximo' | 'passado'; // Define qual botão é renderizado
  linkInscricao?: string; // Para quando o evento é 'proximo'
  linkRecap?: string; // Para quando o evento é 'passado' (Linktree, Drive, etc.)
  descricao: string;
  stats: {
    temas: number;
    oradores: string;
    dias: number;
  };
  temasCentrais?: string[];
  cronograma: DiaCronograma[];
  oradores: Orador[];
  parceiros: string[];
  panfletos: GrupoPanfleto[];
}

// Lista de eventos
// Eveto AI SUMMIT 2026

export const EVENTOS: Evento[] = [
  {
    id: 'ai-summit-2026',
    ano: 2026,
    nome: 'AI Summit 2026',
    subtitulo: 'Faculdade de Economia · Universidade do Porto',
    dataTexto: '14 & 15 de abril de 2026',
    local: 'Salão Nobre da FEP',
    corDestaque: 'from-[#2D1B4E] via-[#4A2D7A] to-[#6B3FA0]',
    logoUrl: '/eventos/aiSummit2526/Logo_AISUMMIT_fundobranco.png', // Guarda a imagem do logo aqui
    estado: 'passado', // 'proximo' é o estado default. Mudar para 'passado' quando terminar o evento
    linkInscricao: 'https://docs.google.com/forms/d/e/1FAIpQLScf398ydrxYg9ZKgWy_BGBFUO-f6cQp7j_ZGG0u2aKz-IUziQ/viewform',
    linkRecap: 'https://linktr.ee/aisummit_', // Linktree para quando passar a data do evento. Pode ser para Drive, YouTube, etc.
    descricao: 'Dois dias intensos com líderes da McKinsey, AWS, FC Porto e Millennium BCP.',
    stats: {
      temas: 6,
      oradores: '15+',
      dias: 2,
    },
    temasCentrais: [
      'Tema 1: Estratégia Corporativa & Consultoria',
      'Tema 2: Impacto na Economia Nacional',
      'Tema 3: Ética, Ensino & Sociedade',
      'Tema 4: IA no Desporto & Performance',
      'Tema 5: Gestão de Risco Bancário',
      'Tema 6: Mercado de Trabalho & Futuro Profissional',
    ],
    cronograma: [
      {
        dia: 'Dia 1',
        data: '14 de abril',
        tema: 'Estratégia, Economia e Risco',
        sessoes: [
          { hora: '10:30', titulo: 'A Nova Fronteira da Consultoria: IA e Estratégia Corporativa', orador: 'Fábio Neves', empresa: 'McKinsey & Company', tipo: 'Keynote' },
          { hora: '11:45', titulo: 'O Impacto Real da IA na Economia Portuguesa', orador: 'Pedro Gomes · Tiago Costa · Pedro Lopes-Sousa', empresa: 'TelePerformance Portugal · Sogrape · AWS', tipo: 'Painel' },
          { hora: '14:00', titulo: 'IA, Pedagogia e Ética: Repensar o Futuro do Ensino', orador: 'João Aguiar · Liliana Antão · Sónia Valente Rodrigues · Yarla Alvares · Diogo da Silva', empresa: 'Umain · Medtiles · U.Porto · U.Porto · Visionarium', tipo: 'Painel' },
          { hora: '16:00', titulo: 'IA Aplicada ao Negócio: Como Criar Soluções com Retorno', orador: 'Luís Noronha', empresa: 'DareData', tipo: 'Workshop' },
        ],
      },
      {
        dia: 'Dia 2',
        data: '15 de abril',
        tema: 'Rigor, Finanças e Futuro Profissional',
        sessoes: [
          { hora: '10:15', titulo: 'Inteligência Artificial: A Treinadora Invisível', orador: 'Pedro Avelar Dias', empresa: 'IBM', tipo: 'Keynote' },
          { hora: '11:30', titulo: 'IA, Dados e Performance Desportiva', orador: 'José Miguel do Carmo · Diogo Maia', empresa: 'FC Porto · Vitória SC', tipo: 'Mesa Redonda' },
          { hora: '14:30', titulo: 'O Papel da IA na Gestão de Risco na Banca', orador: 'José Miguel Pessanha', empresa: 'Millennium BCP', tipo: 'Keynote' },
          { hora: '16:00', titulo: 'Talento e Carreira: O Teu Perfil no Mercado', orador: 'Benedita Lucena · Telmo Teixeira', empresa: 'EY · BI4ALL', tipo: 'Painel' },
          { hora: '18:00', titulo: 'Wine & Networking — Porto de Honra Exclusivo', empresa: 'Limitado a 50 participantes', tipo: 'Networking' },
        ],
      },
    ],
    oradores: [
      { nome: 'Fábio Neves', empresa: 'McKinsey & Company', iniciais: 'FN' },
      { nome: 'Pedro Gomes', empresa: 'TelePerformance Portugal', iniciais: 'PG' },
      { nome: 'Tiago Costa', empresa: 'Sogrape', iniciais: 'TC' },
      { nome: 'Pedro Lopes-Sousa', empresa: 'AWS', iniciais: 'PLS' },
      { nome: 'Sónia Valente Rodrigues', empresa: 'Universidade do Porto', iniciais: 'SVR' },
      { nome: 'Yarla Alvares', empresa: 'Universidade do Porto', iniciais: 'YA' },
      { nome: 'Diogo da Silva', empresa: 'Visionarium', iniciais: 'DS' },
      { nome: 'João Aguiar', empresa: 'Umain', iniciais: 'JA' },
      { nome: 'Liliana Antão', empresa: 'Medtiles', iniciais: 'LA' },
      { nome: 'Luís Noronha', empresa: 'DareData', iniciais: 'LN' },
      { nome: 'Pedro Avelar Dias', empresa: 'IBM', iniciais: 'PAD' },
      { nome: 'José Miguel do Carmo', empresa: 'FC Porto', iniciais: 'JMC' },
      { nome: 'Diogo Maia', empresa: 'Vitória SC', iniciais: 'DM' },
      { nome: 'José Miguel Pessanha', empresa: 'Millennium BCP', iniciais: 'JP' },
      { nome: 'Benedita Lucena', empresa: 'EY', iniciais: 'BL' },
      { nome: 'Telmo Teixeira', empresa: 'BI4ALL', iniciais: 'TT' },    
    ],
    parceiros: ['Sogrape', 'EY', 'APBI', 'Kopke Group', 'Microsoft'],
    panfletos: [
      {
        titulo: 'Cronograma & Agenda',
        imagens: [
          '/eventos/aiSummit2526/aiSummitPapper1.jpg',
          '/eventos/aiSummit2526/aiSummitPapper7.jpg',
          '/eventos/aiSummit2526/aiSummitPapper8.jpg',
        ],
      },
      {
        titulo: 'Oradores - Dia 1',
        imagens: [
          '/eventos/aiSummit2526/aiSummitPapper3.jpg',
          '/eventos/aiSummit2526/aiSummitPapper4.jpg',
          '/eventos/aiSummit2526/aiSummitPapper5.jpg',
          '/eventos/aiSummit2526/aiSummitPapper6.jpg',
        ],
      },
      {
        titulo: 'Oradores - Dia 2',
        imagens: [
          '/eventos/aiSummit2526/aiSummitPapper9.jpg',
          '/eventos/aiSummit2526/aiSummitPapper10.jpg',
          '/eventos/aiSummit2526/aiSummitPapper11.jpg',
          '/eventos/aiSummit2526/aiSummitPapper12.jpg',
        ],
      },
      {
        titulo: 'Painel de Parceiros',
        imagens: [
          '/eventos/aiSummit2526/aiSummitPapper2.jpg',
        ],
      },
    ],
  },
];