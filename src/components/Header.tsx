type StatCardProps = {
  label: string;
  value: string;
  valueClass?: string;
};

function StatCard({ label, value, valueClass = "text-[#111111]" }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-[10px] bg-[#ececec] px-6 pt-3 pb-3">
      <span className="text-[12px] whitespace-nowrap uppercase tracking-[0.3px] text-[#666666]">
        {label}
      </span>
      <span className={`text-[16px] font-medium whitespace-nowrap ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#d0d0d0] bg-[#ffffff] px-8">
      <div className="flex flex-col">
        <h1 className="text-[16px] font-semibold tracking-[-0.7125px] text-[#111111]">
          My Portfolio Demo
        </h1>
        <p className="text-[14px] tracking-[-0.15px] text-[#666666]">
          Practice trading, no real money involved
        </p>
      </div>

      <div className="flex items-center gap-6">
        <StatCard label="Cash Available" value="$100,000.00" />
        <StatCard label="Total Portfolio Value" value="$100,000.00" />
        <StatCard
          label="Daily Change"
          value="+0.00 (+0.00%)"
          valueClass="text-[#1a9e4a]"
        />
      </div>

      <div className="flex size-10 items-center justify-center rounded-full bg-[#3bd671] text-[16px] font-semibold text-white">
        JD
      </div>
    </header>
  );
}
