import { ComponentPropsWithRef, useImperativeHandle } from 'react';
import { Mask, useMask } from './hook';

interface Input extends ComponentPropsWithRef<'input'> {
  mask?: Mask;
}

export function Input({ mask = '', ref, ...props }: Input) {
  const inputRef = useMask(mask);

  useImperativeHandle(ref, () => inputRef.ref.current!, [inputRef]);

  return <input ref={inputRef.ref} {...props} />;
}
