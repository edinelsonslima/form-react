import { useCallback, useEffect, useRef } from 'react';

function useDebounce() {
  const timeoutId = useRef<number | null>(null);

  const debounce = useCallback(
    <T extends (...args: unknown[]) => void>(fn: T, ms: number) => {
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
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (!timeoutId.current) return;
      clearTimeout(timeoutId.current);
    };
  }, []);

  return debounce;
}

export default useDebounce;
