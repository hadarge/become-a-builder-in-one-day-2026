type Props = { id: string };

export function DragGrip({ id }: Props) {
  return (
    <button
      className="drag-grip"
      draggable
      title="Drag to swap with the other card"
      aria-label="Drag to swap"
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={(e) => e.preventDefault()}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="3" r="1.4" />
        <circle cx="11" cy="3" r="1.4" />
        <circle cx="5" cy="8" r="1.4" />
        <circle cx="11" cy="8" r="1.4" />
        <circle cx="5" cy="13" r="1.4" />
        <circle cx="11" cy="13" r="1.4" />
      </svg>
    </button>
  );
}
