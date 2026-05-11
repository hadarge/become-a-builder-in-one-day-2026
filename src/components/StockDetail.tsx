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
import { useCountUp } from "../hooks/useCountUp";

const PERIODS = ["1D", "5D", "1M", "3M", "6M", "1Y", "3Y", "5Y"] as const;
type Period = (typeof PERIODS)[number];

type Props = { stock: Stock };

export function StockDetail({ stock }: Props) {
  const [period, setPeriod] = useState<Period>("1Y");
  const isUp = stock.changePct >= 0;

  const lineColor = isUp ? "#10b981" : "#f43f5e";
  const lineColorEnd = isUp ? "#06b6d4" : "#fb7185";

  const animatedPrice = useCountUp(stock.price, { duration: 1100, delay: 300 });
  const animatedPct = useCountUp(stock.changePct, {
    duration: 1100,
    delay: 300,
  });

  return (
    <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/55 p-6 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
      <div className="blob pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br from-indigo-300/30 to-violet-300/20 blur-3xl" />
      <div className="blob-2 pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-gradient-to-br from-emerald-200/30 to-sky-200/20 blur-3xl" />

      <div
        className="relative mb-5 flex items-baseline gap-3 rise-in"
        style={{ animationDelay: "320ms" }}
      >
        <span className="rounded-md bg-slate-900/5 px-2 py-1 text-[12px] font-medium tracking-wide text-slate-500">
          {stock.ticker}
        </span>
        <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-[44px] leading-none font-semibold tracking-[-0.5px] tabular-nums text-transparent">
          {stock.currency}
          {animatedPrice.toFixed(2)}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[14px] font-semibold tabular-nums transition-colors ${
            isUp
              ? "bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20"
              : "bg-rose-500/10 text-rose-600 ring-1 ring-inset ring-rose-500/20"
          }`}
        >
          {isUp ? "▲ +" : "▼ "}
          {animatedPct.toFixed(2)}%
        </span>
        <span className="text-[14px] text-slate-500">{stock.name}</span>
      </div>

      <div
        className="relative mb-4 inline-flex w-fit gap-1 rounded-xl border border-white/60 bg-white/50 p-1 backdrop-blur-xl rise-in"
        style={{ animationDelay: "420ms" }}
      >
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`h-8 rounded-lg px-3 text-[13px] font-medium transition-all duration-300 ${
              p === period
                ? "bg-gradient-to-br from-white to-white/70 text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(15,23,42,0.12)]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div
        className="relative min-h-0 flex-1 rise-in"
        style={{ animationDelay: "500ms" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={stock.history}
            margin={{ top: 16, right: 32, left: 0, bottom: 8 }}
          >
            <defs>
              <linearGradient id="priceLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={lineColor} />
                <stop offset="100%" stopColor={lineColorEnd} />
              </linearGradient>
              <linearGradient id="volumeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(15,23,42,0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "rgba(15,23,42,0.08)" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <YAxis yAxisId="price" orientation="left" hide domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: 12,
                fontSize: 12,
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px -12px rgba(15,23,42,0.25)",
              }}
              labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              itemStyle={{ color: "#334155" }}
              cursor={{ fill: "rgba(99,102,241,0.06)" }}
            />
            <Bar
              yAxisId="vol"
              dataKey="volume"
              fill="url(#volumeBar)"
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationBegin={400}
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="url(#priceLine)"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive
              animationBegin={600}
              animationDuration={1600}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
