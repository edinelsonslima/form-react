import { forwardRef, memo } from 'react';
import Input, { IProps } from '../Base';

import s from './index.module.css';
import useController from './use.controller';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const {
    handleCloseSuggestions,
    handleOpenSuggestions,
    handleUpdateSuggestions,
    handleKeyDownContainer,
    handleInputEnterKeyPress,
    handleMouseEnterSuggestion,
    handleMouseLeaveSuggestion,
    handleMouseDownSuggestion,
    optionSuggestionsInState,
    inputRef,
    ulRef,
    ...rest
  } = useController(props, ref);

  return (
    <div
      className={s['email-container']}
      onBlur={handleCloseSuggestions}
      onFocus={handleOpenSuggestions}
      onKeyDown={handleKeyDownContainer}
    >
      <Input
        {...rest}
        ref={inputRef}
        onKeyDown={handleInputEnterKeyPress}
        onChange={(_, value) => handleUpdateSuggestions(value)}
        autoComplete="off"
        aria-expanded={!!optionSuggestionsInState.length}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="suggestions-container"
      />

      <ul
        ref={ulRef}
        hidden={!optionSuggestionsInState.length}
        aria-labelledby={props.id}
        role="listbox"
        id="suggestions-container"
      >
        {optionSuggestionsInState.map((email, i) => (
          <li
            key={email}
            id={`suggestion-${i}`}
            onMouseDown={handleMouseDownSuggestion}
            onMouseEnter={handleMouseEnterSuggestion}
            onMouseLeave={handleMouseLeaveSuggestion}
            children={email}
            aria-label={email}
            aria-selected={!i ? 'true' : 'false'}
            role="option"
          />
        ))}
      </ul>
    </div>
  );
});

const InputEmail = memo(Component);
export default InputEmail;
