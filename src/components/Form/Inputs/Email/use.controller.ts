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
    handleCloseSuggestions();
  };

  const handleOpenSuggestions = (evt?: FocusEvent) => {
    if (evt) {
      const relatedTargetId = evt.relatedTarget?.id ?? '';
      const safeElementIds = ['email', 'suggestion-'];
      if (safeElementIds.some((id) => relatedTargetId.startsWith(id))) return;
    }

    handleAddEmailSuggestions(inputRef.current?.value);
  };

  const handleCloseSuggestions = (evt?: FocusEvent) => {
    if (evt) {
      const relatedTargetId = evt.relatedTarget?.id ?? '';
      const safeElementIds = ['suggestions-container', 'suggestion-'];
      if (safeElementIds.some((id) => relatedTargetId.startsWith(id))) return;
    }

    inputRef.current?.removeAttribute('aria-activedescendant');
    inputRef.current?.focus();
    updateEmailSuggestions([]);
  };

  const handleNavigateEmailSuggestions = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Escape') return handleCloseSuggestions();
    if (evt.key !== 'ArrowDown' && evt.key !== 'ArrowUp') return;
    if (evt.key === 'ArrowDown' && !emailSuggestions.length) handleOpenSuggestions();

    evt.preventDefault();

    const suggestions = Array.from(dialogRef.current?.children ?? []) as HTMLOptionElement[];
    const currentIndex = suggestions.findIndex((li) => li.getAttribute('aria-selected') === 'true');

    const nextIndex = evt.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
    const setAttribute = (i: number) =>
      inputRef.current?.setAttribute('aria-activedescendant', `suggestion-${i}`);

    if (nextIndex < 0) {
      suggestions.at(0)?.setAttribute('aria-selected', 'false');
      suggestions.at(-1)?.setAttribute('aria-selected', 'true');
      return setAttribute(suggestions.length - 1);
    }

    if (nextIndex >= suggestions.length) {
      suggestions.at(-1)?.setAttribute('aria-selected', 'false');
      suggestions.at(0)?.setAttribute('aria-selected', 'true');
      return setAttribute(0);
    }

    suggestions.at(currentIndex)?.setAttribute('aria-selected', 'false');
    suggestions.at(nextIndex)?.setAttribute('aria-selected', 'true');
    setAttribute(nextIndex);
  };

  const handleInputEnterKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter' || !emailSuggestions.length) return;
    evt.preventDefault();

    const suggestions = Array.from(dialogRef.current?.children ?? []) as HTMLOptionElement[];
    const selected = suggestions.find((li) => li.getAttribute('aria-selected') === 'true');
    handleUpdateEmail(selected?.value ?? '');
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
    handleNavigateEmailSuggestions,
    handleInputEnterKeyPress,
    ...props,
  };
}

export default useController;
