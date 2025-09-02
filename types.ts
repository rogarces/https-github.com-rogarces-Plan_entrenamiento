
export enum ExperienceLevel {
  Principiante = 'Principiante',
  Intermedio = 'Intermedio',
  Avanzado = 'Avanzado',
}

export enum TargetDistance {
  _5K = '5K',
  _10K = '10K',
  _21K = '21K',
  _42K = '42K',
}

export interface FormData {
  name: string;
  age: number;
  experience: ExperienceLevel;
  distance: TargetDistance;
  pace: string;
}

export interface Session {
  title: string;
  warmup: string;
  mainSet: string;
  cooldown: string;
}

export interface DayPlan {
  day: string;
  session: Session | string;
}

export interface WeekPlan {
  weekNumber: number;
  weeklySummary: string;
  totalKm: number;
  days: DayPlan[];
  recoveryNotes?: string;
}

export interface TrainingPlan {
  title: string;
  runnerName: string;
  weeks: WeekPlan[];
}
