import { createRef, FormEventHandler, RefObject, useEffect, useMemo, useRef } from 'react';
import { masks } from './masks';
import { Mask, HTMLInput } from '.';
import { getMask, handleInput, handleValue } from './helpers';

export function useMask(prop?: Mask | ((mask: typeof masks) => Mask)) {
  const mask = useMemo(() => getMask(prop), [prop]);
  const inputRef = useRef<HTMLInput>(null);

  useEffect(() => {
    if (inputRef.current?.value) {
      inputRef.current.value = handleValue(mask, inputRef.current.value, inputRef);
    }

    if (inputRef.current?.defaultValue) {
      inputRef.current.defaultValue = handleValue(mask, inputRef.current.defaultValue, inputRef);
    }
  }, [mask]);

  return useMemo(
    () => ({
      ref: inputRef,
      bindInputEvent: (oninput?: FormEventHandler<HTMLInputElement>) => {
        return handleInput(mask, inputRef, oninput);
      },
      input: () => ({
        unmasked: inputRef.current?.['rb-value'],
        masked: inputRef.current?.value,
      }),
      props: {
        ref: inputRef,
        onInput: handleInput(mask, inputRef),
      },
    }),
    [mask],
  );
}

interface MasksProps {
  mask?: Mask | ((mask: typeof masks) => Mask);
  onInput?: FormEventHandler<HTMLInputElement>;
  value?: string | number;
  defaultValue?: string | number;
}

export function useMasks() {
  const inputs = useMemo(() => new Map<string, RefObject<HTMLInput | null>>(), []);

  return {
    inputs: () => {
      return new Map(
        Array.from(inputs).map(([name, ref]) => {
          const value = { unmasked: ref.current?.['rb-value'], masked: ref.current?.value };
          return [name, value];
        }),
      );
    },
    mask: (name: string, { mask, value, defaultValue, onInput }: MasksProps) => {
      mask = getMask(mask);
      value = String(value ?? '');
      defaultValue = String(defaultValue ?? '');

      return {
        onInput: handleInput(mask, inputs.get(name), onInput),
        ref: inputs.get(name) ?? inputs.set(name, createRef<HTMLInput>()).get(name)!,
        ...(value && { value: handleValue(mask, value, inputs.get(name)) }),
        ...(defaultValue && { defaultValue: handleValue(mask, defaultValue, inputs.get(name)) }),
      };
    },
  };
}
