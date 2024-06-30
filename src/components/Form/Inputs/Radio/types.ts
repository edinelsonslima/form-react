import { IProps as IBaseProps } from '../Base/types';

type IControllerProps = Omit<IBaseProps, 'prefix' | 'suffix' | 'Mask'>;

type IProps = IControllerProps;

export type { IControllerProps, IProps };
