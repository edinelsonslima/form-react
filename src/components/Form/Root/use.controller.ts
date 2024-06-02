import { FormEvent } from 'react';
import { IControllerProps } from './types';

function useController<T extends object>({
  onSubmit: handleSubmit,
  ...rest
}: IControllerProps<T>) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    handleSubmit(e, data as T);
  };

  return { ...rest, onSubmit };
}

export type { IControllerProps };
export default useController;
