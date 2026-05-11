import { useMemo, useState } from "react";
import type { HTMLAttributes } from "react";
import type { Stock } from "../types";
import { DragGrip } from "./DragGrip";

type Tab = "all" | "portfolio";

type Props = {
  stocks: Stock[];
  selectedTicker: string;
  onSelect: (ticker: string) => void;
  slotId: string;
  slotProps: HTMLAttributes<HTMLElement>;
};

function fmtPrice(s: Stock) {
  return `${s.currency}${s.price.toFixed(2)}`;
}

export function StockList({
  stocks,
  selectedTicker,
  onSelect,
  slotId,
  slotProps,
}: Props) {
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
    <aside className="panel" {...slotProps}>
      <DragGrip id={slotId} />
      <div className="list-head">
        <div className="tabs">
          <button
            className={`tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All stocks <span className="pill-count">{stocks.length}</span>
          </button>
          <button
            className={`tab ${tab === "portfolio" ? "active" : ""}`}
            onClick={() => setTab("portfolio")}
          >
            My portfolio
          </button>
        </div>

        <div className="search-wrap">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 3 3" />
          </svg>
          <input
            className="search"
            placeholder="Search by ticker or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="list-cols">
        <span>Stock</span>
        <span className="r">Last price</span>
        <span className="r">Change</span>
        <span className="r">Updated</span>
      </div>

      <div className="list-scroll">
        {tab === "portfolio" ? (
          <div className="empty">
            <div className="icn">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="7" width="18" height="13" rx="3" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <h4>No holdings yet</h4>
            <p>Pick a stock from All stocks and tap Buy to open your first position.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 10 }}
              onClick={() => setTab("all")}
            >
              Browse stocks
            </button>
          </div>
        ) : (
          filtered.map((s) => {
            const isSelected = s.ticker === selectedTicker;
            const isUp = s.changePct >= 0;
            return (
              <button
                key={s.ticker}
                className={`row ${isSelected ? "selected" : ""}`}
                onClick={() => onSelect(s.ticker)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      background: s.color,
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.ticker.slice(0, 2)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="tk">{s.ticker}</div>
                    <div className="nm truncate">{s.name}</div>
                  </div>
                </div>
                <div className="price">{fmtPrice(s)}</div>
                <span className={`chg ${isUp ? "up" : "down"}`}>
                  <span className="tri">{isUp ? "▲" : "▼"}</span>
                  {Math.abs(s.changePct).toFixed(2)}%
                </span>
                <div className="upd">{s.updated}</div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
