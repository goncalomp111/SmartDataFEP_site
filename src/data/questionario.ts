/**
 * Questionário "Descobre o teu Departamento" — SmartData FEP
 *
 * Este ficheiro concentra tudo o que define o questionário: departamentos,
 * escalas de resposta, perguntas e lógica de pontuação. A interface
 * (QuestionarioWizard.astro) apenas consome o que está aqui, por isso
 * acrescentar ou reformular perguntas não obriga a mexer no HTML.
 *
 * ---------------------------------------------------------------------------
 * COMO FUNCIONA A PONTUAÇÃO
 * ---------------------------------------------------------------------------
 * Cada resposta vale de 1 a 5. Esse valor é convertido para uma escala
 * simétrica de -1 a +1:
 *
 *     1 -> -1.0   2 -> -0.5   3 -> 0   4 -> +0.5   5 -> +1.0
 *
 * Cada pergunta atribui pesos a um ou mais departamentos. O peso é
 * multiplicado pelo valor normalizado e somado ao total do departamento.
 * Pesos negativos são intencionais: discordar de "prefiro números a imagens"
 * é um sinal positivo para Marketing.
 *
 * No fim, o total de cada departamento é dividido pelo máximo que esse
 * departamento poderia ter obtido (soma dos pesos em valor absoluto). Isto
 * garante que nenhum departamento fica em vantagem só por aparecer em mais
 * perguntas ou com pesos maiores.
 *
 * O resultado final é uma afinidade de 0 a 100, onde 50 significa
 * "respostas neutras".
 */

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type DepartamentoId =
  | 'marketing'
  | 'projetos'
  | 'formacao'
  | 'rh'
  | 'externas'
  | 'financeiro';

export type TracoId =
  | 'analise'
  | 'criatividade'
  | 'organizacao'
  | 'comunicacao'
  | 'lideranca'
  | 'detalhe'
  | 'pessoas'
  | 'iniciativa'
  | 'planeamento'
  | 'aprendizagem';

export type TipoEscala = 'concordancia' | 'frequencia' | 'conforto' | 'simNao';

export interface Departamento {
  id: DepartamentoId;
  nome: string;
  sigla: string;
  /** Frase curta que resume o departamento numa linha. */
  resumo: string;
  /** Descrição oficial, alinhada com a página da Equipa. */
  descricao: string;
  /** Explicação mostrada quando este departamento é recomendado. */
  porque: string;
  /** Âncora da secção correspondente em /equipa. */
  ancora: string;
}

export interface Pergunta {
  id: string;
  texto: string;
  escala: TipoEscala;
  /** Traços de perfil que a pergunta revela — usados no texto do resultado. */
  tracos: TracoId[];
  /** Peso da pergunta para cada departamento. Pode ser negativo. */
  pesos: Partial<Record<DepartamentoId, number>>;
}

export interface Resultado {
  /** Afinidades ordenadas da mais alta para a mais baixa. */
  ranking: Array<{ departamento: Departamento; afinidade: number }>;
  principal: Departamento;
  /** Preenchido apenas quando o segundo lugar está muito perto do primeiro. */
  secundario: Departamento | null;
  /** Os dois traços mais marcantes do perfil, por ordem. */
  tracosFortes: string[];
}

// ---------------------------------------------------------------------------
// Departamentos
// ---------------------------------------------------------------------------

export const DEPARTAMENTOS: Record<DepartamentoId, Departamento> = {
  marketing: {
    id: 'marketing',
    nome: 'Marketing',
    sigla: 'MK',
    resumo: 'Comunicação, identidade e conteúdos.',
    descricao:
      'O departamento de Marketing é responsável pela comunicação e imagem. Atua na definição da identidade da organização, na gestão dos canais digitais e na criação de conteúdos.',
    porque:
      'Pensas primeiro em como uma mensagem vai ser recebida, não apenas no que ela diz. Essa sensibilidade — juntar ideia, formato e público na mesma decisão — é exatamente o que o Marketing faz todos os dias, desde a linha de um post até à identidade da organização.',
    ancora: 'marketing',
  },
  projetos: {
    id: 'projetos',
    nome: 'Projetos e Análise de Dados',
    sigla: 'PAD',
    resumo: 'Dados, análise e soluções para clientes.',
    descricao:
      'Atua na análise, tratamento e interpretação de dados, transformando informação em soluções ajustadas às necessidades de cada desafio. Trabalha em estreita colaboração com clientes e parceiros.',
    porque:
      'Perante muita informação desorganizada, a tua reação é procurar estrutura e padrões em vez de fugir do problema. É essa paciência analítica, aliada à vontade de levar um projeto até ao fim, que transforma dados em respostas úteis para um cliente.',
    ancora: 'projetos-analise-dados',
  },
  formacao: {
    id: 'formacao',
    nome: 'Educação e Formação',
    sigla: 'EF',
    resumo: 'Workshops, sessões formativas e parcerias.',
    descricao:
      'Responsável pela organização e coordenação de iniciativas de formação internas e externas, de workshops, sessões formativas e parcerias.',
    porque:
      'Gostas de perceber um assunto e depois torná-lo claro para outra pessoa — e não te intimida fazê-lo em frente a um grupo. Somando isso à tua capacidade de planear com antecedência, tens o perfil de quem constrói uma formação que as pessoas saem a comentar.',
    ancora: 'educacao-formacao',
  },
  rh: {
    id: 'rh',
    nome: 'Recursos Humanos',
    sigla: 'RH',
    resumo: 'Pessoas, integração e ambiente de equipa.',
    descricao:
      'Desde o recrutamento e integração até ao desenvolvimento pessoal e profissional, o nosso foco está em criar um ambiente saudável, colaborativo e motivador.',
    porque:
      'Reparas nas pessoas antes de repares nas tarefas, e sentes recompensa genuína quando alguém cresce com a tua ajuda. É essa atenção ao lado humano que mantém uma equipa de dezenas de estudantes coesa e com vontade de voltar.',
    ancora: 'recursos-humanos',
  },
  externas: {
    id: 'externas',
    nome: 'Relações Externas',
    sigla: 'RE',
    resumo: 'Parcerias, representação e oportunidades.',
    descricao:
      'Atua no desenvolvimento de parcerias, na representação institucional e na criação de oportunidades de colaboração com entidades externas e outras organizações.',
    porque:
      'Iniciar uma conversa com quem não conheces não te custa, e não hesitas em pedir ou propor. Essa iniciativa é a matéria-prima das Relações Externas: quase todas as parcerias começam com alguém disposto a dar o primeiro passo.',
    ancora: 'relacoes-externas',
  },
  financeiro: {
    id: 'financeiro',
    nome: 'Financeiro',
    sigla: 'FIN',
    resumo: 'Planeamento, controlo e sustentabilidade.',
    descricao:
      'É responsável pelo planeamento, controlo financeiro e acompanhamento das atividades da organização, garantindo sustentabilidade e rigor em todas as decisões.',
    porque:
      'Reparas em incoerências que passam despercebidas e preferes um plano definido à improvisação. Esse rigor é o que permite à organização decidir com confiança — e é precisamente o que se procura em quem cuida das contas e do planeamento.',
    ancora: 'financeiro',
  },
};

export const ORDEM_DEPARTAMENTOS: DepartamentoId[] = [
  'marketing',
  'projetos',
  'formacao',
  'rh',
  'externas',
  'financeiro',
];

// ---------------------------------------------------------------------------
// Traços de perfil (usados apenas no texto do resultado)
// ---------------------------------------------------------------------------

export const TRACOS: Record<TracoId, string> = {
  analise: 'pensamento analítico',
  criatividade: 'criatividade',
  organizacao: 'organização',
  comunicacao: 'à-vontade na comunicação',
  lideranca: 'liderança natural',
  detalhe: 'atenção ao detalhe',
  pessoas: 'sensibilidade para as pessoas',
  iniciativa: 'iniciativa',
  planeamento: 'capacidade de planeamento',
  aprendizagem: 'vontade de aprender e ensinar',
};

// ---------------------------------------------------------------------------
// Escalas de resposta
// ---------------------------------------------------------------------------

export const ESCALAS: Record<TipoEscala, string[]> = {
  concordancia: [
    'Discordo totalmente',
    'Discordo',
    'Nem por isso',
    'Concordo',
    'Concordo totalmente',
  ],
  frequencia: ['Nunca', 'Raramente', 'Às vezes', 'Muitas vezes', 'Sempre'],
  conforto: [
    'Nada confortável',
    'Pouco confortável',
    'Indiferente',
    'Confortável',
    'Muito confortável',
  ],
  simNao: ['Não', 'Sim'],
};

/** Valor (1–5) de cada opção. Sim/Não usa os extremos da escala. */
export function valorDaOpcao(escala: TipoEscala, indice: number): number {
  return escala === 'simNao' ? (indice === 0 ? 1 : 5) : indice + 1;
}

/** Introdução mostrada acima de cada pergunta, consoante o tipo de escala. */
export const INSTRUCOES: Record<TipoEscala, string> = {
  concordancia: 'Até que ponto concordas?',
  frequencia: 'Com que frequência acontece?',
  conforto: 'Quão confortável te sentes?',
  simNao: 'Responde com sinceridade.',
};

// ---------------------------------------------------------------------------
// Perguntas
// ---------------------------------------------------------------------------

export const PERGUNTAS: Pergunta[] = [
  {
    id: 'q1',
    texto:
      'Quando recebo muita informação de uma vez, a minha primeira reação é organizá-la e procurar padrões.',
    escala: 'concordancia',
    tracos: ['analise', 'organizacao'],
    pesos: { projetos: 1.0, financeiro: 0.4 },
  },
  {
    id: 'q2',
    texto:
      'Reparo em pequenos erros ou incoerências que a maioria das pessoas deixa passar.',
    escala: 'concordancia',
    tracos: ['detalhe'],
    pesos: { financeiro: 1.0, projetos: 0.4, marketing: 0.3 },
  },
  {
    id: 'q3',
    texto: 'Num grupo onde não conheço ninguém, sou eu a puxar pela conversa.',
    escala: 'frequencia',
    tracos: ['comunicacao', 'iniciativa'],
    pesos: { externas: 1.1, rh: 0.5, marketing: 0.2 },
  },
  {
    id: 'q4',
    texto:
      'Prefiro ter um plano definido a resolver as coisas à medida que vão aparecendo.',
    escala: 'concordancia',
    tracos: ['planeamento', 'organizacao'],
    pesos: { financeiro: 0.7, formacao: 0.7, projetos: -0.2 },
  },
  {
    id: 'q5',
    texto: 'Apresentar um tema a uma sala com trinta pessoas.',
    escala: 'conforto',
    tracos: ['comunicacao'],
    pesos: { formacao: 1.0, externas: 0.5 },
  },
  {
    id: 'q6',
    texto:
      'Costumo pensar logo em como algo ficaria bem apresentado — cores, imagens, formato.',
    escala: 'concordancia',
    tracos: ['criatividade'],
    pesos: { marketing: 0.9, formacao: 0.3 },
  },
  {
    id: 'q7',
    texto:
      'As pessoas costumam procurar-me quando precisam de desabafar ou de resolver um desentendimento.',
    escala: 'concordancia',
    tracos: ['pessoas'],
    pesos: { rh: 1.1, externas: 0.2 },
  },
  {
    id: 'q8',
    texto:
      'Quando um trabalho de grupo está parado, sou eu a propor por onde começar.',
    escala: 'frequencia',
    tracos: ['lideranca', 'iniciativa'],
    pesos: { rh: 0.5, formacao: 0.5, externas: 0.4, projetos: 0.3 },
  },
  {
    id: 'q9',
    texto:
      'Sinto-me à vontade para pedir alguma coisa ou negociar condições com alguém que não conheço.',
    escala: 'concordancia',
    tracos: ['comunicacao', 'iniciativa'],
    pesos: { externas: 1.1 },
  },
  {
    id: 'q10',
    texto:
      'Entre trabalhar com números e tabelas ou com textos e imagens, prefiro claramente os números.',
    escala: 'concordancia',
    tracos: ['analise'],
    pesos: { financeiro: 0.9, projetos: 0.7, marketing: -0.7, rh: -0.5, formacao: -0.3 },
  },
  {
    id: 'q11',
    texto: 'Gosto de explicar aos outros aquilo que acabei de aprender.',
    escala: 'concordancia',
    tracos: ['aprendizagem', 'comunicacao'],
    pesos: { formacao: 1.1, rh: 0.4 },
  },
  {
    id: 'q12',
    texto:
      'Preocupo-me tanto com a forma como a mensagem chega às pessoas como com o seu conteúdo.',
    escala: 'concordancia',
    tracos: ['comunicacao', 'criatividade'],
    pesos: { marketing: 0.9, rh: 0.3, externas: 0.3 },
  },
  {
    id: 'q13',
    texto: 'Reviso o meu trabalho mais do que uma vez antes de o dar por terminado.',
    escala: 'frequencia',
    tracos: ['detalhe', 'organizacao'],
    pesos: { financeiro: 0.9, projetos: 0.4, marketing: 0.2 },
  },
  {
    id: 'q14',
    texto:
      'Prefiro problemas com uma resposta certa a desafios completamente em aberto.',
    escala: 'concordancia',
    tracos: ['analise'],
    pesos: { projetos: -0.3, financeiro: 0.8, marketing: -0.6, externas: -0.2, formacao: -0.3, rh: -0.3 },
  },
  {
    id: 'q15',
    texto:
      'Faz-me sentido acompanhar um projeto até ao fim, incluindo as partes menos entusiasmantes.',
    escala: 'concordancia',
    tracos: ['planeamento', 'organizacao'],
    pesos: { projetos: 0.8, financeiro: 0.5, formacao: 0.4 },
  },
  {
    id: 'q16',
    texto: 'Já organizaste um evento, workshop ou atividade para outras pessoas?',
    escala: 'simNao',
    tracos: ['organizacao', 'lideranca'],
    pesos: { formacao: 0.9, externas: 0.6, rh: 0.4 },
  },
  {
    id: 'q17',
    texto: 'Dá-me satisfação ver alguém a evoluir com a ajuda que lhe dei.',
    escala: 'concordancia',
    tracos: ['pessoas', 'aprendizagem'],
    pesos: { rh: 1.1, formacao: 0.6 },
  },
  {
    id: 'q18',
    texto:
      'Gosto de experimentar formatos e ideias novas, mesmo sem ter a certeza do resultado.',
    escala: 'concordancia',
    tracos: ['criatividade', 'iniciativa'],
    pesos: { marketing: 1.0, projetos: 0.3, externas: 0.3, financeiro: -0.4 },
  },
];

// ---------------------------------------------------------------------------
// Lógica de pontuação
// ---------------------------------------------------------------------------

/** Diferença máxima (em pontos de afinidade) para sugerir um segundo departamento. */
export const LIMIAR_EMPATE = 3;

/** Converte uma resposta de 1–5 para a escala simétrica -1 … +1. */
function normalizar(valor: number): number {
  return (valor - 3) / 2;
}

/**
 * Máximo teórico de cada departamento: a soma dos pesos em valor absoluto.
 * Calculado uma única vez, no arranque.
 */
const MAXIMOS: Record<DepartamentoId, number> = ORDEM_DEPARTAMENTOS.reduce(
  (acc, id) => {
    acc[id] = PERGUNTAS.reduce(
      (soma, pergunta) => soma + Math.abs(pergunta.pesos[id] ?? 0),
      0,
    );
    return acc;
  },
  {} as Record<DepartamentoId, number>,
);

/**
 * Calcula o resultado a partir das respostas.
 *
 * @param respostas Mapa de id da pergunta para o valor escolhido (1–5).
 */
export function calcularResultado(respostas: Record<string, number>): Resultado {
  const totais: Record<string, number> = {};
  const totaisTracos: Record<string, number> = {};

  for (const pergunta of PERGUNTAS) {
    const resposta = respostas[pergunta.id];
    if (resposta === undefined) continue;

    const valor = normalizar(resposta);

    for (const [departamento, peso] of Object.entries(pergunta.pesos)) {
      totais[departamento] = (totais[departamento] ?? 0) + valor * (peso as number);
    }

    // Só contam para o perfil as respostas acima do ponto neutro.
    if (valor > 0) {
      for (const traco of pergunta.tracos) {
        totaisTracos[traco] = (totaisTracos[traco] ?? 0) + valor;
      }
    }
  }

  const ranking = ORDEM_DEPARTAMENTOS.map((id) => {
    const maximo = MAXIMOS[id] || 1;
    const bruto = totais[id] ?? 0;
    // De [-max, +max] para [0, 100], com 50 no ponto neutro.
    const afinidade = Math.round(((bruto / maximo + 1) / 2) * 100);
    return {
      departamento: DEPARTAMENTOS[id],
      afinidade: Math.min(100, Math.max(0, afinidade)),
    };
  }).sort((a, b) => b.afinidade - a.afinidade);

  const secundario =
    ranking.length > 1 && ranking[0].afinidade - ranking[1].afinidade <= LIMIAR_EMPATE
      ? ranking[1].departamento
      : null;

  const tracosFortes = Object.entries(totaisTracos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([traco]) => TRACOS[traco as TracoId]);

  return {
    ranking,
    principal: ranking[0].departamento,
    secundario,
    tracosFortes,
  };
}

/** Frase que liga os traços mais fortes do perfil, para abrir o resultado. */
export function fraseDePerfil(tracos: string[]): string {
  if (tracos.length === 0) return 'O teu perfil é equilibrado entre várias áreas.';
  if (tracos.length === 1) return `Destacas-te sobretudo pela tua ${tracos[0]}.`;
  return `Destacas-te sobretudo pela tua ${tracos[0]} e pela tua ${tracos[1]}.`;
}