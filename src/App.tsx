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
    <div className="flex h-screen flex-col bg-[#121212]">
      <Header />
      <div className="flex min-h-0 flex-1">
        <StockList
          stocks={STOCKS}
          selectedTicker={selectedTicker}
          onSelect={setSelectedTicker}
        />
        <StockDetail stock={selected} />
      </div>
      <PortfolioDock />
      <Footer />
    </div>
  );
}
