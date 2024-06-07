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
    handleSelectEmailSuggestion,
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
      <Input {...rest} onChange={(_, value) => handleAddEmailSuggestions(value)} ref={inputRef} />

      <dialog open={!!emailSuggestions.length} id="suggestions-container" ref={dialogRef}>
        {emailSuggestions.map((email, i) => (
          <option
            key={email}
            value={email}
            tabIndex={0}
            id={`suggestion-${i}`}
            onClick={() => handleUpdateEmail(email)}
            onKeyDown={handleSelectEmailSuggestion}
          >
            {email}
          </option>
        ))}
      </dialog>
    </div>
  );
});

const InputEmail = memo(Component);
export default InputEmail;
