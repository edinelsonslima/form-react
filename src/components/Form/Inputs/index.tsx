import masks from '@/helpers/masks';
import { forwardRef, memo } from 'react';
import Input, { IProps as IPropsBase } from './Base';
import InputEmail, { IProps as IPropsEmail } from './Email';

type IProps = IPropsBase | ({ type: 'email' } & IPropsEmail);

const Component = forwardRef<HTMLInputElement, IProps>(({ type, ...props }, ref) => {
  switch (type) {
    case 'email':
      return <InputEmail {...props} ref={ref} />;

    default:
      return <Input {...props} type={type} ref={ref} />;
  }
});

const InputProxy = Object.assign(memo(Component), { masks });
export default InputProxy;
