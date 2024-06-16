import { ReactNode } from 'react';
import { IProps as IBaseProps } from '../Base/types';

type IControllerProps = IBaseProps & {
  options: { key: string; value: string; label: ReactNode }[];
};

type IProps = IControllerProps;

export type { IControllerProps, IProps };
