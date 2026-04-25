type DockStat = {
  label: string;
  value: string;
  valueClass?: string;
  withArrow?: boolean;
};

const STATS: DockStat[] = [
  { label: "Cash", value: "$100,000.00" },
  { label: "Holdings Value", value: "$0.00" },
  { label: "Total Value", value: "$100,000.00" },
  {
    label: "Total Gain/Loss",
    value: "+$0.00 (0.00%)",
    valueClass: "text-[#00c950]",
    withArrow: true,
  },
];

export function PortfolioDock() {
  return (
    <section className="flex flex-col border-t border-[#262626] bg-[#1a1a1a]">
      <div className="flex h-[77px] items-center gap-8 border-b border-[#262626] px-6">
        <h2 className="text-[16px] font-semibold text-[#eaeaea]">My Portfolio</h2>
        <div className="flex flex-1 items-center justify-end gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-[12px] uppercase tracking-[0.3px] text-[#9ea0a3]">
                {s.label}
              </span>
              <span
                className={`flex items-center gap-1 text-[16px] font-medium ${s.valueClass ?? "text-[#eaeaea]"}`}
              >
                {s.withArrow && <span>↑</span>}
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-1 py-12">
        <p className="text-[16px] text-[#a1a1a1]">No holdings yet</p>
        <p className="text-[14px] text-[#a1a1a1]">
          Select a stock and click Buy to start trading
        </p>
      </div>
    </section>
  );
}
