import { masks } from '@/helpers/masks';
import { Input, IProps as IPropsBase } from './Base';
import { Checkbox, IProps as IPropsCheckbox } from './Checkbox';
import { Email, IProps as IPropsEmail } from './Email';
import { Radio, IProps as IPropsRadio } from './Radio';

type IProps =
  | IPropsBase
  | ({ type: 'email' } & IPropsEmail)
  | ({ type: 'checkbox' } & IPropsCheckbox)
  | ({ type: 'radio' } & IPropsRadio);

function InputContainer({ type, ...props }: IProps) {
  switch (type) {
    case 'email':
      return <Email {...props} type={type} />;

    case 'checkbox':
      return <Checkbox {...props} type={type} />;

    case 'radio':
      return <Radio {...props} type={type} />;

    default:
      return <Input {...props} type={type} />;
  }
}

export const InputProxy = Object.assign(InputContainer, { masks });
