export interface DiretorInfo {
  nome: string;
  cargo: string;
  fotoUrl?: string; // Caminho em /public 
}

export interface DepartamentoInfo {
  nome: string;
  sigla: string;
  descricao: string;
  ancora: string;
  diretor: DiretorInfo;
  dicasEntrevista: string[];
}

export const DEPARTAMENTOS_INFO: Record<string, DepartamentoInfo> = {
  'recursos-humanos': {
    nome: 'Recursos Humanos',
    sigla: 'RH',
    descricao: 'Gestão de talento, recrutamento, integração, acompanhamento contínuo e desenvolvimento da cultura interna da SmartData FEP.',
    ancora: 'recursos-humanos',
    diretor: {
      nome: 'Marta Martins',
      cargo: 'Diretora de Recursos Humanos',
      fotoUrl: '/assets/equipa/images/Marta Martins.jpg',
    },
    dicasEntrevista: [
      'Prepara exemplos práticos de como geres conflitos e promoves um bom ambiente de equipa.',
      'Demonstra empatia, capacidade de escuta ativa e interesse genuíno pelo desenvolvimento de pessoas.',
      'Reflete sobre o que torna a cultura da SmartData atrativa e como a comunicarias.',
    ],
  },
  'financeiro': {
    nome: 'Financeiro',
    sigla: 'FIN',
    descricao: 'Planeamento orçamental, gestão de tesouraria, controlo de custos e apoio financeiro às operações e eventos da organização.',
    ancora: 'financeiro',
    diretor: {
      nome: 'Catarina Magalhães',
      cargo: 'Diretora Financeira',
      fotoUrl: '/assets/equipa/images/Catarina Magalhães.jpg',
    },
    dicasEntrevista: [
      'Revê conceitos base de orçamentação, tesouraria e análise de viabilidade.',
      'Destaca a tua atenção ao detalhe, rigor numérico e organização pessoal.',
      'Pensa em formas práticas de otimizar custos nos eventos sem perder qualidade.',
    ],
  },
  'educacao-formacao': {
    nome: 'Educação & Formação',
    sigla: 'EF',
    descricao: 'Desenvolvimento e coordenação de workshops técnicos, sessões de formação em IA e partilha de conhecimento com a comunidade.',
    ancora: 'educacao-formacao',
    diretor: {
      nome: 'Filipa José',
      cargo: 'Diretora de Educação & Formação',
      fotoUrl: '/assets/equipa/images/Filipa José.jpg',
    },
    dicasEntrevista: [
      'Pensa em tópicos de tecnologia e dados que seriam interessantes para novos workshops.',
      'Demonstra facilidade em explicar conceitos técnicos de forma clara e acessível.',
      'Reflete sobre a tua própria experiência em aprendizagem contínua e partilha de conhecimento.',
    ],
  },
  'projetos-analise-dados': {
    nome: 'Projetos & Análise de Dados',
    sigla: 'PAD',
    descricao: 'Desenvolvimento prático de soluções analíticas, dashboards, modelos de Machine Learning e projetos com parceiros corporativos.',
    ancora: 'projetos-analise-dados',
    diretor: {
      nome: 'Sofia Lourosa',
      cargo: 'Diretora de Projetos & Análise de Dados',
      fotoUrl: '/assets/equipa/images/Sofia Lourosa.jpg',
    },
    dicasEntrevista: [
      'Prepara-te para falar sobre ferramentas analíticas que usas (Python, R, SQL, Power BI, Excel).',
      'Estrutura a tua abordagem: como partes de um problema de negócio até uma solução analítica.',
      'Traz curiosidade por novos modelos de IA e capacidade de resolução prática de problemas.',
    ],
  },
  'marketing': {
    nome: 'Marketing',
    sigla: 'MKT',
    descricao: 'Gestão da presença digital, criação de conteúdo para redes sociais, branding, design de materiais e comunicação institucional.',
    ancora: 'marketing',
    diretor: {
      nome: 'Sofia Tumanova',
      cargo: 'Diretora de Marketing',
      fotoUrl: '/assets/equipa/images/Sofia Tumanova.jpg',
    },
    dicasEntrevista: [
      'Traz ideias sobre como comunicar os eventos da SmartData de forma visual e apelativa.',
      'Reflete sobre as redes sociais que mais usas e como aumentar o engagement dos estudantes.',
      'Mostra familiaridade com ferramentas criativas (Canva, Figma, edição de vídeo/foto).',
    ],
  },
  'relacoes-externas': {
    nome: 'Relações Externas',
    sigla: 'RE',
    descricao: 'Contacto com empresas parceiras, atração de oradores de topo para eventos e desenvolvimento de pontes com o ecossistema empresarial.',
    ancora: 'relacoes-externas',
    diretor: {
      nome: 'Margarida Damas',
      cargo: 'Diretora de Relações Externas',
      fotoUrl: '/assets/equipa/images/Margarida Damas.jpg',
    },
    dicasEntrevista: [
      'Mostra facilidade na comunicação formal, postura profissional e capacidade de negociação.',
      'Pensa em empresas líderes de mercado que fariam sentido como parceiras da SmartData.',
      'Demonstra proatividade para contactar oradores e estabelecer pontes corporativas.',
    ],
  },
};