export interface Outcome {
  id: number;
  date: string;
  amount: number;
  where: string;
  description: string;
}

export interface OutcomeGroup {
  id: number;
  date: string;
  outcomes: Outcome[];
}
