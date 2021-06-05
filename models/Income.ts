export interface Income {
  id: number;
  date: string;
  amount: number;
  firstName: string;
  lastName: string;
}

export interface IncomeGroup {
  id: number;
  date: string;
  incomes: Income[];
}
