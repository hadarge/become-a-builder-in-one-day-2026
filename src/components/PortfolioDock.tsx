import { useCountUp } from "../hooks/useCountUp";

function fmtMoney(n: number) {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function PortfolioDock() {
  const cash = useCountUp(100000, { duration: 1400, delay: 500 });
  const holdings = useCountUp(0, { duration: 1200, delay: 560 });
  const total = useCountUp(100000, { duration: 1600, delay: 620 });
  const gain = useCountUp(0, { duration: 1100, delay: 680 });
  const gainPct = useCountUp(0, { duration: 1100, delay: 680 });

  const stats: {
    label: string;
    value: string;
    valueClass?: string;
    withArrow?: boolean;
    delay: number;
  }[] = [
    { label: "Cash", value: fmtMoney(cash), delay: 480 },
    { label: "Holdings Value", value: fmtMoney(holdings), delay: 540 },
    { label: "Total Value", value: fmtMoney(total), delay: 600 },
    {
      label: "Total Gain/Loss",
      value: `+${fmtMoney(gain)} (${gainPct.toFixed(2)}%)`,
      valueClass:
        "bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent",
      withArrow: true,
      delay: 660,
    },
  ];

  return (
    <section className="relative mx-4 mb-2 flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/55 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
      <div className="blob-3 pointer-events-none absolute -top-20 right-1/4 size-60 rounded-full bg-gradient-to-br from-violet-300/30 to-fuchsia-300/20 blur-3xl" />

      <div className="relative flex h-[72px] items-center gap-8 border-b border-white/60 px-6">
        <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
          My Portfolio
        </h2>
        <div className="flex flex-1 items-center justify-end gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rise-in flex flex-col"
              style={{ animationDelay: `${s.delay}ms` }}
            >
              <span className="text-[11px] font-medium tracking-[0.4px] text-slate-500 uppercase">
                {s.label}
              </span>
              <span
                className={`flex items-center gap-1 text-[16px] font-semibold tabular-nums ${s.valueClass ?? "text-slate-900"}`}
              >
                {s.withArrow && <span className="text-emerald-500">↑</span>}
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rise-in relative flex flex-1 flex-col items-center justify-center gap-1 py-10"
        style={{ animationDelay: "780ms" }}
      >
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 ring-1 ring-inset ring-indigo-500/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-indigo-500"
          >
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
        <p className="text-[15px] font-medium text-slate-700">No holdings yet</p>
        <p className="text-[13px] text-slate-500">
          Select a stock and click Buy to start trading
        </p>
      </div>
    </section>
  );
}
