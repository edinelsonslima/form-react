import { forwardRef, memo } from 'react';
import Input, { IProps } from '../Base';

import s from './index.module.css';
import useController from './use.controller';

const Component = forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const {
    handleCloseSuggestions,
    handleOpenSuggestions,
    handleAddEmailSuggestions,
    handleUpdateEmail,
    handleNavigateEmailSuggestions,
    handleInputEnterKeyPress,
    handleMouseEnterSuggestion,
    handleMouseLeaveSuggestion,
    emailSuggestions,
    inputRef,
    dialogRef,
    ...rest
  } = useController(props, ref);

  return (
    <div
      className={s['email-container']}
      onBlur={handleCloseSuggestions}
      onFocus={handleOpenSuggestions}
      onKeyDown={handleNavigateEmailSuggestions}
    >
      <Input
        {...rest}
        ref={inputRef}
        onKeyDown={handleInputEnterKeyPress}
        onChange={(_, value) => handleAddEmailSuggestions(value)}
        aria-expanded={!!emailSuggestions.length}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-owns="suggestions-container"
      />

      <dialog
        ref={dialogRef}
        open={!!emailSuggestions.length}
        aria-labelledby={props.id}
        role="listbox"
        id="suggestions-container"
      >
        {emailSuggestions.map((email, i) => (
          <option
            key={email}
            value={email}
            id={`suggestion-${i}`}
            aria-selected={!i ? 'true' : 'false'}
            onClick={() => handleUpdateEmail(email)}
            onMouseEnter={handleMouseEnterSuggestion}
            onMouseLeave={handleMouseLeaveSuggestion}
            children={email}
          />
        ))}
      </dialog>
    </div>
  );
});

const InputEmail = memo(Component);
export default InputEmail;
