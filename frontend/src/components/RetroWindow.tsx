import React, { PropsWithChildren } from "react";
import Draggable from "react-draggable";

type Props = PropsWithChildren<{
  title: string;
  onClose?: () => void;
  width?: number;
  height?: number;
  defaultPos?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
  resizable?: boolean;
  maximizable?: boolean;
  minWidth?: number;
  minHeight?: number;
}>;

export function RetroWindow({
  title,
  onClose,
  width = 520,
  height = 360,
  defaultPos = { x: 80, y: 80 },
  zIndex = 10,
  onFocus,
  resizable = true,
  maximizable = true,
  minWidth = 260,
  minHeight = 180,
  children,
}: Props) {
  // React 19: evitar findDOMNode (que não existe mais)
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState(defaultPos);
  const [size, setSize] = React.useState({ width, height });
  const [maximized, setMaximized] = React.useState(false);

  // Resize (bem simples, canto inferior direito)
  const resizingRef = React.useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  function onPointerMove(e: PointerEvent) {
    const r = resizingRef.current;
    if (!r) return;
    const maxW = Math.max(minWidth, window.innerWidth - 16);
    const maxH = Math.max(minHeight, window.innerHeight - 40 - 16); // 40 = taskbar
    const nextW = Math.min(maxW, Math.max(minWidth, r.startW + (e.clientX - r.startX)));
    const nextH = Math.min(maxH, Math.max(minHeight, r.startH + (e.clientY - r.startY)));
    setSize({ width: nextW, height: nextH });
  }

  function stopResize() {
    resizingRef.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopResize);
  }

  function startResize(e: React.PointerEvent) {
    if (!resizable || maximized) return;
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopResize);
  }

  function toggleMaximize() {
    if (!maximizable) return;
    setMaximized((m) => !m);
  }

  const winStyle: React.CSSProperties = maximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "calc(100vh - 40px)", // taskbar
        zIndex,
      }
    : {
        width: size.width,
        height: size.height,
        zIndex,
      };

  const content = (
    <div
      ref={nodeRef}
      className="dd-window absolute select-none"
      style={winStyle}
      onMouseDown={() => {
        onFocus?.();
      }}
    >
      <div className="dd-titlebar flex h-8 items-center justify-between px-2 text-sm">
        <div className="truncate">{title}</div>
        <div className="flex gap-1">
          {maximizable ? (
            <button className="dd-btn h-6 w-7 p-0 leading-none" onClick={toggleMaximize}>
              {maximized ? "🗗" : "🗖"}
            </button>
          ) : null}
          {onClose ? (
            <button className="dd-btn h-6 w-7 p-0 leading-none" onClick={onClose}>
              X
            </button>
          ) : null}
        </div>
      </div>
      <div className="h-[calc(100%-32px)] p-2 text-sm">{children}</div>

      {resizable && !maximized ? (
        <div
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize opacity-70"
          title="Arraste para redimensionar"
        />
      ) : null}
    </div>
  );

  if (maximized) return content;

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".dd-titlebar"
      bounds="parent"
      position={pos}
      onDrag={(_e, data) => setPos({ x: data.x, y: data.y })}
    >
      {content}
    </Draggable>
  );
}

