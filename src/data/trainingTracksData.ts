export interface CollaboratorProgress {
  id: string;
  name: string;
  isExpert?: boolean;
  roleDescription?: string;
  completionPct: number;
  approvedCount: number;
  totalCount: number;
  status: 'verde' | 'amarelo' | 'vermelho';
  sector: string;
  manager: string;
  directorate?: string;
}

export interface ManagerTrackProgress {
  managerName: string;
  studentsCount: number;
  zeradosCount: number;
  averagePct: number;
}

export interface ModuleTrackProgress {
  id: string;
  name: string;
  shortName: string;
  approvalPct: number;
  approvedCount: number;
  totalStudents: number;
}

export interface TeamMember {
  id: string;
  name: string;
  isExpert?: boolean;
  department: string;
  approved: number;
  total: number;
  pct: number;
}

export interface DirectorateManager {
  managerName: string;
  colabsCount: number;
  pct: number;
  approvedCount: number;
  totalCount: number;
  members: TeamMember[];
}

export interface DirectorateNode {
  id: string;
  name: string;
  colabsCount: number;
  pct: number;
  approvedCount: number;
  totalCount: number;
  warningText?: string;
  managers: DirectorateManager[];
}

// 1. Visão Geral - Conclusão por Diretoria (Estrutura Drilldown)
export const directorateData: DirectorateNode = {
  id: 'sem-vinculo',
  name: 'SEM VÍNCULO NO ORGANOGRAMA',
  colabsCount: 235,
  pct: 8,
  approvedCount: 54,
  totalCount: 705,
  warningText: '235 pessoas não foram localizadas no organograma',
  managers: [
    {
      managerName: 'RODRIGO ALVES DE SOUZA',
      colabsCount: 2,
      pct: 0,
      approvedCount: 0,
      totalCount: 6,
      members: [
        {
          id: 'm-1',
          name: 'Icaro Michel Wares',
          isExpert: true,
          department: 'Ger.Prod.Frete',
          approved: 0,
          total: 3,
          pct: 0,
        },
        {
          id: 'm-2',
          name: 'Vagner de Moraes',
          isExpert: true,
          department: 'Ger.Frete',
          approved: 0,
          total: 3,
          pct: 0,
        },
      ],
    },
    {
      managerName: 'DIRETO COM O DIRETOR',
      colabsCount: 233,
      pct: 8,
      approvedCount: 54,
      totalCount: 699,
      members: [
        {
          id: 'm-3',
          name: 'Ednilson Scopel',
          isExpert: true,
          department: 'PROJETOS NDD FRETE',
          approved: 3,
          total: 3,
          pct: 100,
        },
        {
          id: 'm-4',
          name: 'Flavia Roberta Nascimento Morgenstern',
          isExpert: true,
          department: 'GER.SUPORTE FISCAL',
          approved: 3,
          total: 3,
          pct: 100,
        },
        {
          id: 'm-5',
          name: 'Mayara Da Silva Coelho',
          isExpert: false,
          department: 'Implantacao Nigeria',
          approved: 3,
          total: 3,
          pct: 100,
        },
        {
          id: 'm-6',
          name: 'Moises Soeira',
          isExpert: true,
          department: 'COORD.MIGRACOES...',
          approved: 3,
          total: 3,
          pct: 100,
        },
        {
          id: 'm-7',
          name: 'Alessandra Aparecida Mello Munaretti',
          isExpert: false,
          department: 'Suporte.i-docs I',
          approved: 2,
          total: 3,
          pct: 66.7,
        },
        {
          id: 'm-8',
          name: 'Carla Kayser Carvalho',
          isExpert: true,
          department: 'Coord.Prod.Doc.E',
          approved: 2,
          total: 3,
          pct: 66.7,
        },
        {
          id: 'm-9',
          name: 'Erick Willian Pinheiro',
          isExpert: false,
          department: 'Suporte.i-docs I',
          approved: 2,
          total: 3,
          pct: 66.7,
        },
        {
          id: 'm-10',
          name: 'Giliane Viecinski',
          isExpert: false,
          department: 'Suporte Cs Nigeria',
          approved: 2,
          total: 3,
          pct: 66.7,
        },
        {
          id: 'm-11',
          name: 'Giovana Stimpel Amaral',
          isExpert: false,
          department: 'GC FISCAL',
          approved: 2,
          total: 3,
          pct: 66.7,
        },
      ],
    },
  ],
};

// 2. Colaboradores (Tela 2) - Lista de 235 participantes
export const allCollaboratorsList: CollaboratorProgress[] = [
  // 100% Verde (4 pessoas)
  {
    id: 'colab-1',
    name: 'Ednilson Scopel - Expert',
    completionPct: 100,
    approvedCount: 3,
    totalCount: 3,
    status: 'verde',
    sector: 'PROJETOS NDD FRETE',
    manager: 'Olinto Vertuoso',
  },
  {
    id: 'colab-2',
    name: 'Flavia Roberta Nascimento Morgenstern - Expert',
    completionPct: 100,
    approvedCount: 3,
    totalCount: 3,
    status: 'verde',
    sector: 'GER.SUPORTE FISCAL',
    manager: 'Paulo Pereira',
  },
  {
    id: 'colab-3',
    name: 'Mayara Da Silva Coelho',
    completionPct: 100,
    approvedCount: 3,
    totalCount: 3,
    status: 'verde',
    sector: 'Implantacao Nigeria',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-4',
    name: 'Moises Soeira - Expert',
    completionPct: 100,
    approvedCount: 3,
    totalCount: 3,
    status: 'verde',
    sector: 'COORD.MIGRACOES...',
    manager: 'Ricardo Vieira',
  },

  // 66.7% Amarelo (20 pessoas)
  {
    id: 'colab-5',
    name: 'Alessandra Aparecida Mello Munaretti',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Suporte.i-docs I',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-6',
    name: 'Carla Kayser Carvalho - Expert',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Coord.Prod.Doc.E',
    manager: 'Thiago Comel',
  },
  {
    id: 'colab-7',
    name: 'Erick Willian Pinheiro',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Suporte.i-docs I',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-8',
    name: 'Giliane Viecinski',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Suporte Cs Nigeria',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-9',
    name: 'Giovana Stimpel Amaral',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'GC FISCAL',
    manager: 'Thiago Comel',
  },
  {
    id: 'colab-10',
    name: 'Guilherme Silva Arruda - Expert',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Dev Team Alpha',
    manager: 'Alik Votisch',
  },
  {
    id: 'colab-11',
    name: 'Helena Beatriz de Souza',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Suporte.i-docs II',
    manager: 'Paulo Pereira',
  },
  {
    id: 'colab-12',
    name: 'Igor Ferreira Mendes',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'PROJETOS NDD FRETE',
    manager: 'Olinto Vertuoso',
  },
  {
    id: 'colab-13',
    name: 'Juliana Castro Nogueira',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'QA Automation',
    manager: 'Jackson Cenci',
  },
  {
    id: 'colab-14',
    name: 'Katia Regina Fagundes',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Implantacao Fiscal',
    manager: 'Thiago Comel',
  },
  {
    id: 'colab-15',
    name: 'Leonardo Antunes Ramos',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Coord.Prod.Doc.E',
    manager: 'Thiago Comel',
  },
  {
    id: 'colab-16',
    name: 'Marcos Vinicius Santos',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Core Platform',
    manager: 'Felipe Ramos',
  },
  {
    id: 'colab-17',
    name: 'Nathalia Cristina Rocha',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'GC FISCAL',
    manager: 'Thiago Comel',
  },
  {
    id: 'colab-18',
    name: 'Otavio Henrique Duarte',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'DevOps & Infra',
    manager: 'Ricardo Vieira',
  },
  {
    id: 'colab-19',
    name: 'Priscila Mara Goulart',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Suporte.i-docs I',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-20',
    name: 'Rafael Bittencourt - Expert',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Enterprise Solutions',
    manager: 'Paulo Pereira',
  },
  {
    id: 'colab-21',
    name: 'Sabrina Lopes Carvalho',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Implantacao Nigeria',
    manager: 'Flavia Morgenstern',
  },
  {
    id: 'colab-22',
    name: 'Tatiane Meireles Fontes',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'QA Automation',
    manager: 'Jackson Cenci',
  },
  {
    id: 'colab-23',
    name: 'Vinicius Toledo Pires',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'PROJETOS NDD FRETE',
    manager: 'Olinto Vertuoso',
  },
  {
    id: 'colab-24',
    name: 'Wagner Luiz Barcellos',
    completionPct: 66.7,
    approvedCount: 2,
    totalCount: 3,
    status: 'amarelo',
    sector: 'Core Platform',
    manager: 'Alik Votisch',
  },

  // 33.3% Vermelho (2 pessoas com 1 aprovado)
  {
    id: 'colab-25',
    name: 'Bruna Caroline Martins',
    completionPct: 33.3,
    approvedCount: 1,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Growth & Analytics',
    manager: 'Alik Votisch',
  },
  {
    id: 'colab-26',
    name: 'Eduardo Felipe Schneider',
    completionPct: 33.3,
    approvedCount: 1,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Growth & Analytics',
    manager: 'Alik Votisch',
  },

  // Zerados (0% - 209 pessoas)
  {
    id: 'colab-27',
    name: 'Icaro Michel Wares - Expert',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Ger.Prod.Frete',
    manager: 'Rodrigo Souza',
  },
  {
    id: 'colab-28',
    name: 'Vagner de Moraes - Expert',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Ger.Frete',
    manager: 'Rodrigo Souza',
  },
  {
    id: 'colab-29',
    name: 'Alan Turing Martins',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'DevOps & Infra',
    manager: 'Saulo Varela',
  },
  {
    id: 'colab-30',
    name: 'Beatriz Vasconcelos',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Suporte Fiscal',
    manager: 'Saulo Varela',
  },
  {
    id: 'colab-31',
    name: 'Carlos Alberto Schneider',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Core Platform',
    manager: 'Michael Santos',
  },
  {
    id: 'colab-32',
    name: 'Daniela Cristina Paiva',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Enterprise Solutions',
    manager: 'Valmir Tortelli',
  },
  {
    id: 'colab-33',
    name: 'Emerson Farias Prado',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Enterprise Solutions',
    manager: 'Valmir Tortelli',
  },
  {
    id: 'colab-34',
    name: 'Fernanda Lima Gusmao',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'QA Automation',
    manager: 'Jackson Cenci',
  },
  {
    id: 'colab-35',
    name: 'Gustavo Henrique Alencar',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Dev Team Beta',
    manager: 'Michael Santos',
  },
  {
    id: 'colab-36',
    name: 'Hugo Leonardo Rezende',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Dev Team Alpha',
    manager: 'Michael Santos',
  },
  {
    id: 'colab-37',
    name: 'Isabela Fontes Guimaraes',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Implantacao Nigeria',
    manager: 'Vagner Moraes',
  },
  {
    id: 'colab-38',
    name: 'Joao Paulo Siqueira',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'GC FISCAL',
    manager: 'Vagner Moraes',
  },
  {
    id: 'colab-39',
    name: 'Larissa Andrade Valente',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Suporte.i-docs II',
    manager: 'Saulo Varela',
  },
  {
    id: 'colab-40',
    name: 'Matheus Felipe Zanin',
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Coord.Prod.Doc.E',
    manager: 'Saulo Varela',
  },
];

// Helper to fill up the remaining zerados up to 235 items total
for (let i = 41; i <= 235; i++) {
  const managersPool = [
    'Saulo Varela',
    'Michael Santos',
    'Valmir Tortelli',
    'Felipe Ramos',
    'Vagner Moraes',
    'Jackson Cenci',
    'Ricardo Vieira',
  ];
  const mgr = managersPool[i % managersPool.length];
  allCollaboratorsList.push({
    id: `colab-${i}`,
    name: `Colaborador Participante ${i}`,
    completionPct: 0,
    approvedCount: 0,
    totalCount: 3,
    status: 'vermelho',
    sector: 'Operações e Desenvolvimento',
    manager: mgr,
  });
}

// 3. Acompanhamento Por Gestor (Tela 3)
export const managerTrackData: ManagerTrackProgress[] = [
  { managerName: 'Paulo Pereira', studentsCount: 3, zeradosCount: 1, averagePct: 55.6 },
  { managerName: 'Olinto Vertuoso', studentsCount: 4, zeradosCount: 3, averagePct: 25.0 },
  { managerName: 'Alik Votisch', studentsCount: 8, zeradosCount: 5, averagePct: 25.0 },
  { managerName: 'Thiago Comel', studentsCount: 11, zeradosCount: 7, averagePct: 21.2 },
  { managerName: 'Jackson Cenci', studentsCount: 12, zeradosCount: 9, averagePct: 16.7 },
  { managerName: 'Ricardo Vieira', studentsCount: 10, zeradosCount: 8, averagePct: 11.9 },
  { managerName: 'Michael Santos', studentsCount: 18, zeradosCount: 16, averagePct: 5.6 },
  { managerName: 'Felipe Ramos', studentsCount: 20, zeradosCount: 19, averagePct: 3.5 },
  { managerName: 'Saulo Varela', studentsCount: 22, zeradosCount: 21, averagePct: 1.2 },
  { managerName: 'Valmir Tortelli', studentsCount: 15, zeradosCount: 15, averagePct: 0.0 },
  { managerName: 'Rodrigo Souza', studentsCount: 2, zeradosCount: 2, averagePct: 0.0 },
  { managerName: 'Vagner Moraes', studentsCount: 10, zeradosCount: 10, averagePct: 0.0 },
];

// 4. Trilhas & Módulos (Tela 4)
export const moduleTrackData: ModuleTrackProgress[] = [
  {
    id: 'mod-1',
    name: '2ª Temporada - Reforma Tributária Episódio 2: Impactos Operacionais',
    shortName: '2ª Temporada - Reforma Tributária Episódio 2: I...',
    approvalPct: 10.6,
    approvedCount: 25,
    totalStudents: 235,
  },
  {
    id: 'mod-2',
    name: 'Reforma Tributária - 2ª Temporada (Visão Integrada)',
    shortName: 'Reforma Tributária - 2ª Temporada',
    approvalPct: 10.2,
    approvedCount: 24,
    totalStudents: 235,
  },
  {
    id: 'mod-3',
    name: '2ª Temporada - Reforma Tributária Episódio 3: Gestão e Adequação',
    shortName: '2ª Temporada - Reforma Tributária Episódio 3: Ge...',
    approvalPct: 2.1,
    approvedCount: 5,
    totalStudents: 235,
  },
];
