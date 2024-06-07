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
    emailSuggestions,
    inputRef,
    ...rest
  } = useController(props, ref);

  console.count('render');
  return (
    <div
      className={s['email-container']}
      onBlur={handleCloseSuggestions}
      onFocus={handleOpenSuggestions}
    >
      <Input {...rest} onChange={(_, value) => handleAddEmailSuggestions(value)} ref={inputRef} />

      <dialog open={!!emailSuggestions.length} id="suggestions-container">
        {emailSuggestions.map((email) => (
          <option key={email} onClick={() => handleUpdateEmail(email)}>
            {email}
          </option>
        ))}
      </dialog>
    </div>
  );
});

const InputEmail = memo(Component);
export default InputEmail;
