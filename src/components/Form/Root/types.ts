import { ComponentProps, FormEvent } from 'react';

type IBaseProps = Omit<ComponentProps<'form'>, 'onSubmit'>;

type IControllerProps<T extends object> = IBaseProps & {
  onSubmit: (e: FormEvent<HTMLFormElement>, data: T) => void;
};

type IProps<T extends object> = IControllerProps<T> & {
  id: ComponentProps<'form'>['id'];
  layout?: 'horizontal' | 'vertical';
};

export type { IControllerProps, IProps };
