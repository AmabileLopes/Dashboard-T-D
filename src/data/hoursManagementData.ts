export interface MonthlyTrainingPoint {
  month: string;
  hoursPerMaker: number;
  isSupera?: boolean;
}

export interface CategoryHour {
  category: string;
  hours: number;
  percentage: number;
}

export interface VerticalTraining {
  vertical: string;
  hoursMaker: number;
  representativityPct: number;
}

export interface DistributionRange {
  range: string;
  count: number;
}

export interface DetailedMaker {
  id: string;
  name: string;
  manager: string;
  directorate: string;
  team: string;
  range: string;
  hours: number;
  coursesCount: number;
}

export interface HierarchicalMaker {
  id: string;
  name: string;
  hours: number;
  coursesCount: number;
}

export interface HierarchicalTeam {
  teamName: string;
  totalHours: number;
  totalCourses: number;
  makers: HierarchicalMaker[];
}

export interface HierarchicalManager {
  managerName: string;
  totalHours: number;
  totalCourses: number;
  teams: HierarchicalTeam[];
}

export interface HierarchicalVertical {
  verticalName: string;
  totalHours: number;
  totalCourses: number;
  managers: HierarchicalManager[];
}

// 1. Treinamento por Mês H/M (Hora Maker) - Jan a Set 2026
export const monthlyTrainingData: MonthlyTrainingPoint[] = [
  { month: 'Jan', hoursPerMaker: 0.99 },
  { month: 'Fev', hoursPerMaker: 1.13 },
  { month: 'Mar', hoursPerMaker: 1.17 },
  { month: 'Abr', hoursPerMaker: 1.26 },
  { month: 'Mai', hoursPerMaker: 1.45 },
  { month: 'Jun', hoursPerMaker: 1.08 },
  { month: 'Jul', hoursPerMaker: 3.25, isSupera: true },
  { month: 'Ago', hoursPerMaker: 1.06 },
  { month: 'Set', hoursPerMaker: 1.97 },
];

export const monthlyTargets = {
  supera: 3.0,
  atinge: 2.2,
  minimo: 2.0,
};

// 2. Hora Maker por Categoria
export const categoryHoursData: CategoryHour[] = [
  { category: 'Tech Skills', hours: 5240, percentage: 58.3 },
  { category: 'Produtos e Negócios Específicos NDD', hours: 2420, percentage: 26.9 },
  { category: 'Normativos e de Processos', hours: 1180, percentage: 13.1 },
  { category: 'Comportamentos e Soft Skills', hours: 780, percentage: 8.7 },
];

// 3. Treinamento por Vertical (Horas Maker vs Representatividade %)
export const verticalTrainingData: VerticalTraining[] = [
  { vertical: 'RAFAEL SARTOREI', hoursMaker: 19.6, representativityPct: 19.6 },
  { vertical: 'PAULO PEREIRA', hoursMaker: 13.6, representativityPct: 13.6 },
  { vertical: 'ALCEU KELLER', hoursMaker: 12.6, representativityPct: 12.6 },
  { vertical: 'RODRIGO SOUZA', hoursMaker: 10.6, representativityPct: 10.6 },
  { vertical: 'JACKSON CENCI', hoursMaker: 9.8, representativityPct: 9.8 },
  { vertical: 'HERNANI MELO', hoursMaker: 8.1, representativityPct: 8.1 },
  { vertical: 'VALMIR TORTELLI', hoursMaker: 7.6, representativityPct: 7.6 },
  { vertical: 'RAPHAEL SANTANA', hoursMaker: 7.1, representativityPct: 7.1 },
  { vertical: 'FLAVIA MORGENSTERN', hoursMaker: 5.2, representativityPct: 5.2 },
  { vertical: 'SAMUEL ZANOTTO', hoursMaker: 3.8, representativityPct: 3.8 },
];

// 4. Distribuição Geral de Horas Maker (Histograma de 15 Faixas - Total 756 Makers)
export const distributionRangesData: DistributionRange[] = [
  { range: '0h-0h30', count: 9 },
  { range: '0h30-1h', count: 17 },
  { range: '1h-1h30', count: 63 },
  { range: '1h30-2h', count: 28 },
  { range: '2h-2h30', count: 57 },
  { range: '2h30-3h', count: 21 },
  { range: '3h-3h30', count: 37 },
  { range: '3h30-4h', count: 22 },
  { range: '4h-4h30', count: 20 },
  { range: '4h30-5h', count: 18 },
  { range: '5h-10h', count: 196 },
  { range: '10h-15h', count: 79 },
  { range: '15h-20h', count: 73 },
  { range: '20h-25h', count: 42 },
  { range: '25h+', count: 74 },
];

// 5. Estrutura Hierárquica para o Explorador (Modal da Tela 3)
export const hierarchicalExplorerData: HierarchicalVertical[] = [
  {
    verticalName: 'ALCEU FERNANDO KELLER',
    totalHours: 530.7,
    totalCourses: 426,
    managers: [
      {
        managerName: 'Alceu Keller',
        totalHours: 2.9,
        totalCourses: 5,
        teams: [
          {
            teamName: 'Sem Time (Matriz)',
            totalHours: 2.9,
            totalCourses: 5,
            makers: [
              { id: 'hm-1', name: 'ALIK FABIANA RODRIGUES VOTISCH', hours: 2.5, coursesCount: 4 },
              { id: 'hm-2', name: 'Guilherme Assis Arruda Oliveira', hours: 0.4, coursesCount: 1 },
            ],
          },
        ],
      },
      {
        managerName: 'ALIK FABIANA RODRIGUES VOTISCH',
        totalHours: 4.7,
        totalCourses: 2,
        teams: [
          {
            teamName: 'Engenharia de Produto',
            totalHours: 4.7,
            totalCourses: 2,
            makers: [
              { id: 'hm-3', name: 'GABRIEL NOGUEIRA', hours: 3.2, coursesCount: 1 },
              { id: 'hm-4', name: 'MARIANA SILVA', hours: 1.5, coursesCount: 1 },
            ],
          },
        ],
      },
      {
        managerName: 'Alik Votisch',
        totalHours: 105.2,
        totalCourses: 83,
        teams: [
          {
            teamName: 'Marketing & Conteúdo',
            totalHours: 56.4,
            totalCourses: 45,
            makers: [
              { id: 'hm-5', name: 'GLAUCO SCAGLIA', hours: 42.0, coursesCount: 18 },
              { id: 'hm-6', name: 'BEATRIZ MENDES', hours: 14.4, coursesCount: 12 },
            ],
          },
          {
            teamName: 'Growth & Analytics',
            totalHours: 48.8,
            totalCourses: 38,
            makers: [
              { id: 'hm-7', name: 'LUCAS PINHEIRO', hours: 26.0, coursesCount: 20 },
              { id: 'hm-8', name: 'BRUNA CAROLINE MARTINS', hours: 12.4, coursesCount: 9 },
              { id: 'hm-9', name: 'EDUARDO FELIPE SCHNEIDER', hours: 10.4, coursesCount: 9 },
            ],
          },
        ],
      },
      {
        managerName: 'DANILO GERALDO RIBEIRO DA MOTA FRANCISCO',
        totalHours: 3.5,
        totalCourses: 3,
        teams: [
          {
            teamName: 'Inovação e P&D',
            totalHours: 3.5,
            totalCourses: 3,
            makers: [
              { id: 'hm-10', name: 'DANILO GERALDO RIBEIRO DA MOTA FRANCISCO', hours: 3.5, coursesCount: 3 },
            ],
          },
        ],
      },
      {
        managerName: 'FELIPE RAMOS',
        totalHours: 414.4,
        totalCourses: 333,
        teams: [
          {
            teamName: 'Core Platform Engineering',
            totalHours: 414.4,
            totalCourses: 333,
            makers: [
              { id: 'hm-11', name: 'CAMILA BORGES', hours: 50.0, coursesCount: 32 },
              { id: 'hm-12', name: 'FELIPE RAMOS', hours: 48.5, coursesCount: 28 },
              { id: 'hm-13', name: 'LEONARDO SANTOS', hours: 35.2, coursesCount: 21 },
            ],
          },
        ],
      },
    ],
  },
  {
    verticalName: 'RAFAEL DIOGO SARTOREL',
    totalHours: 1980.4,
    totalCourses: 1420,
    managers: [
      {
        managerName: 'EDIONEI SANTOS',
        totalHours: 640.2,
        totalCourses: 450,
        teams: [
          {
            teamName: 'DevOps & Cloud Core',
            totalHours: 640.2,
            totalCourses: 450,
            makers: [
              { id: 'hm-14', name: 'ABIMAEL JOSE MARTIN DE OLIVEIRA', hours: 18.5, coursesCount: 14 },
              { id: 'hm-15', name: 'TIAGO FONSECA', hours: 22.4, coursesCount: 16 },
              { id: 'hm-16', name: 'RAFAEL DIOGO SARTOREL', hours: 41.3, coursesCount: 28 },
            ],
          },
        ],
      },
      {
        managerName: 'CARLOS EDUARDO LIMA',
        totalHours: 520.0,
        totalCourses: 380,
        teams: [
          {
            teamName: 'Security & Compliance',
            totalHours: 520.0,
            totalCourses: 380,
            makers: [
              { id: 'hm-17', name: 'VINICIUS SOUZA', hours: 19.8, coursesCount: 15 },
              { id: 'hm-18', name: 'PATRICIA ALBUQUERQUE', hours: 17.5, coursesCount: 12 },
            ],
          },
        ],
      },
    ],
  },
  {
    verticalName: 'PAULO ROBERTO DA SILVA PEREIRA',
    totalHours: 1420.8,
    totalCourses: 1105,
    managers: [
      {
        managerName: 'FLAVIA MORGENSTERN',
        totalHours: 495.0,
        totalCourses: 380,
        teams: [
          {
            teamName: 'Enterprise Solutions',
            totalHours: 495.0,
            totalCourses: 380,
            makers: [
              { id: 'hm-19', name: 'ADILSON DO AMARAL GODOI JUNIOR', hours: 28.8, coursesCount: 22 },
              { id: 'hm-20', name: 'PAULO ROBERTO DA SILVA PEREIRA', hours: 29.5, coursesCount: 18 },
            ],
          },
        ],
      },
      {
        managerName: 'SAMUEL ZANOTTO',
        totalHours: 410.2,
        totalCourses: 315,
        teams: [
          {
            teamName: 'API & Microservices',
            totalHours: 410.2,
            totalCourses: 315,
            makers: [
              { id: 'hm-21', name: 'ADRIAN PEREIRA BARROS', hours: 10.6, coursesCount: 8 },
              { id: 'hm-22', name: 'JULIANA COSTA', hours: 36.0, coursesCount: 25 },
            ],
          },
        ],
      },
    ],
  },
  {
    verticalName: 'JACKSON ANTONIO CENCI',
    totalHours: 980.5,
    totalCourses: 750,
    managers: [
      {
        managerName: 'LILIAN SCHULTZ',
        totalHours: 420.0,
        totalCourses: 310,
        teams: [
          {
            teamName: 'Quality Assurance & Automated Testing',
            totalHours: 420.0,
            totalCourses: 310,
            makers: [
              { id: 'hm-23', name: 'ADRIANA TIVES SALES', hours: 9.7, coursesCount: 7 },
              { id: 'hm-24', name: 'JACKSON ANTONIO CENCI', hours: 18.2, coursesCount: 14 },
            ],
          },
        ],
      },
    ],
  },
  {
    verticalName: 'RAPHAEL MORAES SANTANA',
    totalHours: 890.3,
    totalCourses: 690,
    managers: [
      {
        managerName: 'THIAGO MARQUES',
        totalHours: 380.0,
        totalCourses: 290,
        teams: [
          {
            teamName: 'Data Engineering & Analytics',
            totalHours: 380.0,
            totalCourses: 290,
            makers: [
              { id: 'hm-25', name: 'ADRIANA GARCIA ALVES DA SILVA', hours: 1.0, coursesCount: 1 },
              { id: 'hm-26', name: 'AMABILE OURIQUES', hours: 56.0, coursesCount: 42 },
            ],
          },
        ],
      },
    ],
  },
];

// 6. Lista Geral de Makers para o Detalhamento de Distribuição (Modal da Tela 4)
export const detailedMakersList: DetailedMaker[] = [
  {
    id: 'dm-1',
    name: 'ABIMAEL JOSE MARTIN DE OLIVEIRA',
    manager: 'EDIONEI SANTOS',
    directorate: 'RAFAEL DIOGO SARTOREL',
    team: 'DevOps & Cloud Core',
    range: '15h-20h',
    hours: 18.5,
    coursesCount: 14,
  },
  {
    id: 'dm-2',
    name: 'ADILSON DO AMARAL GODOI JUNIOR',
    manager: 'FLAVIA MORGENSTERN',
    directorate: 'PAULO ROBERTO DA SILVA PEREIRA',
    team: 'Enterprise Solutions',
    range: '25h+',
    hours: 28.8,
    coursesCount: 22,
  },
  {
    id: 'dm-3',
    name: 'ADRIAN PEREIRA BARROS',
    manager: 'SAMUEL ZANOTTO',
    directorate: 'PAULO ROBERTO DA SILVA PEREIRA',
    team: 'API & Microservices',
    range: '10h-15h',
    hours: 10.6,
    coursesCount: 8,
  },
  {
    id: 'dm-4',
    name: 'ADRIANA GARCIA ALVES DA SILVA',
    manager: 'THIAGO MARQUES',
    directorate: 'RAPHAEL MORAES SANTANA',
    team: 'Data Engineering & Analytics',
    range: '1h-1h30',
    hours: 1.0,
    coursesCount: 1,
  },
  {
    id: 'dm-5',
    name: 'ADRIANA TIVES SALES',
    manager: 'LILIAN SCHULTZ',
    directorate: 'JACKSON ANTONIO CENCI',
    team: 'QA Automation',
    range: '5h-10h',
    hours: 9.7,
    coursesCount: 7,
  },
  {
    id: 'dm-6',
    name: 'ALCEU FERNANDO KELLER',
    manager: 'DIRETORIA',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Diretoria Executiva',
    range: '25h+',
    hours: 34.2,
    coursesCount: 26,
  },
  {
    id: 'dm-7',
    name: 'ALIK FABIANA RODRIGUES VOTISCH',
    manager: 'ALCEU KELLER',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Engenharia de Produto',
    range: '2h-2h30',
    hours: 2.5,
    coursesCount: 4,
  },
  {
    id: 'dm-8',
    name: 'AMABILE OURIQUES',
    manager: 'THIAGO MARQUES',
    directorate: 'RAPHAEL MORAES SANTANA',
    team: 'Data Engineering & Analytics',
    range: '25h+',
    hours: 56.0,
    coursesCount: 42,
  },
  {
    id: 'dm-9',
    name: 'BEATRIZ MENDES',
    manager: 'ALIK VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Marketing & Conteúdo',
    range: '10h-15h',
    hours: 14.4,
    coursesCount: 12,
  },
  {
    id: 'dm-10',
    name: 'BRUNA CAROLINE MARTINS',
    manager: 'ALIK VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Growth & Analytics',
    range: '10h-15h',
    hours: 12.4,
    coursesCount: 9,
  },
  {
    id: 'dm-11',
    name: 'CAMILA BORGES',
    manager: 'FELIPE RAMOS',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Core Platform Engineering',
    range: '25h+',
    hours: 50.0,
    coursesCount: 32,
  },
  {
    id: 'dm-12',
    name: 'DANILO GERALDO RIBEIRO DA MOTA FRANCISCO',
    manager: 'ALCEU KELLER',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Inovação e P&D',
    range: '3h30-4h',
    hours: 3.5,
    coursesCount: 3,
  },
  {
    id: 'dm-13',
    name: 'EDUARDO FELIPE SCHNEIDER',
    manager: 'ALIK VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Growth & Analytics',
    range: '5h-10h',
    hours: 8.2,
    coursesCount: 6,
  },
  {
    id: 'dm-14',
    name: 'FELIPE RAMOS',
    manager: 'ALCEU KELLER',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Core Platform Engineering',
    range: '25h+',
    hours: 48.5,
    coursesCount: 28,
  },
  {
    id: 'dm-15',
    name: 'GABRIEL NOGUEIRA',
    manager: 'ALIK FABIANA RODRIGUES VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Engenharia de Produto',
    range: '3h-3h30',
    hours: 3.2,
    coursesCount: 2,
  },
  {
    id: 'dm-16',
    name: 'GLAUCO SCAGLIA',
    manager: 'ALIK VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Marketing & Conteúdo',
    range: '25h+',
    hours: 42.0,
    coursesCount: 18,
  },
  {
    id: 'dm-17',
    name: 'GUILHERME ASSIS ARRUDA OLIVEIRA',
    manager: 'ALCEU KELLER',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Sem Time (Matriz)',
    range: '0h-0h30',
    hours: 0.4,
    coursesCount: 1,
  },
  {
    id: 'dm-18',
    name: 'JACKSON ANTONIO CENCI',
    manager: 'DIRETORIA',
    directorate: 'JACKSON ANTONIO CENCI',
    team: 'Diretoria Executiva',
    range: '15h-20h',
    hours: 18.2,
    coursesCount: 14,
  },
  {
    id: 'dm-19',
    name: 'JULIANA COSTA',
    manager: 'SAMUEL ZANOTTO',
    directorate: 'PAULO ROBERTO DA SILVA PEREIRA',
    team: 'API & Microservices',
    range: '25h+',
    hours: 36.0,
    coursesCount: 25,
  },
  {
    id: 'dm-20',
    name: 'LUCAS PINHEIRO',
    manager: 'ALIK VOTISCH',
    directorate: 'ALCEU FERNANDO KELLER',
    team: 'Growth & Analytics',
    range: '25h+',
    hours: 26.0,
    coursesCount: 20,
  },
  {
    id: 'dm-21',
    name: 'PAULO ROBERTO DA SILVA PEREIRA',
    manager: 'DIRETORIA',
    directorate: 'PAULO ROBERTO DA SILVA PEREIRA',
    team: 'Diretoria Executiva',
    range: '25h+',
    hours: 29.5,
    coursesCount: 18,
  },
  {
    id: 'dm-22',
    name: 'RAFAEL DIOGO SARTOREL',
    manager: 'DIRETORIA',
    directorate: 'RAFAEL DIOGO SARTOREL',
    team: 'Diretoria Executiva',
    range: '25h+',
    hours: 41.3,
    coursesCount: 28,
  },
  {
    id: 'dm-23',
    name: 'RODRIGO SOUZA',
    manager: 'DIRETORIA',
    directorate: 'RODRIGO SOUZA',
    team: 'Diretoria Executiva',
    range: '20h-25h',
    hours: 23.7,
    coursesCount: 17,
  },
];
