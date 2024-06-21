import masks from '@/helpers/masks';
import { forwardRef, memo } from 'react';
import Input, { IProps as IPropsBase } from './Base';
import InputEmail, { IProps as IPropsEmail } from './Email';

type IProps = IPropsBase | ({ type: 'email' } & IPropsEmail);

const Component = forwardRef<HTMLInputElement, IProps>(({ type, ...props }, ref) => {
  switch (type) {
    case 'button':
    case 'color':
    case 'checkbox':
    case 'date':
    case 'file':
    case 'datetime-local':
    case 'hidden':
    case 'image':
    case 'month':
    case 'number':
    case 'password':
    case 'radio':
    case 'range':
    case 'reset':
    case 'search':
    case 'submit':
    case 'tel':
    case 'time':
    case 'url':
    case 'week':
    case 'text':
      return <Input {...props} type={type} ref={ref} />;

    case 'email':
      return <InputEmail {...props} ref={ref} />;

    default:
      return <Input {...props} ref={ref} />;
  }
});

const InputProxy = Object.assign(memo(Component), { masks });
export default InputProxy;
