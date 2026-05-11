import { useState } from "react";
import type { HTMLAttributes } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Stock } from "../types";
import { DragGrip } from "./DragGrip";

const PERIODS = ["1D", "5D", "1M", "3M", "6M", "1Y", "3Y", "5Y"] as const;
type Period = (typeof PERIODS)[number];

type Props = {
  stock: Stock;
  slotId: string;
  slotProps: HTMLAttributes<HTMLElement>;
};

function fmtChange(n: number, currency: string) {
  const sign = n >= 0 ? "+" : "−";
  return `${sign}${currency}${Math.abs(n).toFixed(2)}`;
}

export function StockDetail({ stock, slotId, slotProps }: Props) {
  const [period, setPeriod] = useState<Period>("1Y");
  const isUp = stock.changePct >= 0;
  const trendColor = isUp ? "#22A121" : "#D8201D";

  return (
    <section className="panel" {...slotProps}>
      <DragGrip id={slotId} />
      <div className="detail">
        <div className="detail-head">
          <div className="detail-id">
            <div className="detail-id-inner">
              <div className="ticker-tile" style={{ background: stock.color }}>
                {stock.ticker.slice(0, 2)}
              </div>
              <div>
                <div className="ticker-row">
                  <span className="ticker">{stock.ticker}</span>
                  <span className="company">{stock.name}</span>
                </div>
                <div className="price-row">
                  <span className="big-price">
                    {stock.currency}
                    {stock.price.toFixed(2)}
                  </span>
                  <span className={`big-chg ${isUp ? "up" : "down"}`}>
                    {isUp ? "▲" : "▼"} {fmtChange(stock.dailyChange, stock.currency)} ·{" "}
                    {isUp ? "+" : ""}
                    {stock.changePct.toFixed(2)}%
                  </span>
                  <span className="updated">Updated {stock.updated}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-tertiary">Sell</button>
            <button className="btn btn-primary">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
              Buy {stock.ticker}
            </button>
          </div>
        </div>

        <div className="period-row">
          <div className="periods">
            {PERIODS.map((p) => (
              <button
                key={p}
                className={`period ${p === period ? "active" : ""}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="legend">
            <span>
              <span className="swatch" style={{ background: trendColor }}></span>
              Price
            </span>
            <span>
              <span
                className="swatch"
                style={{ background: "var(--pango-blue-light-2)" }}
              ></span>
              Volume
            </span>
          </div>
        </div>

        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={stock.history}
              margin={{ top: 16, right: 32, left: 0, bottom: 8 }}
            >
              <CartesianGrid stroke="#E6E6E6" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#949499"
                tick={{ fill: "#636363", fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: "#E6E6E6" }}
                tickLine={false}
                dy={6}
              />
              <YAxis
                yAxisId="vol"
                orientation="right"
                stroke="#949499"
                tick={{ fill: "#949499", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <YAxis
                yAxisId="price"
                orientation="left"
                hide
                domain={["auto", "auto"]}
              />
              <Tooltip cursor={{ fill: "rgba(46,105,231,0.06)" }} />
              <Bar
                yAxisId="vol"
                dataKey="volume"
                fill="#A1BEF6"
                radius={[2, 2, 0, 0]}
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke={trendColor}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: trendColor,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
