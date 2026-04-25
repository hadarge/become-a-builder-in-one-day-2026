# Become a Builder in One Day — 2026

A simulated stock-trading dashboard built in a workshop, going from a Figma design to a running React app.

Stack: **Vite + React 19 + TypeScript + Tailwind CSS v4 + Recharts**.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project layout

```
src/
  App.tsx                    top-level layout
  data/stocks.ts             mock stock list + chart history
  components/
    Header.tsx               title, summary cards, avatar
    StockList.tsx            sidebar: tabs, search, sortable rows
    StockDetail.tsx          selected stock + bar/line chart + period selector
    PortfolioDock.tsx        bottom dock with portfolio summary
    Footer.tsx               disclaimer
```

No backend, no router, no state library — single page with mock data.
