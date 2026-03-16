import React from "react";
import { RetroWindow } from "./RetroWindow";

export function SimpleInfoWindow({
  open,
  onClose,
  title,
  children,
  width = 520,
  height = 320,
  defaultPos,
  zIndex,
  onFocus,
}: React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  height?: number;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}>) {
  if (!open) return null;
  return (
    <RetroWindow
      title={title}
      onClose={onClose}
      width={width}
      height={height}
      defaultPos={defaultPos}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="dd-inset h-full overflow-auto p-2 text-sm">{children}</div>
    </RetroWindow>
  );
}

