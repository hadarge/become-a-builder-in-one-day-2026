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
    <section className="flex min-w-0 flex-1 flex-col bg-[#0d1117] p-6">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[14px] text-[#a1a1a1]">{stock.ticker}</span>
        <span className="text-[48px] leading-none font-semibold tracking-[0.35px] text-white">
          {stock.currency}
          {stock.price.toFixed(2)}
        </span>
        <span
          className={`text-[20px] font-medium ${isUp ? "text-[#05df72]" : "text-[#ff6467]"}`}
        >
          {isUp ? "+" : ""}
          {stock.changePct.toFixed(2)}%
        </span>
        <span className="text-[14px] text-[#a1a1a1]">{stock.name}</span>
      </div>

      <div className="mb-4 flex gap-1">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`h-8 rounded px-3 text-[14px] transition-colors ${
              p === period
                ? "bg-[#2a2a2a] font-medium text-white"
                : "text-[#a1a1a1] hover:bg-[#1f1f1f] hover:text-white"
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
            <CartesianGrid stroke="#1f1f1f" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#a1a1a1"
              tick={{ fill: "#a1a1a1", fontSize: 12 }}
              axisLine={{ stroke: "#262626" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              stroke="#a1a1a1"
              tick={{ fill: "#a1a1a1", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <YAxis yAxisId="price" orientation="left" hide domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#eaeaea" }}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar yAxisId="vol" dataKey="volume" fill="#2a3a4a" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#3bd671"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
