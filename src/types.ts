export type SkillLevel = 0 | 1 | 2 | 3;

export type GapPriority = 
  | ''
  | 'Prioridade I - Alta'
  | 'Prioridade II - Média'
  | 'Prioridade III - Baixa'
  | 'Item não priorizado';

export interface Competency {
  id: string;
  name: string;
  category: 'Técnica' | 'Comportamental' | 'Processos' | 'Gestão';
  isMandatory: boolean;
  targetPeriod: string;
  desiredLevel: SkillLevel; // 1 (Bronze), 2 (Prata), 3 (Ouro)
  currentLevel: SkillLevel; // 0, 1 (Bronze), 2 (Prata), 3 (Ouro)
  gapPriority?: GapPriority;
  targetDate?: string; // YYYY-MM-DD
}

export interface Maker {
  id: string;
  name: string;
  email: string;
  admissionDate: string; // e.g. '2023-04-15'
  directLeader: string;
  competencies: Competency[];
}

export interface Team {
  id: string;
  name: string;
  makers: Maker[];
}

export interface Manager {
  id: string;
  name: string;
  directorate: string;
  teams: Team[];
}

export interface FilterState {
  directorate: string;
  manager: string;
  leader: string;
  team: string;
  maker: string;
  admission: string;
  category: string;
  mandatory: string;
  target: string;
  searchQuery: string;
}

export interface MonthlyDataPoint {
  month: string;
  atendimento: number;
  gap: number;
}
