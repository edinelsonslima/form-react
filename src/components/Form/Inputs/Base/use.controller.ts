import mask from '@/helpers/mask';
import useDebounce from '@/hooks/use.debounce';
import {
  FormEvent,
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IControllerProps } from './types';

function useController(
  {
    onInput: handleOnInput,
    onInvalid: handleOnInvalid,
    mask: masksProp,
    pattern,
    ...rest
  }: IControllerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const debouce = useDebounce();

  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleApplyMask = useCallback(() => {
    const target = inputRef.current;
    if (!masksProp || !target) return;

    if (typeof masksProp === 'object') {
      const unmaskedValue = masksProp.clear(target.value);
      const maskedValue = masksProp.set(unmaskedValue);

      target.value = maskedValue;
      return;
    }

    const unmaskedValue = mask.clear(masksProp, target.value);
    const maskedValue = mask.set(masksProp, unmaskedValue);

    target.value = maskedValue;
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
  };
}

export default useController;
