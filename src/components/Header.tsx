import { T } from "../theme";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" strokeLinecap="round" />
    </svg>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className="flex flex-col gap-0.5 rounded-md border px-4 py-2"
      style={{ borderColor: T.border, background: T.surface }}
    >
      <span
        className="text-[11px] font-semibold whitespace-nowrap tracking-[0.3px]"
        style={{ color: T.muted }}
      >
        {label}
      </span>
      <span
        className="text-[16px] font-extrabold whitespace-nowrap tracking-[-0.3px]"
        style={{ color: accent ?? T.ink }}
      >
        {value}
      </span>
    </div>
  );
}

export function Header() {
  return (
    <header
      className="flex h-[60px] shrink-0 items-center justify-between border-b pr-5 pl-6"
      style={{ borderColor: T.border, background: T.surface }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <h1
          className="text-[15px] font-extrabold whitespace-nowrap tracking-[-0.2px]"
          style={{ color: T.ink }}
        >
          My Portfolio
        </h1>
        <span className="text-[13px]" style={{ color: T.borderStrong }}>
          |
        </span>
        <span className="text-[13px] font-semibold" style={{ color: T.muted }}>
          Markets Overview
        </span>
        <div className="relative ml-4 hidden w-[320px] md:flex">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            placeholder="Search"
            className="h-9 w-full rounded-md border pr-3 pl-9 text-[13px] outline-none transition-colors"
            style={{
              borderColor: T.border,
              background: T.canvas,
              color: T.text,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = T.pink;
              e.target.style.background = T.surface;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = T.border;
              e.target.style.background = T.canvas;
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <StatPill label="Cash Available" value="$100,000.00" />
        <StatPill label="Portfolio Value" value="$100,000.00" />
        <StatPill
          label="Daily Change"
          value="+0.00 (+0.00%)"
          accent={T.green}
        />
        <div className="mx-1 h-7 w-px" style={{ background: T.border }} />
        <button
          className="inline-flex size-9 items-center justify-center rounded-md text-[13px] font-semibold transition-colors"
          style={{ color: T.muted }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.canvas)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.2 3.2l.7.7M12.1 12.1l.7.7M3.2 12.8l.7-.7M12.1 3.9l.7-.7" />
            <circle cx="8" cy="8" r="3" />
          </svg>
        </button>
        <div
          className="flex size-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
          style={{ background: T.pink }}
        >
          JD
        </div>
      </div>
    </header>
  );
}