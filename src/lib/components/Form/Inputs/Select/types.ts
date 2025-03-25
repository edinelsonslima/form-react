import { ComponentProps, CSSProperties, ReactNode } from 'react';
import { IProps as IBaseProps } from '../Base/types';

type ISelectOptions = { key: string; value: string; label?: ReactNode }[];

type IControllerProps = IBaseProps & {
  options: ISelectOptions;
  filterOptionsOnOpen?: boolean;
  onCustomFilter?: (input?: string) => ISelectOptions | Promise<ISelectOptions>;
};

type IProps = IControllerProps & {
  components?: IBaseProps['components'] & {
    select?: string | CSSProperties | (() => ComponentProps<'div'>);
    ul?: string | CSSProperties | (() => ComponentProps<'ul'>);
    li?: string | CSSProperties | (() => ComponentProps<'li'>);
  };
};

export type { IControllerProps, IProps, ISelectOptions };
