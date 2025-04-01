import { memo } from 'react';

import { IconArrow } from '@/libs/form/assets/icons/arrow';
import { IconSearch } from '@/libs/form/assets/icons/search';
import { cn, cp } from '@/libs/form/helpers/combine';

import { Input } from '../Base';
import { IProps } from './types';
import { useController } from './use.controller';

import s from './index.module.css';

function InputSelect(props: IProps) {
  const {
    handleKeyDownContainer,
    handleMouseDownOptions,
    handleMouseMoveOptions,
    handleCloseOptions,
    handleOpenOptions,
    handleSelectEnterKeyPress,
    handleUpdateOptions,
    optionsInState,
    isOptionsOpen,
    ulRef,
    ...rest
  } = useController(props);

  return (
    <div
      {...cp(rest.components?.select, s['select-container'])}
      onBlur={handleCloseOptions}
      onFocus={handleOpenOptions}
      onKeyDown={handleKeyDownContainer}
    >
      <Input
        suffix={
          <span className={s['select-suffix']}>
            {isOptionsOpen ? <IconSearch /> : <IconArrow />}
          </span>
        }
        {...rest}
        className={cn(rest.className, isOptionsOpen ? s['select-input-open'] : '')}
        onKeyDown={handleSelectEnterKeyPress}
        onChange={(_, value) => handleUpdateOptions(value)}
        autoComplete="off"
        aria-expanded={!!isOptionsOpen}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="options-container"
      />

      <ul
        {...cp(rest.components?.ul)}
        ref={ulRef}
        hidden={!isOptionsOpen}
        aria-labelledby={props.id}
        role="listbox"
        id="options-container"
      >
        {/* TODO - tentar melhorar essa parte com lista virtualizada */}
        {optionsInState.map(({ key, value, label }, i) => (
          <li
            {...cp(rest.components?.li)}
            key={key}
            id={`option-${i}`}
            onMouseDown={handleMouseDownOptions}
            onMouseMove={handleMouseMoveOptions}
            children={label ?? value}
            aria-label={value}
            aria-selected={!i ? 'true' : 'false'}
            role="option"
          />
        ))}
      </ul>
    </div>
  );
}

export const Select = memo(InputSelect);
