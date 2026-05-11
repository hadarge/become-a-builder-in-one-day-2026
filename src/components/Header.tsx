import { useCountUp } from "../hooks/useCountUp";

type StatCardProps = {
  label: string;
  value: string;
  valueClass?: string;
  accent?: string;
  delay?: number;
};

function StatCard({
  label,
  value,
  valueClass = "text-slate-900",
  accent = "from-indigo-400/30 to-violet-400/20",
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="rise-in group relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 px-5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_8px_24px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-gradient-to-br ${accent} blur-2xl`}
      />
      <span className="relative text-[11px] font-medium whitespace-nowrap text-slate-500 uppercase tracking-[0.4px]">
        {label}
      </span>
      <span
        className={`relative mt-0.5 block text-[16px] font-semibold whitespace-nowrap tabular-nums ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

function fmtMoney(n: number) {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function Header() {
  const cash = useCountUp(100000, { duration: 1400, delay: 200 });
  const total = useCountUp(100000, { duration: 1600, delay: 300 });
  const change = useCountUp(0, { duration: 1200, delay: 400 });
  const changePct = useCountUp(0, { duration: 1200, delay: 400 });

  return (
    <header className="relative mx-4 mt-4 flex h-20 items-center justify-between rounded-2xl border border-white/60 bg-white/50 px-6 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 transition-transform duration-500 hover:rotate-6 hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M3 17l5-5 4 4 8-8" />
            <path d="M14 8h6v6" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[16px] font-semibold tracking-[-0.3px] text-slate-900">
            My Portfolio Demo
          </h1>
          <p className="text-[13px] tracking-[-0.1px] text-slate-500">
            Practice trading, no real money involved
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatCard
          label="Cash Available"
          value={fmtMoney(cash)}
          accent="from-indigo-300/40 to-sky-300/30"
          delay={120}
        />
        <StatCard
          label="Total Portfolio Value"
          value={fmtMoney(total)}
          accent="from-violet-300/40 to-fuchsia-300/30"
          delay={200}
        />
        <StatCard
          label="Daily Change"
          value={`${change >= 0 ? "+" : ""}${change.toFixed(2)} (${
            changePct >= 0 ? "+" : ""
          }${changePct.toFixed(2)}%)`}
          valueClass="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
          accent="from-emerald-300/40 to-teal-300/30"
          delay={280}
        />
      </div>

      <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[14px] font-semibold text-white shadow-lg shadow-emerald-500/30 ring-2 ring-white/70 transition-transform duration-300 hover:scale-110">
        JD
      </div>
    </header>
  );
}
