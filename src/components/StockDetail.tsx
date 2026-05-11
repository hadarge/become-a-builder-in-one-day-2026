import { useState } from "react";
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

const PERIODS = ["1D", "5D", "1M", "3M", "6M", "1Y", "3Y", "5Y"] as const;
type Period = (typeof PERIODS)[number];

type Props = { stock: Stock };

export function StockDetail({ stock }: Props) {
  const [period, setPeriod] = useState<Period>("1Y");
  const isUp = stock.changePct >= 0;

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#f8f9fa] p-6">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[14px] text-[#777777]">{stock.ticker}</span>
        <span className="text-[48px] leading-none font-semibold tracking-[0.35px] text-[#111111]">
          {stock.currency}
          {stock.price.toFixed(2)}
        </span>
        <span
          className={`text-[20px] font-medium ${isUp ? "text-[#1a9e4a]" : "text-[#d93025]"}`}
        >
          {isUp ? "+" : ""}
          {stock.changePct.toFixed(2)}%
        </span>
        <span className="text-[14px] text-[#777777]">{stock.name}</span>
      </div>

      <div className="mb-4 flex gap-1">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`h-8 rounded px-3 text-[14px] transition-colors ${
              p === period
                ? "bg-[#e0e0e0] font-medium text-[#111111]"
                : "text-[#777777] hover:bg-[#ececec] hover:text-[#111111]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={stock.history}
            margin={{ top: 16, right: 32, left: 0, bottom: 8 }}
          >
            <CartesianGrid stroke="#e0e0e0" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#777777"
              tick={{ fill: "#777777", fontSize: 12 }}
              axisLine={{ stroke: "#d0d0d0" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              stroke="#777777"
              tick={{ fill: "#777777", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <YAxis yAxisId="price" orientation="left" hide domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#111111" }}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <Bar yAxisId="vol" dataKey="volume" fill="#c5d8e8" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#1a9e4a"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
