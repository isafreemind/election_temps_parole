export interface Candidate {
  nom: string;
  tempsTotalSeconds: number;
  voix: number;
  pourcentageVoix: number;
}

export interface YearData {
  '2017': Candidate[];
  '2022': Candidate[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  voix?: number;
  pourcentage?: number;
  ratio?: number;
  tempsTotalSeconds?: number;
  pourcentageTemps?: number;
  pourcentageVoix?: number;
}
