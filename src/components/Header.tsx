function PangoLogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (28.945 / 25.287)}
      viewBox="0 0 25.287 28.945"
      style={{ color: "#fff" }}
    >
      <path
        fill="currentColor"
        d="M 4.327 27.991 C 3 27.355 1.947 26.455 1.168 25.298 C 0.389 24.141 0 22.819 0 21.339 C 0 19.672 0.461 18.229 1.387 17.006 C 2.309 15.783 3.603 14.626 5.27 13.535 C 4.409 12.443 3.768 11.401 3.34 10.414 C 2.912 9.427 2.698 8.385 2.698 7.294 C 2.698 5.89 3.038 4.634 3.713 3.532 C 4.387 2.424 5.336 1.563 6.559 0.938 C 7.782 0.313 9.175 0 10.732 0 C 12.838 0 14.538 0.554 15.822 1.656 C 17.11 2.764 17.752 4.239 17.752 6.082 C 17.752 7.645 17.258 9.032 16.271 10.255 C 15.284 11.478 13.749 12.751 11.67 14.078 C 13.31 15.898 15.18 17.9 17.286 20.088 C 19.315 18.322 21.706 16.134 24.465 13.535 L 24.465 19.112 C 23.006 20.543 21.591 21.882 20.214 23.132 L 25.287 28.435 L 19.123 28.435 L 16.781 25.94 C 15.377 26.927 14.017 27.678 12.707 28.183 C 11.396 28.693 10.047 28.945 8.67 28.945 C 7.107 28.945 5.665 28.627 4.338 27.991 L 4.327 27.991 Z M 11.407 24.382 C 12.175 24.07 13.014 23.587 13.924 22.94 C 13.431 22.419 12.943 21.915 12.46 21.421 C 11.977 20.927 11.517 20.434 11.072 19.94 L 7.793 16.469 C 6.751 17.143 5.961 17.812 5.413 18.476 C 4.864 19.14 4.596 19.951 4.596 20.916 C 4.596 22.139 5.023 23.099 5.884 23.801 C 6.745 24.503 7.82 24.854 9.126 24.854 C 9.882 24.854 10.639 24.7 11.407 24.388 L 11.407 24.382 Z M 12.208 8.857 C 12.882 8.155 13.222 7.376 13.222 6.515 C 13.222 5.758 12.953 5.128 12.422 4.623 C 11.89 4.119 11.166 3.861 10.255 3.861 C 9.296 3.861 8.528 4.162 7.952 4.76 C 7.382 5.358 7.096 6.164 7.096 7.179 C 7.096 7.831 7.25 8.467 7.563 9.093 C 7.875 9.718 8.369 10.431 9.043 11.237 C 10.475 10.354 11.528 9.559 12.202 8.857 L 12.202 8.857 Z"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="topbar">
      <div className="brand-mark">
        <div className="logo">
          <PangoLogo />
        </div>
        <div>
          <div className="title">Pango Markets</div>
          <div className="sub">Practice Portfolio · Demo</div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="lbl">Cash available</div>
          <div className="val">$100,000.00</div>
        </div>
        <div className="stat">
          <div className="lbl">Portfolio value</div>
          <div className="val">$100,000.00</div>
        </div>
        <div className="stat lift">
          <div className="lbl">Daily change</div>
          <div className="val">+$0.00 · 0.00%</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          className="btn btn-tertiary"
          style={{ padding: "10px 16px", fontSize: "var(--fs-body-sm)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8 3.4 3.4" />
          </svg>
          Settings
        </button>
        <div className="avatar">JD</div>
      </div>
    </header>
  );
}
