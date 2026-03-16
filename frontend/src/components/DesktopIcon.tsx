import React from "react";

export function DesktopIcon({
  emoji,
  label,
  onOpen,
}: {
  emoji: string;
  label: string;
  onOpen: () => void;
}) {
  return (
    <button
      className="flex w-28 flex-col items-center gap-2 rounded-md p-2 text-white hover:bg-white/12 active:bg-white/20"
      onDoubleClick={onOpen}
      title="Duplo clique para abrir"
    >
      <div className="text-4xl drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">{emoji}</div>
      <div className="text-center text-xs leading-4 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
        {label}
      </div>
    </button>
  );
}

