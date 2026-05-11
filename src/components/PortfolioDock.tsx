export function PortfolioDock() {
  return (
    <section className="dock">
      <div className="dock-l">
        <div className="icn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 17l6-6 4 4 7-8" />
            <path d="M14 7h6v6" />
          </svg>
        </div>
        <div>
          <div className="ttl">My portfolio</div>
          <div className="sub">No holdings yet — start by buying a stock above</div>
        </div>
      </div>

      <div className="dock-stats">
        <div className="dock-stat">
          <div className="lbl">Cash</div>
          <div className="val">$100,000.00</div>
        </div>
        <div className="dock-stat">
          <div className="lbl">Holdings</div>
          <div className="val">$0.00</div>
        </div>
        <div className="dock-stat">
          <div className="lbl">Total value</div>
          <div className="val">
            $100,000.00 <span className="pct">▲ 0.00%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
