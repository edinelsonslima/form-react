import { ChangeEvent, FormEvent, useImperativeHandle, useState } from 'react';
import { useDebounce } from '@/libs/form/hooks/use.debounce';
import { useMask } from '@/libs/mask';
import { IControllerProps, ICustomInput } from './types';

let isFocused = false;

export function useController({
  onInvalid,
  onInput,
  onChange,
  mask,
  pattern,
  defaultErrorMessages,
  scrollIntoViewError,
  ...rest
}: IControllerProps) {
  const debouce = useDebounce();

  const input = useMask(mask);
  const [currentError, _internal_error_] = useState('');

  const handleScrollIntoViewError = () => {
    input.ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
      ...(scrollIntoViewError instanceof Object ? scrollIntoViewError : {}),
    });

    if (isFocused) return;

    input.ref.current?.focus({ preventScroll: true });
    isFocused = true;

    const timeoutId = setTimeout(() => {
      isFocused = false;
      clearTimeout(timeoutId);
    }, 300);
  };

  const handleSetCurrentError = (message: string) => {
    debouce(() => _internal_error_(message), 300);
    if (!message) return;
    handleScrollIntoViewError();
  };

  const onHandleInvalid = (evt: FormEvent<ICustomInput>) => {
    evt.preventDefault();
    onInvalid?.(evt);
    const target = evt.currentTarget;

    if (target?.validity?.valid) return handleSetCurrentError('');

    const dictionary: Record<string, string> | undefined =
      defaultErrorMessages instanceof Function
        ? defaultErrorMessages(target.value, target['rb-value'])
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

    const dispatch = (message: string) => {
      target.setCustomValidity(message);
      if (!message) return onHandleInvalid(evt);

      target.reportValidity();
    };

    if (!isCheckbox && !target['rb-value']) {
      return dispatch('');
    }

    if (pattern instanceof Function) {
      const result = await pattern(isCheckbox ? String(target.checked) : target['rb-value']);
      return dispatch(result ?? '');
    }

    if (pattern?.regexp) {
      const regexp = new RegExp(pattern.regexp);
      return dispatch(!regexp.test(target['rb-value']) ? pattern.message : '');
    }

    dispatch('');
  };

  const onHandleChange = (evt: ChangeEvent<ICustomInput>) => {
    return onChange?.(evt, evt.currentTarget['rb-value'], evt.currentTarget.value);
  };

  useImperativeHandle(rest.ref, () => input.ref.current!);

  return {
    ...rest,
    ref: input.ref,
    currentError,
    errorId: `${rest.id}-error`,
    className: rest.className ?? '',
    onInput: input.bindInputEvent(onHandleInput),
    onInvalid: onHandleInvalid,
    onChange: onHandleChange,
  };
}
