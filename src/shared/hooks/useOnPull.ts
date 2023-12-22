import { useCallback, useEffect, useRef } from "react";
// 模拟手机顶部下拉动作
const useOnPull = onRefresh => {
  const startY = useRef(null);
  const longPressTimer = useRef(null);
  const handleTouchStart = useCallback(
    event => {
      const scrollTop = window.scrollY || window.pageYOffset;
      if (scrollTop === 0) {
        startY.current = event.touches[0].clientY;
        longPressTimer.current = setTimeout(() => {
          if (startY.current !== null && onRefresh) {
            onRefresh();
          }
        }, 500); // 设置长按时间阈值
      }
    },
    [onRefresh],
  );
  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  const handleTouchMove = useCallback(
    event => {
      if (startY.current === null) {
        return;
      }
      const deltaY = event?.touches?.[0]?.clientY - startY.current;
      if (deltaY > 0) {
        onRefresh();
      }
      startY.current = null;
    },
    [onRefresh],
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (longPressTimer) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart, longPressTimer]);
  return null;
};

export default useOnPull;
