import { type PointerEvent, useRef } from "react";

interface UseSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
}

const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 50,
}: UseSwipeOptions) => {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isPointerDown = useRef(false);

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    isPointerDown.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handlePointerUp = (e: PointerEvent<HTMLElement>) => {
    if (
      !isPointerDown.current ||
      startX.current === null ||
      startY.current === null
    ) {
      reset();
      return;
    }

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    const isHorizontalSwipe =
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) >= minSwipeDistance;

    if (isHorizontalSwipe) {
      if (deltaX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }

    reset();
  };

  const handlePointerCancel = () => {
    reset();
  };

  const reset = () => {
    isPointerDown.current = false;
    startX.current = null;
    startY.current = null;
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };
};

export default useSwipe;
