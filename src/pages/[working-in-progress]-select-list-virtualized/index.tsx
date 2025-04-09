import { useController } from './use.controller';
import { Props } from './types';
import s from './index.module.css';

export function Root({ options = [], label }: Props) {
  const { state, visibleOptions, containerRef, contentRef, itemRef, dispatch, handleScroll } =
    useController({ options });

  return (
    <div className={s.trigger}>
      <input
        className={s.input}
        onClick={() => dispatch({ type: 'TOGGLE_OPEN' })}
        placeholder={!state.selected ? label : undefined}
        defaultValue={state.selected ? state.selected.label : undefined}
      />

      {state.open && (
        <div ref={containerRef} className={s.container} onScroll={handleScroll}>
          <ul ref={contentRef} className={s.content}>
            {visibleOptions.map((option) => (
              <li
                ref={itemRef}
                key={option.value}
                className={s.item}
                onClick={() => dispatch({ type: 'SET_SELECTED', payload: option })}
                children={option.label}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
