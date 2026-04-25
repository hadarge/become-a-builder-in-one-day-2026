export type Stock = {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  dailyChange: number;
  updated: string;
  currency: "$" | "₪";
  history: { month: string; volume: number; price: number }[];
};
