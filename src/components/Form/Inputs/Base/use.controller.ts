import mask from '@/helpers/mask';
import useDebounce from '@/hooks/use.debounce';
import {
  ChangeEvent,
  FormEvent,
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IControllerProps, ICustomInput } from './types';

function useController(
  {
    onInput: handleOnInput,
    onInvalid: handleOnInvalid,
    onChange: handleOnChange,
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

  const onInvalid = (evt: FormEvent<HTMLInputElement>) => {
    handleOnInvalid?.(evt);

    evt.preventDefault();
    setCurrentError(evt.currentTarget.validationMessage);
  };

  const onInput = (evt: FormEvent<HTMLInputElement>) => {
    handleOnInput?.(evt);
    handleApplyMask();

    const target = evt.currentTarget;

    const dispatch = (message: string) => {
      if (!message) setCurrentError('');
      target.setCustomValidity(message);
      target.reportValidity();
    };

    if (!target.value) {
      return dispatch('');
    }

    if (pattern instanceof Function) {
      return dispatch(pattern(target.value) ?? '');
    }

    if (pattern?.regexp) {
      const regexp = new RegExp(pattern.regexp);
      return dispatch(!regexp.test(target.value) ? pattern.message : '');
    }

    if (target.validationMessage) {
      return debouce(() => setCurrentError(target.validationMessage), 300);
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

  const handleApplyMask = useCallback(() => {
    const target = inputRef.current!;
    target.valueUnmasked = target.value || '';

    if (typeof masksProp === 'object') {
      target.valueUnmasked = masksProp.clear(target.value);
      target.value = masksProp.set(target.valueUnmasked);
    }

    if (typeof masksProp === 'string') {
      target.valueUnmasked = mask.clear(masksProp, target.value);
      target.value = mask.set(masksProp, target.valueUnmasked);
    }
  }, [masksProp]);

  useEffect(handleApplyMask, [handleApplyMask]);

  useImperativeHandle(ref, () => inputRef.current!, []);

  return {
    ...rest,
    errorId,
    popoverId,
    currentError,
    ref: inputRef,
    onInput,
    onInvalid,
    onChange,
  };
}

export default useController;
