import { T } from "../theme";

type DockStat = {
  label: string;
  value: string;
  accent?: string;
  withArrow?: boolean;
};

const STATS: DockStat[] = [
  { label: "Cash", value: "$100,000.00" },
  { label: "Holdings Value", value: "$0.00" },
  { label: "Total Value", value: "$100,000.00" },
  {
    label: "Gain / Loss",
    value: "+$0.00 (0.00%)",
    accent: T.green,
    withArrow: true,
  },
];

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

export function PortfolioDock() {
  return (
    <section
      className="flex shrink-0 flex-col"
      style={{ borderTop: `1px solid ${T.border}`, background: T.surface }}
    >
      <div
        className="flex h-[72px] items-center gap-8 px-7"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <h2 className="text-[16px] font-extrabold" style={{ color: T.ink }}>
          My Portfolio
        </h2>
        <div className="flex flex-1 items-center justify-end gap-7">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.5px]"
                style={{ color: T.muted }}
              >
                {s.label}
              </span>
              <span
                className="flex items-center gap-1 text-[15px] font-bold"
                style={{ color: s.accent ?? T.ink }}
              >
                {s.withArrow && <ArrowUpIcon className="size-3.5" />}
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}