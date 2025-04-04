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
  openByOptionsLength,
  ...props
}: IProps) {
  const debounce = useDebounce();

  const selectRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(openByOptionsLength ? !!options.length : false);
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
      if (openByOptionsLength) setOpen(!!options.length);
      return;
    }

    debounce(() => {
      setOptionInState(options);
      if (openByOptionsLength) setOpen(!!options.length);
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

  const handleDisplayOptions = (action: 'open' | 'close' | 'toggle', evt?: MouseEvent) => {
    if (evt && ulRef.current?.contains(evt.target as Node)) return;

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
      options.at(nextIndex)?.scrollIntoView({ block: 'end', behavior: 'smooth' });
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
        const currentOptions = getCurrentOptions();
        const selected = currentOptions.find((li) => isTruthy(li.getAttribute(ARIA.SELECTED)));
        if (!currentOptions.length || !selected) return;
        handleUpdateSelectValue(selected.getAttribute('aria-label') ?? '');
        selectRef.current?.focus();
    }
  };

  const handleBlurContainer = (evt: FocusEvent) => {
    if (!ulRef.current?.contains(evt.target)) return;
    handleDisplayOptions('close');
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
    handleDisplayOptions,
    handleKeyDownContainer,
    handleBlurContainer,
    handleMouseMoveOptions,
    handleMouseDownOptions,
    ...props,
  };
}
