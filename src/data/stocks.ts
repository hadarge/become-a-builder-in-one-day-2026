import type { Stock } from "../types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function makeHistory(seed: number, basePrice: number) {
  let priceWalk = basePrice * 0.85;
  return MONTHS.map((m, i) => {
    const noise = Math.sin(seed + i) * 0.5 + Math.cos(seed * 1.7 + i * 0.3);
    priceWalk = priceWalk * (1 + noise * 0.04);
    const volume = Math.max(
      400,
      Math.round(
        6000 + Math.sin(seed * 2.1 + i * 0.6) * 4000 + Math.cos(i) * 2000,
      ),
    );
    return { month: m, volume, price: Math.round(priceWalk * 100) / 100 };
  });
}

export const STOCKS: Stock[] = [
  {
    ticker: "ORL",
    name: "Oil Refineries",
    price: 67.8,
    changePct: 2.88,
    dailyChange: 1.9,
    updated: "15:30",
    currency: "$",
    history: makeHistory(1, 67.8),
  },
  {
    ticker: "AZRG",
    name: "Azrieli Group",
    price: 312.4,
    changePct: 2.69,
    dailyChange: 8.2,
    updated: "15:27",
    currency: "$",
    history: makeHistory(2, 312.4),
  },
  {
    ticker: "MZTF",
    name: "Mizrahi Tefahot Bank",
    price: 145.2,
    changePct: 2.54,
    dailyChange: 3.6,
    updated: "15:28",
    currency: "$",
    history: makeHistory(3, 145.2),
  },
  {
    ticker: "LUMI",
    name: "Bank Leumi",
    price: 89.3,
    changePct: 2.41,
    dailyChange: 2.1,
    updated: "15:25",
    currency: "$",
    history: makeHistory(4, 89.3),
  },
  {
    ticker: "CHKP",
    name: "Check Point Software",
    price: 156.8,
    changePct: 2.25,
    dailyChange: 3.45,
    updated: "15:26",
    currency: "₪",
    history: makeHistory(5, 156.8),
  },
  {
    ticker: "BEZQ",
    name: "Bezeq Telecom",
    price: 12.45,
    changePct: 1.22,
    dailyChange: 0.15,
    updated: "15:24",
    currency: "₪",
    history: makeHistory(6, 12.45),
  },
  {
    ticker: "ESLT",
    name: "Elbit Systems",
    price: 234.7,
    changePct: 1.8,
    dailyChange: -4.3,
    updated: "15:29",
    currency: "₪",
    history: makeHistory(7, 234.7),
  },
  {
    ticker: "TEVA",
    name: "Teva Pharmaceutical",
    price: 42.15,
    changePct: -2.1,
    dailyChange: -1.25,
    updated: "15:22",
    currency: "₪",
    history: makeHistory(8, 42.15),
  },
  {
    ticker: "ICL",
    name: "ICL Group",
    price: 28.6,
    changePct: -2.89,
    dailyChange: -0.85,
    updated: "15:23",
    currency: "₪",
    history: makeHistory(9, 28.6),
  },
  {
    ticker: "NICE",
    name: "NICE Ltd.",
    price: 178.4,
    changePct: 0.95,
    dailyChange: 1.68,
    updated: "15:30",
    currency: "$",
    history: makeHistory(10, 178.4),
  },
];
