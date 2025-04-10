import { memo } from 'react';

import { IconArrow } from '@/libs/form/assets/icons/arrow';
import { IconSearch } from '@/libs/form/assets/icons/search';
import { cn, cp } from '@/libs/form/helpers/combine';

import { Input } from '../Base';
import { IProps } from './types';
import { InputSelectSearch } from './search';
import { useController } from './use.controller';

import s from './index.module.css';

function InputSelect(props: IProps) {
  const {
    handleKeyDownContainer,
    handleMouseDownOptions,
    handleMouseMoveOptions,
    handleDisplayOptions,
    handleUpdateOptions,
    handleBlurContainer,
    optionsInState,
    ulRef,
    open,
    builtinSearch,
    ...rest
  } = useController(props);

  const Suffix = open ? IconSearch : IconArrow;

  return (
    <div
      {...cp(rest.components?.select, s.container)}
      onClick={(evt) => handleDisplayOptions('toggle', evt)}
      onKeyDown={handleKeyDownContainer}
      onBlur={handleBlurContainer}
    >
      <Input
        suffix={<Suffix className={s.suffix} />}
        className={cn(rest.className, open ? s.open : '')}
        autoComplete="off"
        onChange={(_, value) => handleUpdateOptions(value)}
        aria-expanded={open}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="options-container"
        readOnly={rest.readOnly || builtinSearch}
        {...rest}
      />

      {open && (builtinSearch || !!optionsInState.length) && (
        <ul
          {...cp(rest.components?.ul)}
          role="listbox"
          id="options-container"
          aria-labelledby={props.id}
          ref={(ref) => {
            ref?.scrollTo({ top: 0, behavior: 'smooth' });
            ulRef.current = ref;
          }}
        >
          <InputSelectSearch
            shouldRender={!!builtinSearch}
            onChange={(_, value) => handleUpdateOptions(value)}
          />

          {optionsInState.map(({ key, value, label }, i) => (
            <li
              {...cp(rest.components?.li)}
              key={key}
              aria-selected={!i}
              id={`option-${i}`}
              onMouseDown={handleMouseDownOptions}
              onMouseMove={handleMouseMoveOptions}
              children={label ?? value}
              aria-label={value}
              role="option"
            />
          ))}

          {!optionsInState.length && (
            <li {...cp(rest.components?.li)} children="Nenhum item encontrado :(" />
          )}
        </ul>
      )}
    </div>
  );
}

export const Select = memo(InputSelect);
