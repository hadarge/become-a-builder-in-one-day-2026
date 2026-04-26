import { useMemo, useState } from "react";
import type { Stock } from "../types";
import { T } from "../theme";

type Tab = "all" | "portfolio" | "watchlist";

type Props = {
  stocks: Stock[];
  selectedTicker: string;
  onSelect: (ticker: string) => void;
  starred: Set<string>;
  onToggleStar: (ticker: string) => void;
};

const fmtPrice = (s: Stock) => `${s.currency}${s.price.toFixed(2)}`;
const fmtChange = (n: number, currency: string) =>
  `${n >= 0 ? "+" : ""}${currency}${n.toFixed(2)}`;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M12 3.5l2.7 5.5 6 .9-4.35 4.25 1 6-5.35-2.8-5.35 2.8 1-6L3.3 9.9l6-.9z" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" />
    </svg>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-3 text-[14px] font-semibold whitespace-nowrap transition-all"
      style={{
        background: active ? T.pink : "transparent",
        color: active ? "#fff" : T.muted,
        boxShadow: active ? "0 2px 8px rgba(90,76,255,0.28)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = T.ink;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = T.muted;
      }}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span
          className="inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold"
          style={{
            background: active ? "rgba(255,255,255,0.25)" : T.pinkSoft,
            color: active ? "#fff" : T.pinkDark,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function StockRow({
  s,
  isSelected,
  onSelect,
  isStarred,
  onToggleStar,
}: {
  s: Stock;
  isSelected: boolean;
  onSelect: (ticker: string) => void;
  isStarred: boolean;
  onToggleStar: (ticker: string) => void;
}) {
  const isUp = s.changePct >= 0;
  const trendColor = isUp ? T.green : T.red;
  return (
    <div
      onClick={() => onSelect(s.ticker)}
      className="group grid w-full cursor-pointer grid-cols-[24px_1.3fr_0.9fr_0.9fr_0.9fr_0.55fr] items-center gap-2 px-5 py-3.5 transition-colors"
      style={{
        background: isSelected ? T.pinkSofter : "transparent",
        borderLeft: isSelected
          ? `3px solid ${T.pink}`
          : "3px solid transparent",
        paddingLeft: isSelected ? 17 : 20,
        borderBottom: `1px solid ${T.border}`,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = T.rowHover;
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = "transparent";
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleStar(s.ticker);
        }}
        title={isStarred ? "Remove from Watchlist" : "Add to Watchlist"}
        className="inline-flex size-6 items-center justify-center rounded-full transition-colors"
        style={{ color: isStarred ? T.pink : T.borderStrong }}
        onMouseEnter={(e) => {
          if (!isStarred) e.currentTarget.style.color = T.muted;
        }}
        onMouseLeave={(e) => {
          if (!isStarred) e.currentTarget.style.color = T.borderStrong;
        }}
      >
        <StarIcon filled={isStarred} className="size-[18px]" />
      </button>
      <div className="flex min-w-0 flex-col">
        <span className="text-[15px] font-bold" style={{ color: T.ink }}>
          {s.ticker}
        </span>
        <span className="truncate text-[12px]" style={{ color: T.muted }}>
          {s.name}
        </span>
      </div>
      <span
        className="text-right text-[15px] font-semibold"
        style={{ color: T.text }}
      >
        {fmtPrice(s)}
      </span>
      <span className="flex items-center justify-end gap-1 text-[13px] font-semibold">
        <span
          className="inline-flex items-center justify-center rounded-full px-2 py-0.5"
          style={{
            background: isUp ? T.greenSoft : T.redSoft,
            color: trendColor,
          }}
        >
          {isUp ? (
            <ArrowUpIcon className="mr-0.5 size-3" />
          ) : (
            <ArrowDownIcon className="mr-0.5 size-3" />
          )}
          {Math.abs(s.changePct).toFixed(2)}%
        </span>
      </span>
      <span
        className="text-right text-[13px] font-semibold"
        style={{ color: trendColor }}
      >
        {fmtChange(s.dailyChange, s.currency)}
      </span>
      <span
        className="text-right text-[12px]"
        style={{ color: T.muted }}
      >
        {s.updated}
      </span>
    </div>
  );
}

function WatchlistEmpty({ onGoAll }: { onGoAll: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="relative">
        <div
          className="flex size-20 items-center justify-center rounded-full"
          style={{ background: T.pinkSoft, color: T.pink }}
        >
          <StarIcon filled={false} className="size-9" />
        </div>
        <svg
          viewBox="0 0 40 40"
          className="absolute -bottom-3 left-1/2 size-10 -translate-x-1/2"
        >
          <path
            d="M14 4 C 14 14, 8 18, 8 26 C 8 34, 32 34, 32 26 C 32 18, 26 14, 26 4 Z"
            fill={T.pink}
            opacity="0.18"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[18px] font-bold" style={{ color: T.ink }}>
          Your Watchlist is empty
        </p>
        <p
          className="max-w-[280px] text-[14px]"
          style={{ color: T.muted }}
        >
          Tap the star next to any stock to keep an eye on it here. We'll keep
          your list, even after a refresh.
        </p>
      </div>
      <button
        onClick={onGoAll}
        className="mt-1 h-10 rounded-md px-5 text-[14px] font-semibold text-white transition-all"
        style={{
          background: T.pink,
          boxShadow: "0 4px 12px rgba(90,76,255,0.32)",
        }}
      >
        Browse all stocks
      </button>
    </div>
  );
}

function PortfolioEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div
        className="flex size-16 items-center justify-center rounded-full"
        style={{ background: T.pinkSoft }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={T.pink}
          strokeWidth="2"
          className="size-8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h4l3-9 4 18 3-9h4" />
        </svg>
      </div>
      <p className="text-[16px] font-bold" style={{ color: T.ink }}>
        You don't own any stocks yet
      </p>
      <p className="text-[13px]" style={{ color: T.muted }}>
        Pick one from the list and click Buy to start.
      </p>
    </div>
  );
}

export function StockList({
  stocks,
  selectedTicker,
  onSelect,
  starred,
  onToggleStar,
}: Props) {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const baseList = useMemo(() => {
    if (tab === "watchlist")
      return stocks.filter((s) => starred.has(s.ticker));
    return stocks;
  }, [stocks, tab, starred]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseList;
    return baseList.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q),
    );
  }, [baseList, query]);

  const watchlistEmpty = tab === "watchlist" && baseList.length === 0;

  return (
    <aside
      className="flex w-[440px] shrink-0 flex-col border-r"
      style={{ borderColor: T.border, background: T.panel }}
    >
      <div className="flex flex-col gap-3 p-5">
        <div
          className="flex h-[52px] gap-1 rounded-full p-1"
          style={{
            background: T.pinkSofter,
            border: `1px solid ${T.border}`,
          }}
        >
          <TabButton
            active={tab === "all"}
            onClick={() => setTab("all")}
            label="All stocks"
          />
          <TabButton
            active={tab === "portfolio"}
            onClick={() => setTab("portfolio")}
            label="Portfolio"
          />
          <TabButton
            active={tab === "watchlist"}
            onClick={() => setTab("watchlist")}
            label="Watchlist"
            count={starred.size}
          />
        </div>

        <div className="relative" style={{ color: T.muted }}>
          <SearchIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stocks…"
            className="h-11 w-full rounded-full border pr-4 pl-11 text-[14px] outline-none transition-colors"
            style={{
              borderColor: T.border,
              background: T.surface,
              color: T.text,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = T.pink;
              e.target.style.boxShadow = `0 0 0 4px ${T.pinkSoft}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = T.border;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      <div
        className="grid grid-cols-[24px_1.3fr_0.9fr_0.9fr_0.9fr_0.55fr] gap-2 px-5 py-2.5 text-[11px] font-bold whitespace-nowrap uppercase tracking-[0.5px]"
        style={{
          color: T.muted,
          background: T.pinkSofter,
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <span></span>
        <span>Stock / Index</span>
        <span className="text-right">Last Price</span>
        <span className="text-right">Change %</span>
        <span className="text-right">Daily Δ</span>
        <span className="text-right">Updated</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "portfolio" ? (
          <PortfolioEmpty />
        ) : watchlistEmpty ? (
          <WatchlistEmpty onGoAll={() => setTab("all")} />
        ) : tab === "watchlist" && filtered.length === 0 ? (
          <div
            className="flex h-full items-center justify-center p-6 text-center text-[14px]"
            style={{ color: T.muted }}
          >
            No matches in your Watchlist.
          </div>
        ) : (
          <>
            {tab === "watchlist" && (
              <div
                className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold"
                style={{
                  background: T.pinkSofter,
                  color: T.pink,
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <StarIcon filled className="size-3.5" />
                {filtered.length}{" "}
                {filtered.length === 1 ? "stock" : "stocks"} starred
              </div>
            )}
            {filtered.map((s) => (
              <StockRow
                key={s.ticker}
                s={s}
                isSelected={s.ticker === selectedTicker}
                onSelect={onSelect}
                isStarred={starred.has(s.ticker)}
                onToggleStar={onToggleStar}
              />
            ))}
          </>
        )}
      </div>
    </aside>
  );
}