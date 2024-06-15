import mask from '@/helpers/mask';
import useDebounce from '@/hooks/use.debounce';
import { ChangeEvent, FormEvent, ForwardedRef, useImperativeHandle, useRef, useState } from 'react';
import { IControllerProps, ICustomInput } from './types';

const MS_SHOW_ERROR = 300;

function useController(
  {
    onInput: handleOnInput,
    onInvalid: handleOnInvalid,
    onChange: handleOnChange,
    value: handleValue,
    defaultValue: handleDefaultValue,
    mask: masksProp,
    pattern,
    defaultErrorMessages,
    ...rest
  }: IControllerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const debouce = useDebounce();

  const inputRef = useRef<ICustomInput>(null);
  const [currentError, _internal_error_] = useState('');

  const errorId = `${rest.id}-error`;

  const handleSetCurrentError = (message: string) => {
    if (message === currentError) return;
    _internal_error_(message);
  };

  const onInvalid = (evt: FormEvent<ICustomInput>) => {
    evt.preventDefault();
    handleOnInvalid?.(evt);
    const target = evt.currentTarget;

    if (target.validity.valid) return handleSetCurrentError('');

    const dictionary: Record<string, string> | undefined =
      defaultErrorMessages instanceof Function
        ? defaultErrorMessages(target.value, target.valueUnmasked)
        : defaultErrorMessages;

    if (target.validity.customError || !dictionary) {
      return debouce(() => handleSetCurrentError(target.validationMessage), MS_SHOW_ERROR);
    }

    const error = Object.keys(dictionary).find((key) => Object(target.validity)[key]);
    const message = error ? dictionary[error] : target.validationMessage;

    debouce(() => handleSetCurrentError(message), MS_SHOW_ERROR);
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
      target.setCustomValidity(message);
      if (!message) return onInvalid(evt);

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
