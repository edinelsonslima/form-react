import { FormEvent } from 'react';
import { ICustomInput } from '../Inputs/Base/types';
import { IControllerProps } from './types';

function useController<T extends object>({ onSubmit: handleSubmit, ...rest }: IControllerProps<T>) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    const dataMasked = Object.fromEntries(new FormData(target).entries());

    const data = Object.keys(dataMasked).reduce((acc, inputName) => {
      const input = target.elements.namedItem(inputName) as ICustomInput;
      return { ...acc, [inputName]: input.valueUnmasked };
    }, {});

    return handleSubmit(e, data as T, dataMasked as T);
  };

  return { ...rest, onSubmit };
}

export type { IControllerProps };
export default useController;
