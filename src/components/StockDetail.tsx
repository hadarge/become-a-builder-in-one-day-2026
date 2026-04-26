import { useEffect, useRef, useState } from "react";
import type { Stock } from "../types";
import { T } from "../theme";

const PERIODS = ["1D", "5D", "1M", "3M", "6M", "1Y", "3Y", "5Y"] as const;
type Period = (typeof PERIODS)[number];

type Props = {
  stock: Stock;
  isStarred: boolean;
  onToggleStar: (ticker: string) => void;
};

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

function Chart({
  data,
  isUp,
  currency,
}: {
  data: Stock["history"];
  isUp: boolean;
  currency: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 400 });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.max(300, width), h: Math.max(200, height) });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const padTop = 20;
  const padRight = 56;
  const padLeft = 20;
  const padBottom = 32;
  const w = size.w;
  const h = size.h;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  const volMax = Math.max(...data.map((d) => d.volume));
  const priceMin = Math.min(...data.map((d) => d.price));
  const priceMax = Math.max(...data.map((d) => d.price));
  const priceRange = priceMax - priceMin || 1;

  const barW = (innerW / data.length) * 0.55;
  const barGap = innerW / data.length;

  const linePoints = data.map((d, i) => {
    const x = padLeft + barGap * i + barGap / 2;
    const y =
      padTop +
      innerH -
      ((d.price - priceMin) / priceRange) * innerH * 0.85 -
      innerH * 0.1;
    return [x, y] as const;
  });
  const linePath = linePoints
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(" ");
  const areaPath = `${linePath} L ${linePoints[linePoints.length - 1][0]} ${
    padTop + innerH
  } L ${linePoints[0][0]} ${padTop + innerH} Z`;
  const lineColor = isUp ? T.green : T.red;
  const areaColor = isUp ? T.greenSoft : T.redSoft;
  const volTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(volMax * t));
  const gradId = `g-${isUp ? "up" : "down"}`;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let best = 0;
    let bestDist = Infinity;
    linePoints.forEach((p, i) => {
      const d = Math.abs(p[0] - x);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setHoverIdx(best);
  };
  const onLeave = () => setHoverIdx(null);

  let tip: {
    d: Stock["history"][number];
    prev: Stock["history"][number] | null;
    delta: number;
    deltaPct: number;
    up: boolean;
    px: number;
    py: number;
    tx: number;
    ty: number;
    tipW: number;
    tipH: number;
  } | null = null;
  if (hoverIdx !== null) {
    const d = data[hoverIdx];
    const prev = hoverIdx > 0 ? data[hoverIdx - 1] : null;
    const delta = prev ? d.price - prev.price : 0;
    const deltaPct = prev ? (delta / prev.price) * 100 : 0;
    const up = delta >= 0;
    const [px, py] = linePoints[hoverIdx];
    const tipW = 188;
    const tipH = 92;
    const right = px + 14 + tipW > w - padRight;
    const tx = right ? px - 14 - tipW : px + 14;
    const ty = Math.max(padTop, Math.min(py - tipH / 2, h - padBottom - tipH));
    tip = { d, prev, delta, deltaPct, up, px, py, tx, ty, tipW, tipH };
  }

  return (
    <div ref={ref} className="size-full">
      <svg
        width={w}
        height={h}
        className="block"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={areaColor} stopOpacity="1" />
            <stop offset="100%" stopColor={areaColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {volTicks.map((v, i) => {
          const y = padTop + innerH - (v / volMax) * innerH;
          return (
            <g key={i}>
              <line
                x1={padLeft}
                x2={w - padRight}
                y1={y}
                y2={y}
                stroke={T.border}
                strokeDasharray="2 4"
              />
              <text
                x={w - padRight + 8}
                y={y + 4}
                fill={T.muted}
                fontSize="11"
                fontWeight="600"
              >
                {v.toLocaleString()}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = padLeft + barGap * i + (barGap - barW) / 2;
          const barH = (d.volume / volMax) * innerH;
          const y = padTop + innerH - barH;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={barH}
              fill={T.pinkSoft}
              rx="6"
            />
          );
        })}
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {tip && (
          <line
            x1={tip.px}
            x2={tip.px}
            y1={padTop}
            y2={padTop + innerH}
            stroke={T.pink}
            strokeDasharray="3 3"
            strokeWidth="1"
            opacity="0.6"
          />
        )}

        {linePoints.map((p, i) => {
          const isHover = hoverIdx === i;
          return (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={isHover ? 6 : 3}
              fill={isHover ? lineColor : "#fff"}
              stroke={lineColor}
              strokeWidth={isHover ? 3 : 2}
              style={{ transition: "r 120ms ease, fill 120ms ease" }}
            />
          );
        })}

        {data.map((d, i) => {
          const x = padLeft + barGap * i + barGap / 2;
          const isHover = hoverIdx === i;
          return (
            <text
              key={i}
              x={x}
              y={h - 10}
              fill={isHover ? T.pink : T.muted}
              fontSize="11"
              fontWeight={isHover ? "800" : "600"}
              textAnchor="middle"
            >
              {d.month}
            </text>
          );
        })}

        {tip && (
          <g
            transform={`translate(${tip.tx}, ${tip.ty})`}
            style={{ pointerEvents: "none" }}
          >
            <rect
              x="0"
              y="0"
              width={tip.tipW}
              height={tip.tipH}
              rx="14"
              ry="14"
              fill="#fff"
              stroke={T.borderStrong}
              filter="drop-shadow(0 8px 20px rgba(26,14,20,0.12))"
            />
            <text
              x="14"
              y="22"
              fill={T.muted}
              fontSize="11"
              fontWeight="700"
              style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
            >
              {tip.d.month}
            </text>
            <text x="14" y="44" fill={T.ink} fontSize="18" fontWeight="800">
              {currency}
              {tip.d.price.toFixed(2)}
            </text>
            {tip.prev ? (
              (() => {
                const label = `${tip.up ? "▲" : "▼"}  ${
                  tip.up ? "+" : ""
                }${tip.delta.toFixed(2)}  (${
                  tip.up ? "+" : ""
                }${tip.deltaPct.toFixed(2)}%)`;
                const pillW = Math.min(
                  tip.tipW - 28,
                  Math.max(108, label.length * 6.4 + 18),
                );
                const pillH = 22;
                return (
                  <g transform="translate(14, 54)">
                    <rect
                      x="0"
                      y="0"
                      rx={pillH / 2}
                      ry={pillH / 2}
                      width={pillW}
                      height={pillH}
                      fill={tip.up ? T.greenSoft : T.redSoft}
                      stroke={tip.up ? T.green : T.red}
                      strokeOpacity="0.25"
                    />
                    <text
                      x={pillW / 2}
                      y="15"
                      fontSize="11"
                      fontWeight="800"
                      fill={tip.up ? T.green : T.red}
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  </g>
                );
              })()
            ) : (
              <text
                x="14"
                y="70"
                fill={T.muted}
                fontSize="11"
                fontWeight="600"
              >
                First data point
              </text>
            )}
            <text
              x={tip.tipW - 14}
              y="22"
              fill={T.muted}
              fontSize="10"
              fontWeight="700"
              textAnchor="end"
            >
              VOL {tip.d.volume.toLocaleString()}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export function StockDetail({ stock, isStarred, onToggleStar }: Props) {
  const [period, setPeriod] = useState<Period>("1Y");
  const isUp = stock.changePct >= 0;

  return (
    <section
      className="flex min-w-0 flex-1 flex-col gap-5 p-7"
      style={{ background: T.canvas }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.5px]"
              style={{ background: T.pinkSoft, color: T.pink }}
            >
              {stock.ticker}
            </span>
            <span
              className="text-[13px] font-semibold"
              style={{ color: T.muted }}
            >
              {stock.name}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <span
              className="text-[52px] leading-[1] font-extrabold tracking-[-1.2px]"
              style={{ color: T.ink }}
            >
              {stock.currency}
              {stock.price.toFixed(2)}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[15px] font-bold"
              style={{
                background: isUp ? T.greenSoft : T.redSoft,
                color: isUp ? T.green : T.red,
              }}
            >
              {isUp ? (
                <ArrowUpIcon className="size-3.5" />
              ) : (
                <ArrowDownIcon className="size-3.5" />
              )}
              {isUp ? "+" : ""}
              {stock.changePct.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStar(stock.ticker)}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-[13px] font-semibold transition-colors"
            style={{
              borderColor: isStarred ? T.pink : T.border,
              background: isStarred ? T.pinkSoft : T.surface,
              color: isStarred ? T.pink : T.muted,
            }}
          >
            <StarIcon filled={isStarred} className="size-4" />
            {isStarred ? "On Watchlist" : "Add to Watchlist"}
          </button>
          <button
            className="h-10 rounded-md px-5 text-[14px] font-bold text-white transition-all"
            style={{
              background: T.pink,
              boxShadow: "0 4px 12px rgba(90,76,255,0.32)",
            }}
          >
            Buy
          </button>
        </div>
      </div>

      <div
        className="flex gap-1 self-start rounded-full p-1"
        style={{ background: T.surface, border: `1px solid ${T.border}` }}
      >
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="h-8 rounded-full px-3.5 text-[13px] font-semibold transition-colors"
            style={{
              background: p === period ? T.ink : "transparent",
              color: p === period ? "#fff" : T.muted,
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div
        className="min-h-0 flex-1 rounded-3xl p-4"
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          boxShadow: "0 1px 2px rgba(26,14,20,0.04)",
        }}
      >
        <Chart data={stock.history} isUp={isUp} currency={stock.currency} />
      </div>
    </section>
  );
}