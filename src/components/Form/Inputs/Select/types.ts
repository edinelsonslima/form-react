import { ComponentProps, ReactNode } from 'react';
import { IProps as IBaseProps } from '../Base/types';

type ISelectOptions = { key: string; value: string; label?: ReactNode }[];

type IControllerProps = IBaseProps & {
  options: ISelectOptions;
  filterOptionsOnOpen?: boolean;
  onCustomFilter?: (input?: string) => ISelectOptions | Promise<ISelectOptions>;
};

type IProps = IControllerProps & {
  props?: IBaseProps['props'] & {
    ul?: ComponentProps<'ul'>;
    li?: ComponentProps<'li'>;
  };
};

export type { IControllerProps, IProps, ISelectOptions };
