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
    <aside className="flex w-[400px] flex-col border-r border-[#d0d0d0] bg-[#ffffff]">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex h-[52px] gap-1 rounded-[10px] bg-[#ececec] p-1">
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
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#999999]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="h-9 w-full rounded-lg border border-[#d0d0d0] bg-white pr-3 pl-9 text-[14px] text-[#111111] placeholder:text-[#999999] focus:border-[#3bd671] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.6fr] gap-2 border-y border-[#d0d0d0] bg-[#f0f0f0] px-4 py-3 text-[12px] whitespace-nowrap text-[#777777]">
        <span className="flex items-center gap-1">Stock / Index ▾</span>
        <span className="text-right">Last Price</span>
        <span className="flex items-center justify-end gap-1">Change % ▾</span>
        <span className="text-right">Daily Change</span>
        <span className="text-right">Updated</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "portfolio" ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-[14px] text-[#777777]">
            You don't own any stocks yet.
          </div>
        ) : (
          filtered.map((s) => {
            const isSelected = s.ticker === selectedTicker;
            const isUp = s.changePct >= 0;
            const colorClass = isUp ? "text-[#1a9e4a]" : "text-[#d93025]";
            return (
              <button
                key={s.ticker}
                onClick={() => onSelect(s.ticker)}
                className={`grid w-full grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.6fr] items-center gap-2 border-b border-[#e8e8e8] px-4 py-3 text-left transition-colors hover:bg-[#f5f5f5] ${
                  isSelected ? "bg-[#ececec]" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-[#111111]">
                    {s.ticker}
                  </span>
                  <span className="text-[12px] text-[#777777]">{s.name}</span>
                </div>
                <span className="text-right text-[16px] text-[#111111]">
                  {fmtPrice(s)}
                </span>
                <span
                  className={`flex items-center justify-end gap-1 text-[14px] ${colorClass}`}
                >
                  <span>{isUp ? "▲" : "▼"}</span>
                  {Math.abs(s.changePct).toFixed(2)}%
                </span>
                <span className={`text-right text-[14px] ${colorClass}`}>
                  {fmtChange(s.dailyChange, s.currency)}
                </span>
                <span className="text-right text-[12px] text-[#777777]">
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
      className={`flex-1 rounded-lg text-[16px] transition-all ${
        active
          ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)]"
          : "text-[#777777] hover:text-[#111111]"
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
