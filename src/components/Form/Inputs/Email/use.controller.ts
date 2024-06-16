import isTruthy from '@/helpers/is.truthy';
import {
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IProps } from './types';

const providers = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'msn.com', 'bol.com.br'];

const ARIA = {
  ACTIVEDESCENDANT: 'aria-activedescendant',
  SELECTED: 'aria-selected',
};

const setAttribute = (key: string, value: string, element?: HTMLElement | null) => {
  element?.setAttribute(key, value);
};

const shouldContinueFocusEvent = (safeElementIds: string[], evt?: FocusEvent) => {
  if (!evt) return false;
  const relatedTargetId = evt.relatedTarget?.id ?? '';
  return safeElementIds.some((id) => relatedTargetId.startsWith(id));
};

function useController(props: IProps, ref: ForwardedRef<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [optionSuggestionsInState, _internal_use_only_] = useState<string[]>([]);

  const getCurrentSuggestions = () => {
    return Array.from(ulRef.current?.children ?? []) as HTMLOptionElement[];
  };

  const handleUpdateSateSuggestions = (emails: string[]) => {
    const isEmpty = !emails.length && !optionSuggestionsInState.length;
    const isSingle = emails.length === 1 && optionSuggestionsInState.length === 1;
    if (isEmpty || isSingle) return;
    _internal_use_only_(emails);
  };

  const handleUpdateSuggestions = (value?: string) => {
    const [email] = value?.split('@') ?? [];

    if (!value?.includes('@')) return handleUpdateSateSuggestions([]);

    const suggestions = providers
      .map((provider) => `${email}@${provider}`)
      .filter((email) => email.includes(value));

    handleUpdateSateSuggestions(suggestions.includes(value) ? [] : suggestions);
  };

  const handleUpdateInputValue = (value: string) => {
    inputRef.current!.value = value;
    inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
    handleCloseSuggestions();
  };

  const handleOpenSuggestions = (evt?: FocusEvent) => {
    if (shouldContinueFocusEvent(['suggestions-container', 'suggestion-'], evt)) return;

    setAttribute(ARIA.ACTIVEDESCENDANT, 'suggestion-0', inputRef.current);
    handleUpdateSuggestions(inputRef.current?.value);
  };

  const handleCloseSuggestions = (evt?: FocusEvent) => {
    if (shouldContinueFocusEvent(['suggestions-container', 'suggestion-'], evt)) return;

    !evt && inputRef.current?.focus();
    inputRef.current?.removeAttribute(ARIA.ACTIVEDESCENDANT);
    handleUpdateSateSuggestions([]);
  };

  const handleNavigateSuggestions = (moveTo: number) => {
    const suggestions = getCurrentSuggestions();
    const currentIndex = suggestions.findIndex((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    const nextIndex = currentIndex + moveTo;

    const next = () => {
      setAttribute(ARIA.SELECTED, 'false', suggestions.at(currentIndex));
      setAttribute(ARIA.SELECTED, 'true', suggestions.at(nextIndex));
      setAttribute(ARIA.ACTIVEDESCENDANT, `suggestion-${nextIndex}`, inputRef.current);
    };

    const first = () => {
      setAttribute(ARIA.SELECTED, 'false', suggestions.at(-1));
      setAttribute(ARIA.SELECTED, 'true', suggestions.at(0));
      setAttribute(ARIA.ACTIVEDESCENDANT, 'suggestion-0', inputRef.current);
    };

    const last = () => {
      setAttribute(ARIA.SELECTED, 'false', suggestions.at(0));
      setAttribute(ARIA.SELECTED, 'true', suggestions.at(-1));
      setAttribute(ARIA.ACTIVEDESCENDANT, `suggestion-${suggestions.length - 1}`, inputRef.current);
    };

    if (nextIndex < 0) return last();
    if (nextIndex >= suggestions.length) return first();
    return next();
  };

  const handleKeyDownContainer = (evt: KeyboardEvent<HTMLDivElement>) => {
    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        return handleCloseSuggestions();

      case 'ArrowDown':
        evt.preventDefault();
        if (!getCurrentSuggestions().length) handleOpenSuggestions();
        return handleNavigateSuggestions(1);

      case 'ArrowUp':
        evt.preventDefault();
        return handleNavigateSuggestions(-1);
    }
  };

  const handleInputEnterKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter' || !getCurrentSuggestions().length) return;
    evt.preventDefault();

    const selected = getCurrentSuggestions().find((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    handleUpdateInputValue(selected?.textContent ?? '');
  };

  const handleMouseEnterSuggestion = (evt: MouseEvent<HTMLLIElement>) => {
    getCurrentSuggestions().forEach((li) => li.setAttribute(ARIA.SELECTED, 'false'));

    evt.currentTarget.setAttribute(ARIA.SELECTED, 'true');
    inputRef.current?.setAttribute(ARIA.ACTIVEDESCENDANT, evt.currentTarget.id);
  };

  const handleMouseLeaveSuggestion = (evt: MouseEvent<HTMLLIElement>) => {
    evt.currentTarget.setAttribute(ARIA.SELECTED, 'false');
    inputRef.current?.removeAttribute(ARIA.ACTIVEDESCENDANT);
  };

  const handleMouseDownSuggestion = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleUpdateInputValue(evt.currentTarget.textContent ?? '');
  };

  useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  return {
    inputRef,
    ulRef,
    optionSuggestionsInState,
    handleUpdateSuggestions,
    handleOpenSuggestions,
    handleCloseSuggestions,
    handleKeyDownContainer,
    handleInputEnterKeyPress,
    handleMouseEnterSuggestion,
    handleMouseLeaveSuggestion,
    handleMouseDownSuggestion,
    ...props,
  };
}

export default useController;
