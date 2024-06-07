import {
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IProps } from './types';

const providers = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'msn.com', 'bol.com.br'];

function useController(props: IProps, ref: ForwardedRef<HTMLInputElement>) {
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const updateEmailSuggestions = (emails: string[]) => {
    const isEmpty = !emails.length && !emailSuggestions.length;
    const isSingle = emails.length === 1 && emailSuggestions.length === 1;
    if (isEmpty || isSingle) return;
    setEmailSuggestions(emails);
  };

  const handleAddEmailSuggestions = (value?: string) => {
    const [email] = value?.split('@') ?? [];

    if (!value?.includes('@')) return updateEmailSuggestions([]);

    const suggestions = providers
      .map((provider) => `${email}@${provider}`)
      .filter((email) => email.includes(value));

    updateEmailSuggestions(suggestions.includes(value) ? [] : suggestions);
  };

  const handleUpdateEmail = (value: string) => {
    inputRef.current!.value = value;
    inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
    inputRef.current?.focus();
    updateEmailSuggestions([]);
  };

  const handleOpenSuggestions = (evt: FocusEvent) => {
    const relatedTargetId = evt.relatedTarget?.id ?? '';
    const safeElementIds = ['email', 'suggestion-'];
    if (safeElementIds.some((id) => relatedTargetId.startsWith(id))) return;
    handleAddEmailSuggestions(inputRef.current?.value);
  };

  const handleCloseSuggestions = (evt: FocusEvent) => {
    const relatedTargetId = evt.relatedTarget?.id ?? '';
    const safeElementIds = ['suggestions-container', 'suggestion-'];
    if (safeElementIds.some((id) => relatedTargetId.startsWith(id))) return;
    updateEmailSuggestions([]);
  };

  const handleNavigateEmailSuggestions = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;

    if (evt.key === 'ArrowDown' && !emailSuggestions.length) {
      handleAddEmailSuggestions(inputRef.current?.value);
    }

    const suggestions = Array.from(dialogRef.current?.children ?? []) as HTMLLIElement[];
    const currentIndex = suggestions.findIndex((li) => li === document.activeElement);

    const nextIndex = evt.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
    const nextElement = suggestions[nextIndex];

    if (nextIndex < 0) return inputRef.current?.focus();
    if (nextIndex >= suggestions.length) return; // focar no proximo elemento na lista do tab
    if (!nextElement) return dialogRef.current?.blur();

    nextElement.focus();
  };

  const handleSelectEmailSuggestion = (evt: KeyboardEvent<HTMLOptionElement>) => {
    if (evt.key !== 'Enter' && evt.key !== ' ') return;
    evt.preventDefault();
    handleUpdateEmail(evt.currentTarget.value);
  };

  useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  return {
    inputRef,
    dialogRef,
    emailSuggestions,
    handleUpdateEmail,
    handleAddEmailSuggestions,
    handleOpenSuggestions,
    handleCloseSuggestions,
    handleSelectEmailSuggestion,
    handleNavigateEmailSuggestions,
    ...props,
  };
}

export default useController;
