import { useCallback, useEffect, useRef } from 'react';

export function useDebounce() {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(<T extends (...args: unknown[]) => void>(fn: T, ms: number) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const execute = () => {
      fn();

      if (!timeoutId.current) return;
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    };

    timeoutId.current = setTimeout(execute, ms);
  }, []);

  useEffect(() => {
    const currentTimeoutId = timeoutId.current;

    return () => {
      if (!currentTimeoutId) return;
      clearTimeout(currentTimeoutId);
    };
  }, []);

  return debounce;
}
