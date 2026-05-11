import { useMemo, useState } from "react";
import type { Stock } from "../types";

type Tab = "all" | "portfolio";

type Props = {
  stocks: Stock[];
  selectedTicker: string;
  onSelect: (ticker: string) => void;
};

function fmtPrice(s: Stock) {
  return `${s.currency}${s.price.toFixed(2)}`;
}

function fmtChange(n: number, currency: string) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${currency}${n.toFixed(2)}`;
}

export function StockList({ stocks, selectedTicker, onSelect }: Props) {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stocks;
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }, [stocks, query]);

  return (
    <aside className="flex w-[400px] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/55 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex h-[44px] gap-1 rounded-xl border border-white/60 bg-white/40 p-1 backdrop-blur-xl">
          <TabButton
            active={tab === "all"}
            onClick={() => setTab("all")}
            label="All stocks"
          />
          <TabButton
            active={tab === "portfolio"}
            onClick={() => setTab("portfolio")}
            label="My Portfolio"
          />
        </div>

        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-10 w-full rounded-xl border border-white/60 bg-white/60 pr-3 pl-9 text-[14px] text-slate-900 placeholder:text-slate-400 backdrop-blur-xl transition focus:border-indigo-300 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-indigo-300/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.6fr] gap-2 border-y border-white/60 bg-white/30 px-4 py-2.5 text-[11px] font-medium whitespace-nowrap tracking-wide text-slate-500 uppercase backdrop-blur-xl">
        <span className="flex items-center gap-1">Stock / Index ▾</span>
        <span className="text-right">Last Price</span>
        <span className="flex items-center justify-end gap-1">Change % ▾</span>
        <span className="text-right">Daily Change</span>
        <span className="text-right">Updated</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "portfolio" ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-[14px] text-slate-400">
            You don't own any stocks yet.
          </div>
        ) : (
          filtered.map((s) => {
            const isSelected = s.ticker === selectedTicker;
            const isUp = s.changePct >= 0;
            const colorClass = isUp ? "text-emerald-600" : "text-rose-500";
            return (
              <button
                key={s.ticker}
                onClick={() => onSelect(s.ticker)}
                className={`group relative grid w-full grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.6fr] items-center gap-2 border-b border-white/50 px-4 py-3 text-left transition-all hover:bg-white/50 ${
                  isSelected
                    ? "bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent"
                    : ""
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-indigo-500 to-violet-500" />
                )}
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-slate-900">
                    {s.ticker}
                  </span>
                  <span className="text-[12px] text-slate-500">{s.name}</span>
                </div>
                <span className="text-right text-[15px] font-medium text-slate-900">
                  {fmtPrice(s)}
                </span>
                <span
                  className={`flex items-center justify-end gap-1 text-[13px] font-medium ${colorClass}`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  {Math.abs(s.changePct).toFixed(2)}%
                </span>
                <span className={`text-right text-[13px] font-medium ${colorClass}`}>
                  {fmtChange(s.dailyChange, s.currency)}
                </span>
                <span className="text-right text-[11px] text-slate-400">
                  {s.updated}
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-lg text-[14px] font-medium transition-all ${
        active
          ? "bg-gradient-to-br from-white to-white/70 text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(15,23,42,0.12)]"
          : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" strokeLinecap="round" />
    </svg>
  );
}
