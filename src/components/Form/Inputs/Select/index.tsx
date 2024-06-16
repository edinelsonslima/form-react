import { forwardRef, memo } from 'react';
import Input from '../Base';

import { IProps } from './types';
import useController from './use.controller';

import s from './index.module.css';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const {
    handleKeyDownContainer,
    handleMouseDownOptions,
    handleMouseMoveOptions,
    handleCloseOptions,
    handleOpenOptions,
    handleSelectEnterKeyPress,
    handleUpdateOptions,
    optionsInState,
    selectRef,
    ulRef,
    ...rest
  } = useController(props, ref);

  return (
    <div
      className={s['select-container']}
      onBlur={handleCloseOptions}
      onFocus={handleOpenOptions}
      onKeyDown={handleKeyDownContainer}
    >
      <Input
        {...rest}
        ref={selectRef}
        onKeyDown={handleSelectEnterKeyPress}
        onChange={(_, value) => handleUpdateOptions(value)}
        autoComplete="off"
        aria-expanded={!!optionsInState.length}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="options-container"
      />

      <ul
        ref={ulRef}
        hidden={!optionsInState.length}
        aria-labelledby={props.id}
        role="listbox"
        id="options-container"
      >
        {/* tentar melhorar essa parte com lista virtualizada */}
        {optionsInState.map(({ key, value, label }, i) => (
          <li
            key={key}
            value={value}
            id={`option-${i}`}
            onMouseDown={handleMouseDownOptions}
            onMouseMove={handleMouseMoveOptions}
            children={label}
            aria-label={value}
            aria-selected={!i ? 'true' : 'false'}
            role="option"
          />
        ))}
      </ul>
    </div>
  );
});

const InputSelect = memo(Component);
export default InputSelect;
