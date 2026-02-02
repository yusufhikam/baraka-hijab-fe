import { useRef, useState } from "react";

export default function useZoomImage() {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    // e.stopPropagation();
    // e.preventDefault();

    const newScale = Math.min(
      Math.max(scale + (e.deltaY > 0 ? -0.1 : 0.1), 1),
      4,
    );

    setScale(newScale);
  };

  const startDragging = (e: React.MouseEvent<HTMLImageElement>) => {
    if (scale === 1) return;

    // e.stopPropagation();
    // e.preventDefault();

    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const duringDrag = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!dragging.current) return;

    // e.stopPropagation();
    // e.preventDefault();

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    setPos((prev) => ({ x: prev.x + dx, y: prev.y + dy }));

    last.current = { x: e.clientX, y: e.clientY };
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const doubleClickZoom = () => {
    if (scale === 1) setScale(2);
    else reset();
  };

  return {
    scale,
    pos,
    reset,
    handleWheel,
    startDragging,
    duringDrag,
    endDrag,
    doubleClickZoom,
    dragging,
  };
}
