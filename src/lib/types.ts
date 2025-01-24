export type User = {
  name: string;
  email: string;
  password: string;
};

export type MonthlyData = {
  month: string;
  losses: number;
};

export type YearlyData = {
  year: number;
  months: MonthlyData[];
};

export type ProcessedData = { month: string; value: number }[];
