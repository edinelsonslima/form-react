import { clear, set } from '@/helpers/mask';
import { useDebounce } from '@/hooks/use.debounce';
import { ChangeEvent, FormEvent, useImperativeHandle, useRef, useState } from 'react';
import { IControllerProps, ICustomInput } from './types';

export function useController({
  onInvalid,
  onInput,
  onChange,
  value,
  defaultValue,
  mask,
  pattern,
  defaultErrorMessages,
  ...rest
}: IControllerProps) {
  const debouce = useDebounce();

  const inputRef = useRef<ICustomInput>(null);
  const [currentError, _internal_error_] = useState('');

  const handleSetCurrentError = (message: string) => {
    debouce(() => _internal_error_(message), 300);
  };

  const onHandleInvalid = (evt: FormEvent<ICustomInput>) => {
    evt.preventDefault();
    onInvalid?.(evt);
    const target = evt.currentTarget;

    if (target?.validity?.valid) return handleSetCurrentError('');

    const dictionary: Record<string, string> | undefined =
      defaultErrorMessages instanceof Function
        ? defaultErrorMessages(target.value, target.valueUnmasked)
        : defaultErrorMessages;

    if (target?.validity?.customError || !dictionary) {
      return handleSetCurrentError(target?.validationMessage);
    }

    const error = Object.keys(dictionary).find((key) => Object(target?.validity)[key]);
    handleSetCurrentError(error ? dictionary[error] : target?.validationMessage);
  };

  const onHandleInput = async (evt: FormEvent<ICustomInput>) => {
    onInput?.(evt);

    const target = evt.currentTarget;
    const isCheckbox = target.type === 'checkbox';

    target.valueUnmasked = target.value || '';

    if (typeof mask === 'object') {
      target.valueUnmasked = mask.clear(target.value);
      target.value = mask.set(target.valueUnmasked);
    }

    if (typeof mask === 'string') {
      target.valueUnmasked = clear(mask, target.value);
      target.value = set(mask, target.valueUnmasked);
    }

    const dispatch = (message: string) => {
      target.setCustomValidity(message);
      if (!message) return onHandleInvalid(evt);

      target.reportValidity();
    };

    if (!isCheckbox && !target.valueUnmasked) {
      return dispatch('');
    }

    if (pattern instanceof Function) {
      return dispatch(
        (await pattern(isCheckbox ? String(target.checked) : target.valueUnmasked)) ?? '',
      );
    }

    if (pattern?.regexp) {
      const regexp = new RegExp(pattern.regexp);
      return dispatch(!regexp.test(target.valueUnmasked) ? pattern.message : '');
    }

    dispatch('');
  };

  const onHandleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;

    if (typeof mask === 'object') {
      return onChange?.(evt, mask.clear(value), value);
    }

    if (typeof mask === 'string') {
      return onChange?.(evt, clear(mask, value), value);
    }

    return onChange?.(evt, value, value);
  };

  const onHandleValue = () => {
    if (value === undefined) return value;

    if (typeof mask === 'object') {
      return mask.set(String(value));
    }

    if (typeof mask === 'string') {
      return set(mask, String(value));
    }

    return value;
  };

  const onHandleDefaultValue = () => {
    if (defaultValue === undefined) return defaultValue;

    if (typeof mask === 'object') {
      return mask.set(String(defaultValue));
    }

    if (typeof mask === 'string') {
      return set(mask, String(defaultValue));
    }

    return defaultValue;
  };

  useImperativeHandle(rest.ref, () => inputRef.current!);

  return {
    ...rest,
    currentError,
    ref: inputRef,
    errorId: `${rest.id}-error`,
    className: rest.className ?? '',
    value: onHandleValue(),
    defaultValue: onHandleDefaultValue(),
    onInput: onHandleInput,
    onInvalid: onHandleInvalid,
    onChange: onHandleChange,
  };
}
