import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { StockList } from "./components/StockList";
import { StockDetail } from "./components/StockDetail";
import { PortfolioDock } from "./components/PortfolioDock";
import { Footer } from "./components/Footer";
import { STOCKS } from "./data/stocks";
import { T } from "./theme";

const STORAGE_KEY = "roni_watchlist_lemonade_v1";
const INITIAL_STARRED = ["CHKP", "NICE"];

function loadStarred(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore
  }
  return new Set(INITIAL_STARRED);
}

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState(STOCKS[0].ticker);
  const [starred, setStarred] = useState<Set<string>>(loadStarred);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...starred]));
    } catch {
      // ignore
    }
  }, [starred]);

  const toggleStar = (ticker: string) => {
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) next.delete(ticker);
      else next.add(ticker);
      return next;
    });
  };

  const selected =
    STOCKS.find((s) => s.ticker === selectedTicker) ?? STOCKS[0];

  return (
    <div className="flex h-screen flex-col" style={{ background: T.canvas }}>
      <div className="flex min-h-0 flex-1 flex-row">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <div className="flex min-h-0 flex-1 flex-row">
            <StockList
              stocks={STOCKS}
              selectedTicker={selectedTicker}
              onSelect={setSelectedTicker}
              starred={starred}
              onToggleStar={toggleStar}
            />
            <StockDetail
              stock={selected}
              isStarred={starred.has(selected.ticker)}
              onToggleStar={toggleStar}
            />
          </div>
          <PortfolioDock />
          <Footer />
        </div>
      </div>
    </div>
  );
}