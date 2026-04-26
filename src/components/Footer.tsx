import { T } from "../theme";

export function Footer() {
  return (
    <footer
      className="flex h-[36px] shrink-0 items-center justify-center text-[12px]"
      style={{
        borderTop: `1px solid ${T.border}`,
        background: T.surface,
        color: T.muted,
      }}
    >
      Practice trading platform — No real money involved. Made for the Builder
      workshop.
    </footer>
  );
}