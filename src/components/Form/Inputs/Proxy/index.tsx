import { forwardRef, memo } from 'react';
import Input, { IProps } from '../Base';
import InputEmail from '../Email';

const Component = forwardRef<HTMLInputElement, IProps>(
  ({ type, ...props }, ref) => {
    switch (type) {
      case 'button':
        return <Input {...props} type="button" ref={ref} />;

      case 'color':
        return <Input {...props} type="color" ref={ref} />;

      case 'checkbox':
        return <Input {...props} type="checkbox" ref={ref} />;

      case 'date':
        return <Input {...props} type="date" ref={ref} />;

      case 'datetime-local':
        return <Input {...props} type="datetime-local" ref={ref} />;

      case 'email':
        return <InputEmail {...props} type="email" ref={ref} />;

      case 'file':
        return <Input {...props} type="file" ref={ref} />;

      case 'hidden':
        return <Input {...props} type="hidden" ref={ref} />;

      case 'image':
        return <Input {...props} type="image" ref={ref} />;

      case 'month':
        return <Input {...props} type="month" ref={ref} />;

      case 'number':
        return <Input {...props} type="number" ref={ref} />;

      case 'password':
        return <Input {...props} type="password" ref={ref} />;

      case 'radio':
        return <Input {...props} type="radio" ref={ref} />;

      case 'range':
        return <Input {...props} type="range" ref={ref} />;

      case 'reset':
        return <Input {...props} type="reset" ref={ref} />;

      case 'search':
        return <Input {...props} type="search" ref={ref} />;

      case 'submit':
        return <Input {...props} type="submit" ref={ref} />;

      case 'tel':
        return <Input {...props} type="tel" ref={ref} />;

      case 'time':
        return <Input {...props} type="time" ref={ref} />;

      case 'url':
        return <Input {...props} type="url" ref={ref} />;

      case 'week':
        return <Input {...props} type="week" ref={ref} />;

      case 'text':
        return <Input {...props} type="text" ref={ref} />;

      default:
        return <Input {...props} type="text" ref={ref} />;
    }
  },
);

const InputProxy = memo(Component);
export default InputProxy;
