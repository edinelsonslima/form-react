import { UIEvent, useEffect, useReducer, useRef } from 'react';
import { initialReduce, reducer } from './helper';
import { Props } from './types';

interface Controller {
  options: Props['options'];
}

export function useController({ options }: Controller) {
  const [state, dispatch] = useReducer(reducer, initialReduce);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  const scrollTimeout = useRef<number | null>(null);

  const visibleCount = Math.ceil(state.height / state.itemHeight);
  const startIndex = Math.floor(state.scrollTop / state.itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, options.length);

  const handleScroll = (evt: UIEvent<HTMLDivElement>) => {
    const scrollTop = evt.currentTarget?.scrollTop ?? 0;

    if (scrollTimeout.current) {
      cancelAnimationFrame(scrollTimeout.current);
    }

    scrollTimeout.current = requestAnimationFrame(() => {
      dispatch({ type: 'SET_SCROLL_TOP', payload: scrollTop });
    });
  };

  useEffect(() => {
    dispatch({ type: 'SET_CONTAINER_HEIGHT', payload: containerRef.current?.offsetHeight });
    dispatch({ type: 'SET_ITEM_HEIGHT', payload: itemRef.current?.offsetHeight });
  }, [state.open]);

  useEffect(() => {
    // Corrigir a diferença no calculo por causa dos arredondamentos
    // Os últimos itens não aparecem
    const remainingHeight = Math.max((options.length - endIndex) * state.itemHeight, 0);
    const offsetY = Math.min(startIndex * state.itemHeight, options.length * state.itemHeight);

    contentRef.current?.style.setProperty('height', `${remainingHeight + state.itemHeight * 8}px`);
    contentRef.current?.style.setProperty('transform', `translateY(${offsetY}px)`);
  }, [options.length, startIndex, endIndex, state.itemHeight]);

  return {
    state,
    containerRef,
    contentRef,
    itemRef,
    options,
    visibleOptions: options.slice(startIndex, endIndex),
    dispatch,
    handleScroll,
  };
}
