import { isTruthy } from '@/helpers/is.truthy';
import { sanitize } from '@/helpers/sanitize.string';
import { useDebounce } from '@/hooks/use.debounce';
import {
  Children,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  isValidElement,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IProps } from './types';

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

function extractText(el: ReactNode): string {
  if (isValidElement(el)) {
    return Children.toArray(el.props.children).map(extractText).join('');
  }

  return el?.toString() ?? '';
}

export function useController({ options, onCustomFilter, filterOptionsOnOpen, ...props }: IProps) {
  const debounce = useDebounce();

  const selectRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [optionsInState, _internal_use_only_] = useState<IProps['options']>([]);

  const getCurrentOptions = () => {
    return Array.from(ulRef.current?.children ?? []) as HTMLOptionElement[];
  };

  const handleUpdateOptionsInState = (options: IProps['options'], withDebounce = true) => {
    const isEmpty = !options.length && !optionsInState.length;
    const isSingle = options.length === 1 && optionsInState.length === 1;
    if (isEmpty || isSingle) return;
    if (!withDebounce) return _internal_use_only_(options);
    debounce(() => _internal_use_only_(options), 300);
  };

  const handleUpdateOptions = async (input?: string, withDebounce = true) => {
    if (onCustomFilter) {
      const customFiltered = await onCustomFilter(input);
      return handleUpdateOptionsInState(customFiltered, withDebounce);
    }

    if (!input) return handleUpdateOptionsInState(options, withDebounce);
    const sanitizedInput = sanitize(input);

    const filtered = options
      .filter((option) =>
        sanitize(extractText(option.label) || option.value).includes(sanitizedInput),
      )
      .sort((a, b) => {
        const aValue = sanitize(a.value);
        const bValue = sanitize(b.value);

        if (aValue === input && bValue === input) return 0;
        if (aValue === input) return -1;
        if (bValue === input) return 1;
        return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
      });

    handleUpdateOptionsInState(filtered, withDebounce);
  };

  const handleUpdateSelectValue = (value: string) => {
    selectRef.current!.value = value;
    selectRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
    handleCloseOptions();
  };

  const handleOpenOptions = (evt?: FocusEvent) => {
    if (shouldContinueFocusEvent(['options-container', 'option-'], evt)) return;

    setAttribute(ARIA.ACTIVEDESCENDANT, 'option-0', selectRef.current);

    if (filterOptionsOnOpen) return handleUpdateOptions(selectRef.current?.value, false);
    handleUpdateOptionsInState(options, false);
  };

  const handleCloseOptions = (evt?: FocusEvent) => {
    if (shouldContinueFocusEvent(['options-container', 'option-'], evt)) return;

    !evt && selectRef.current?.focus();
    selectRef.current?.removeAttribute(ARIA.ACTIVEDESCENDANT);
    handleUpdateOptionsInState([], false);
  };

  const handleNavigateOptions = (moveTo: number) => {
    const options = getCurrentOptions();
    const currentIndex = options.findIndex((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    const nextIndex = currentIndex + moveTo;

    const next = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(currentIndex));
      setAttribute(ARIA.SELECTED, 'true', options.at(nextIndex));
      setAttribute(ARIA.ACTIVEDESCENDANT, `option-${nextIndex}`, selectRef.current);
      options.at(nextIndex)?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    };

    const first = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(-1));
      setAttribute(ARIA.SELECTED, 'true', options.at(0));
      setAttribute(ARIA.ACTIVEDESCENDANT, 'option-0', selectRef.current);
      ulRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const last = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(0));
      setAttribute(ARIA.SELECTED, 'true', options.at(-1));
      setAttribute(ARIA.ACTIVEDESCENDANT, `option-${options.length - 1}`, selectRef.current);
      ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight, behavior: 'smooth' });
    };

    if (nextIndex < 0) return last();
    if (nextIndex >= options.length) return first();
    return next();
  };

  const handleKeyDownContainer = (evt: KeyboardEvent<HTMLDivElement>) => {
    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        return handleCloseOptions();

      case 'ArrowDown':
        evt.preventDefault();
        if (!getCurrentOptions().length) handleOpenOptions();
        return handleNavigateOptions(1);

      case 'ArrowUp':
        evt.preventDefault();
        return handleNavigateOptions(-1);
    }
  };

  const handleSelectEnterKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key !== 'Enter' || !getCurrentOptions().length) return;
    evt.preventDefault();

    const selected = getCurrentOptions().find((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    handleUpdateSelectValue(selected?.getAttribute('aria-label') ?? '');
  };

  const handleMouseMoveOptions = (evt: MouseEvent<HTMLLIElement>) => {
    if (isTruthy(evt.currentTarget.getAttribute(ARIA.SELECTED))) return;

    getCurrentOptions().forEach((li) => li.setAttribute(ARIA.SELECTED, 'false'));

    evt.currentTarget.setAttribute(ARIA.SELECTED, 'true');
    selectRef.current?.setAttribute(ARIA.ACTIVEDESCENDANT, evt.currentTarget.id);
  };

  const handleMouseDownOptions = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleUpdateSelectValue(evt.currentTarget.getAttribute('aria-label') ?? '');
  };

  useImperativeHandle(props.ref, () => selectRef.current!, [selectRef]);

  return {
    ulRef,
    ref: selectRef,
    optionsInState,
    isOptionsOpen: !!optionsInState.length,
    handleUpdateOptions,
    handleOpenOptions,
    handleCloseOptions,
    handleKeyDownContainer,
    handleSelectEnterKeyPress,
    handleMouseMoveOptions,
    handleMouseDownOptions,
    ...props,
  };
}
