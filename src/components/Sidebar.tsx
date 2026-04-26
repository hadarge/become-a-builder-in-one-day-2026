import type { ReactNode } from "react";
import { T } from "../theme";

function NavItem({
  icon,
  label,
  active,
  sub,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  sub?: boolean;
}) {
  return (
    <button
      className="relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold transition-colors"
      style={{
        background: active ? T.pink : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.78)",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = T.navyHover;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex-1 text-left whitespace-nowrap">{label}</span>
      {sub && (
        <svg
          viewBox="0 0 16 16"
          className="size-3 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      )}
    </button>
  );
}

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      {children}
    </svg>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#080E3F" />
      <path
        d="M9 16.5 L 14 21 L 23 11"
        stroke="#00BEA6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside
      className="flex w-[212px] shrink-0 flex-col"
      style={{ background: T.navy, color: "#fff" }}
    >
      <div
        className="flex h-[60px] items-center justify-between px-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <Mark />
          <span className="text-[15px] font-extrabold tracking-[-0.3px]">
            trading
          </span>
        </div>
        <button
          className="inline-flex size-7 items-center justify-center rounded text-white/60 hover:text-white"
          title="Collapse"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 4 6 8l4 4" />
            <path d="M3 3v10" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        <NavItem
          active
          icon={
            <NavIcon>
              <path d="M2 4h12M2 8h12M2 12h8" />
            </NavIcon>
          }
          label="Markets"
        />
        <NavItem
          icon={
            <NavIcon>
              <circle cx="8" cy="8" r="5" />
              <path d="m12 12 2 2" />
            </NavIcon>
          }
          label="Discover"
          sub
        />
        <NavItem
          icon={
            <NavIcon>
              <rect x="2" y="4" width="12" height="9" rx="1.5" />
              <path d="M2 7h12" />
            </NavIcon>
          }
          label="My Portfolio"
          sub
        />
        <NavItem
          icon={
            <NavIcon>
              <path d="M3 12V8M7 12V5M11 12V9" strokeWidth="2" />
            </NavIcon>
          }
          label="Performance"
          sub
        />
        <NavItem
          icon={
            <NavIcon>
              <path d="m2 11 4-4 3 3 5-6" />
              <path d="M14 4h-4M14 4v4" />
            </NavIcon>
          }
          label="Insights"
          sub
        />
        <NavItem
          icon={
            <NavIcon>
              <circle cx="8" cy="6" r="3" />
              <path d="M2 14c0-3 3-5 6-5s6 2 6 5" />
            </NavIcon>
          }
          label="Watchlist"
          sub
        />
        <NavItem
          icon={
            <NavIcon>
              <rect x="3" y="3" width="4" height="4" rx="0.5" />
              <rect x="9" y="3" width="4" height="4" rx="0.5" />
              <rect x="3" y="9" width="4" height="4" rx="0.5" />
              <rect x="9" y="9" width="4" height="4" rx="0.5" />
            </NavIcon>
          }
          label="Strategies"
          sub
        />
      </nav>

      <div
        className="flex flex-col gap-0.5 p-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <NavItem
          icon={
            <NavIcon>
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l3 1" />
            </NavIcon>
          }
          label="Recent Activity"
        />
        <NavItem
          icon={
            <NavIcon>
              <circle cx="8" cy="8" r="2" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4" />
            </NavIcon>
          }
          label="Account Settings"
        />
        <NavItem
          icon={
            <NavIcon>
              <circle cx="8" cy="8" r="6" />
              <path d="M6 6.5a2 2 0 1 1 3 1.5c-.5.4-1 .8-1 1.5" />
              <circle cx="8" cy="12" r="0.5" fill="currentColor" />
            </NavIcon>
          }
          label="Help"
        />
      </div>
    </aside>
  );
}