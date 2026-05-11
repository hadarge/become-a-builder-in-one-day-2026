import { useState } from "react";
import { Header } from "./components/Header";
import { StockList } from "./components/StockList";
import { StockDetail } from "./components/StockDetail";
import { PortfolioDock } from "./components/PortfolioDock";
import { Footer } from "./components/Footer";
import { STOCKS } from "./data/stocks";

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState(STOCKS[0].ticker);
  const selected =
    STOCKS.find((s) => s.ticker === selectedTicker) ?? STOCKS[0];

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-[#eef2ff] to-[#fdf2f8]">
      {/* Ambient color blobs */}
      <div className="blob pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full bg-gradient-to-br from-indigo-300/60 to-violet-300/40 blur-3xl" />
      <div className="blob-2 pointer-events-none absolute top-1/3 -right-40 size-[560px] rounded-full bg-gradient-to-br from-fuchsia-200/60 to-rose-200/40 blur-3xl" />
      <div className="blob-3 pointer-events-none absolute -bottom-40 left-1/3 size-[480px] rounded-full bg-gradient-to-br from-sky-200/60 to-emerald-200/40 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="rise-in" style={{ animationDelay: "60ms" }}>
          <Header />
        </div>
        <div className="flex min-h-0 flex-1 gap-4 px-4 py-4">
          <div className="rise-in flex" style={{ animationDelay: "180ms" }}>
            <StockList
              stocks={STOCKS}
              selectedTicker={selectedTicker}
              onSelect={setSelectedTicker}
            />
          </div>
          <div
            className="rise-in flex min-w-0 flex-1"
            style={{ animationDelay: "260ms" }}
          >
            <StockDetail stock={selected} />
          </div>
        </div>
        <div className="rise-in" style={{ animationDelay: "360ms" }}>
          <PortfolioDock />
        </div>
        <div className="fade-in" style={{ animationDelay: "560ms" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
