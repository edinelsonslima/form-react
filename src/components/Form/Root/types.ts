import { ComponentProps, FormEvent } from 'react';

type IBaseProps = Omit<ComponentProps<'form'>, 'onSubmit'>;

type IControllerProps<T extends object> = IBaseProps & {
  initialValues?: Record<keyof T, T[keyof T]>;
  onSubmit: (
    data: Record<keyof T, T[keyof T]>,
    masked: Record<keyof T, T[keyof T]>,
    e: FormEvent<HTMLFormElement>,
  ) => void;
};

type IProps<T extends object> = IControllerProps<T> & {
  id: ComponentProps<'form'>['id'];
  layout?: 'horizontal' | 'vertical';
};

type IData<T extends object> = Record<keyof T, T[keyof T]>;

type IGetherDataFn<T extends object> = (
  parent: HTMLFieldSetElement | HTMLFormElement,
) => IData<T>[];

export type { IControllerProps, IData, IGetherDataFn, IProps };
