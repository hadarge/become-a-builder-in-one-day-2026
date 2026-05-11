import { useState } from "react";
import type { HTMLAttributes, ReactElement } from "react";
import { Header } from "./components/Header";
import { StockList } from "./components/StockList";
import { StockDetail } from "./components/StockDetail";
import { PortfolioDock } from "./components/PortfolioDock";
import { Footer } from "./components/Footer";
import { STOCKS } from "./data/stocks";

type SlotId = "list" | "detail";

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState(STOCKS[0].ticker);
  const selected =
    STOCKS.find((s) => s.ticker === selectedTicker) ?? STOCKS[0];

  const [order, setOrder] = useState<SlotId[]>(["list", "detail"]);
  const [draggingId, setDraggingId] = useState<SlotId | null>(null);
  const [overId, setOverId] = useState<SlotId | null>(null);

  const makeSlotProps = (id: SlotId): HTMLAttributes<HTMLElement> => ({
    onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (overId !== id) setOverId(id);
    },
    onDragEnter: (e) => {
      e.preventDefault();
      setOverId(id);
    },
    onDragLeave: (e) => {
      if (
        e.relatedTarget instanceof Node &&
        e.currentTarget.contains(e.relatedTarget)
      )
        return;
      setOverId((cur) => (cur === id ? null : cur));
    },
    onDrop: (e) => {
      e.preventDefault();
      const from = e.dataTransfer.getData("text/plain");
      if (from && from !== id) setOrder((o) => [o[1], o[0]]);
      setDraggingId(null);
      setOverId(null);
    },
    onDragStartCapture: (e) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(".drag-grip")) {
        setDraggingId(id);
      }
    },
    onDragEnd: () => {
      setDraggingId(null);
      setOverId(null);
    },
    ...(draggingId === id ? { "data-dragging": "" } : {}),
    ...(overId === id && draggingId && draggingId !== id
      ? { "data-drop-target": "" }
      : {}),
  });

  const slots: Record<SlotId, ReactElement> = {
    list: (
      <StockList
        key="list"
        slotId="list"
        slotProps={makeSlotProps("list")}
        stocks={STOCKS}
        selectedTicker={selectedTicker}
        onSelect={setSelectedTicker}
      />
    ),
    detail: (
      <StockDetail
        key="detail"
        slotId="detail"
        slotProps={makeSlotProps("detail")}
        stock={selected}
      />
    ),
  };

  return (
    <div className="app">
      <Header />
      <main className="main">{order.map((id) => slots[id])}</main>
      <div>
        <PortfolioDock />
        <Footer />
      </div>
    </div>
  );
}
