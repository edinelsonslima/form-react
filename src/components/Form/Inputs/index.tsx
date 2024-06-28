import masks from '@/helpers/masks';
import { forwardRef, memo } from 'react';
import Input, { IProps as IPropsBase } from './Base';
import Checkbox, { IProps as IPropsCheckbox } from './Checkbox';
import Email, { IProps as IPropsEmail } from './Email';

type IProps =
  | IPropsBase
  | ({ type: 'email' } & IPropsEmail)
  | ({ type: 'checkbox' } & IPropsCheckbox);

const Component = forwardRef<HTMLInputElement, IProps>(({ type, ...props }, ref) => {
  switch (type) {
    case 'email':
      return <Email {...props} type={type} ref={ref} />;

    case 'checkbox':
      return <Checkbox {...props} type={type} ref={ref} />;

    default:
      return <Input {...props} type={type} ref={ref} />;
  }
});

const InputProxy = Object.assign(memo(Component), { masks });
export default InputProxy;
