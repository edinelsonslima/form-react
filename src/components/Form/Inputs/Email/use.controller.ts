import { FocusEvent, ForwardedRef, useImperativeHandle, useRef, useState } from 'react';
import { IProps } from './types';

const providers = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'msn.com', 'bol.com.br'];

function useController(props: IProps, ref: ForwardedRef<HTMLInputElement>) {
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateEmailSuggestions = (emails: string[]) => {
    const isEmpty = !emails.length && !emailSuggestions.length;
    const isSingle = emails.length === 1 && emailSuggestions.length === 1;
    if (isEmpty || isSingle) return;
    setEmailSuggestions(emails);
  };

  const handleAddEmailSuggestions = (value: string) => {
    const [email] = value.split('@');

    if (!value?.includes('@')) return updateEmailSuggestions([]);

    const suggestions = providers
      .map((provider) => `${email}@${provider}`)
      .filter((email) => email.includes(value));

    updateEmailSuggestions(suggestions.includes(value) ? [] : suggestions);
  };

  const handleUpdateEmail = (value: string) => {
    inputRef.current!.value = value;
    inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));

    updateEmailSuggestions([]);
  };

  const handleOpenSuggestions = (evt: FocusEvent) => {
    if (evt.relatedTarget?.id === 'email') return;
    handleAddEmailSuggestions(inputRef.current?.value ?? '');
  };

  const handleCloseSuggestions = (evt: FocusEvent) => {
    if (evt.relatedTarget?.id === 'suggestions-container') return;
    updateEmailSuggestions([]);
  };

  useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  return {
    inputRef,
    emailSuggestions,
    handleUpdateEmail,
    handleAddEmailSuggestions,
    handleOpenSuggestions,
    handleCloseSuggestions,
    ...props,
  };
}

export default useController;
