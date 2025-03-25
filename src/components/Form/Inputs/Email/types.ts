import { IProps as IBaseProps } from '../Base/types';
import { IProps as ISelectProps } from '../Select/types';

type IControllerProps = IBaseProps;

type IProps = IControllerProps & {
  components?: ISelectProps['components'];
};

export type { IControllerProps, IProps };
