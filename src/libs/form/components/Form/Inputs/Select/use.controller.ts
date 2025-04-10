import { isTruthy } from '@/libs/form/helpers/is.truthy';
import { sanitize } from '@/libs/form/helpers/sanitize.string';
import { useDebounce } from '@/libs/form/hooks/use.debounce';
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

function extractText(el: ReactNode): string {
  if (isValidElement<{ children: ReactNode }>(el) && el.props.children) {
    return Children.toArray(el.props.children).map(extractText).join('');
  }

  if (isValidElement<{ children: ReactNode }>(el) && !el.props.children) {
    return Object.values(el.props).map(extractText).join('');
  }

  return el?.toString() ?? '';
}

export function useController({
  options,
  onCustomFilter,
  filterOptionsOnOpen,
  openBy = 'click',
  ...props
}: IProps) {
  const debounce = useDebounce();

  const searchAccReadOnly = useRef('');
  const selectRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(() => {
    return openBy === 'options-length' ? !!options.length : false;
  });

  const [optionsInState, setOptionInState] = useState<IProps['options']>([]);

  const getCurrentOptions = () => {
    const currentOptions = Array.from(ulRef.current?.children ?? []) as HTMLLIElement[];
    const searchInput = currentOptions.findIndex((option) => !(option instanceof HTMLLIElement));
    return searchInput === -1 ? currentOptions : currentOptions.slice(searchInput + 1);
  };

  const handleUpdateOptionsInState = (options: IProps['options'], withDebounce = true) => {
    const isEmpty = !options.length && !optionsInState.length;
    const isSingle = options.length === 1 && optionsInState.length === 1;

    if (isEmpty || isSingle) return;

    if (!withDebounce) {
      setOptionInState(options);
      if (openBy === 'options-length') setOpen(!!options.length);
      return;
    }

    debounce(() => {
      setOptionInState(options);
      if (openBy === 'options-length') setOpen(!!options.length);
    }, 300);
  };

  const handleUpdateOptions = async (input?: string, withDebounce = true) => {
    if (onCustomFilter) {
      const customFiltered = await onCustomFilter(input);
      return handleUpdateOptionsInState(customFiltered, withDebounce);
    }

    if (!input) return handleUpdateOptionsInState(options, withDebounce);

    const sanitizedInput = sanitize(input);

    const filtered = options.reduce<IProps['options']>((acc, option) => {
      const sanitizedValue = sanitize(extractText(option.label) || option.value);

      if (!sanitizedValue.includes(sanitizedInput)) {
        return acc;
      }

      const index = acc.findIndex((item) => {
        const aValue = sanitize(item.value);
        const bValue = sanitize(option.value);

        if (bValue === sanitizedInput) return true;
        if (aValue === sanitizedInput) return false;

        return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' }) >= 0;
      });

      index === -1 ? acc.push(option) : acc.splice(index, 0, option);

      return acc;
    }, []);

    handleUpdateOptionsInState(filtered, withDebounce);
  };

  const handleDisplayOptions = (action: 'open' | 'close' | 'toggle', target?: EventTarget) => {
    if (target && ulRef.current?.contains(target as Node)) return;

    return setOpen((prev) => {
      const toggle = action === 'toggle';
      const next = !prev;

      if (action === 'open' || (toggle && next)) {
        if (filterOptionsOnOpen) {
          handleUpdateOptions(selectRef.current?.value, false);
        }

        if (!filterOptionsOnOpen) {
          handleUpdateOptionsInState(options, false);
          setAttribute(ARIA.ACTIVEDESCENDANT, 'option-0', selectRef.current);
        }

        return toggle ? next : true;
      }

      if (action === 'close' || (toggle && !next)) {
        selectRef.current?.removeAttribute(ARIA.ACTIVEDESCENDANT);
        return toggle ? next : false;
      }

      return next;
    });
  };

  const handleUpdateSelectValue = (value: string) => {
    selectRef.current!.value = value;
    selectRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
    handleDisplayOptions('close');
  };

  const handleNavigateOptions = (moveTo: number) => {
    const options = getCurrentOptions();
    const currentIndex = options.findIndex((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    const nextIndex = currentIndex + moveTo;

    const next = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(currentIndex));
      setAttribute(ARIA.SELECTED, 'true', options.at(nextIndex));
      setAttribute(ARIA.ACTIVEDESCENDANT, `option-${nextIndex}`, selectRef.current);
      options.at(nextIndex)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    const first = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(-1));
      setAttribute(ARIA.SELECTED, 'true', options.at(0));
      setAttribute(ARIA.ACTIVEDESCENDANT, 'option-0', selectRef.current);
      ulRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    };

    const last = () => {
      setAttribute(ARIA.SELECTED, 'false', options.at(0));
      setAttribute(ARIA.SELECTED, 'true', options.at(-1));
      setAttribute(ARIA.ACTIVEDESCENDANT, `option-${options.length - 1}`, selectRef.current);
      ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight, behavior: 'instant' });
    };

    if (nextIndex < 0) return last();
    if (nextIndex >= options.length) return first();
    return next();
  };

  const handleKeyDownEnter = () => {
    const currentOptions = getCurrentOptions();
    const selected = currentOptions.find((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
    if (!currentOptions.length || !selected) return;
    handleUpdateSelectValue(selected.getAttribute('aria-label') ?? '');
    selectRef.current?.focus();
  };

  const handleSearchOptionInReadOnly = (evt: KeyboardEvent) => {
    if (!props.readOnly) return;
    searchAccReadOnly.current += evt.key;

    debounce(() => {
      const acc = searchAccReadOnly.current;
      const currentOptions = getCurrentOptions();
      const selected = currentOptions.find((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
      const match = currentOptions.find((opt) => opt.textContent?.toLowerCase().startsWith(acc));

      if (!match) return (searchAccReadOnly.current = '');

      selected?.removeAttribute(ARIA.SELECTED);
      match?.setAttribute(ARIA.SELECTED, 'true');
      match?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

      searchAccReadOnly.current = '';
    }, 300);
  };

  const handleKeyDownContainer = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'Escape':
        evt.preventDefault();
        return handleDisplayOptions('close');

      case 'ArrowDown':
        evt.preventDefault();
        if (!open) handleDisplayOptions('open');
        return handleNavigateOptions(1);

      case 'ArrowUp':
        evt.preventDefault();
        return handleNavigateOptions(-1);

      case 'Enter':
        evt.preventDefault();
        return handleKeyDownEnter();

      default:
        handleSearchOptionInReadOnly(evt);
    }
  };

  const handleClickContainer = (evt: MouseEvent) => {
    if (openBy === 'focus') {
      handleDisplayOptions('open');
      return;
    }

    if (openBy === 'click') {
      handleDisplayOptions('toggle', evt.target);
      return;
    }
  };

  const handleBlurContainer = (evt: FocusEvent) => {
    if (openBy === 'click') {
      if (ulRef.current?.contains(evt.target)) handleDisplayOptions('close');
      return;
    }

    if (openBy === 'focus') {
      handleDisplayOptions('close');
      return;
    }
  };

  const handleFocusContainer = () => {
    if (openBy === 'focus') {
      handleDisplayOptions('open');
      return;
    }
  };

  const handleMouseMoveOptions = (evt: MouseEvent<HTMLLIElement>) => {
    if (isTruthy(evt.currentTarget.getAttribute(ARIA.SELECTED))) return;
    const selected = getCurrentOptions().find((li) => isTruthy(li.ariaSelected));
    selected?.setAttribute(ARIA.SELECTED, 'false');

    evt.currentTarget.setAttribute(ARIA.SELECTED, 'true');
    selectRef.current?.setAttribute(ARIA.ACTIVEDESCENDANT, evt.currentTarget.id);
  };

  const handleMouseDownOptions = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleUpdateSelectValue(evt.currentTarget.getAttribute('aria-label') ?? '');
    selectRef.current?.focus();
  };

  useImperativeHandle(props.ref, () => selectRef.current!, [selectRef]);

  return {
    ulRef,
    ref: selectRef,
    optionsInState,
    open,
    handleUpdateOptions,
    handleKeyDownContainer,
    handleBlurContainer,
    handleFocusContainer,
    handleClickContainer,
    handleMouseMoveOptions,
    handleMouseDownOptions,
    ...props,
  };
}
