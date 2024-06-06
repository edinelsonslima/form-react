import mask from '@/helpers/mask';
import useDebounce from '@/hooks/use.debounce';
import { ChangeEvent, FormEvent, ForwardedRef, useImperativeHandle, useRef, useState } from 'react';
import { IControllerProps, ICustomInput } from './types';

function useController(
  {
    onInput: handleOnInput,
    onInvalid: handleOnInvalid,
    onChange: handleOnChange,
    value: handleValue,
    defaultValue: handleDefaultValue,
    mask: masksProp,
    pattern,
    ...rest
  }: IControllerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const debouce = useDebounce();

  const inputRef = useRef<ICustomInput>(null);
  const [currentError, setCurrentError] = useState('');

  const errorId = `${rest.id}-error`;
  const popoverId = `${rest.id}-popover`;

  const handleSetCurrentError = (message: string) => {
    if (message === currentError) return;
    setCurrentError(message);
  };

  const onInvalid = (evt: FormEvent<HTMLInputElement>) => {
    handleOnInvalid?.(evt);
    evt.preventDefault();

    handleSetCurrentError(evt.currentTarget.validationMessage);
  };

  const onInput = (evt: FormEvent<ICustomInput>) => {
    handleOnInput?.(evt);

    const target = evt.currentTarget;

    target.valueUnmasked = target.value || '';

    if (typeof masksProp === 'object') {
      target.valueUnmasked = masksProp.clear(target.value);
      target.value = masksProp.set(target.valueUnmasked);
    }

    if (typeof masksProp === 'string') {
      target.valueUnmasked = mask.clear(masksProp, target.value);
      target.value = mask.set(masksProp, target.valueUnmasked);
    }

    const dispatch = (message: string) => {
      if (!message) setCurrentError('');
      target.setCustomValidity(message);
      target.reportValidity();
    };

    if (!target.valueUnmasked) {
      return dispatch('');
    }

    if (pattern instanceof Function) {
      return dispatch(pattern(target.valueUnmasked) ?? '');
    }

    if (pattern?.regexp) {
      const regexp = new RegExp(pattern.regexp);
      const result = !regexp.test(target.valueUnmasked) ? pattern.message : '';
      return dispatch(result);
    }

    if (target.validationMessage) {
      return debouce(() => handleSetCurrentError(target.validationMessage), 300);
    }

    dispatch('');
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;

    if (typeof masksProp === 'object') {
      return handleOnChange?.(evt, masksProp.clear(value), value);
    }

    if (typeof masksProp === 'string') {
      return handleOnChange?.(evt, mask.clear(masksProp, value), value);
    }

    return handleOnChange?.(evt, value, value);
  };

  const onValue = () => {
    if (handleValue === undefined) return handleValue;

    if (typeof masksProp === 'object') {
      return masksProp.set(String(handleValue));
    }

    if (typeof masksProp === 'string') {
      return mask.set(masksProp, String(handleValue));
    }

    return handleValue;
  };

  const onDefaultValue = () => {
    if (handleDefaultValue === undefined) return handleDefaultValue;

    if (typeof masksProp === 'object') {
      return masksProp.set(String(handleDefaultValue));
    }

    if (typeof masksProp === 'string') {
      return mask.set(masksProp, String(handleDefaultValue));
    }

    return handleDefaultValue;
  };

  useImperativeHandle(ref, () => inputRef.current!, []);

  return {
    ...rest,
    errorId,
    popoverId,
    currentError,
    ref: inputRef,
    value: onValue(),
    defaultValue: onDefaultValue(),
    onInput,
    onInvalid,
    onChange,
  };
}

export default useController;
