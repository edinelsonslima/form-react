import Form from '@/components/Form';
import Separate from '@/components/Separate';
import cn from '@/helpers/cn';

import CreditCard from './PaymentForm/CreditCard';
import UserForm from './UserForm';

import s from './index.module.css';

type IForm = {
  user: {
    'user-name': string;
    'user-email': string;
    'user-ddi': number;
    'user-phone': number;
    'user-document': string;
  };
  credit: {
    'holder-number': string;
    'holder-validity': string;
    'holder-cvv': string;
    'holder-name': string;
  };
};

function Checkout() {
  const initialValues: IForm = {
    user: {
      'user-name': 'João da Silva',
      'user-email': 'example@gmail.com',
      'user-ddi': 55,
      'user-phone': 11999999999,
      'user-document': '123.456.789-00',
    },
    credit: {
      'holder-number': '1234 5678 1234 5678',
      'holder-validity': '12/23',
      'holder-cvv': '123',
      'holder-name': 'João da Silva',
    },
  };

  return (
    <Form.Root<IForm>
      id="main-form"
      onSubmit={(data) => console.log(data)}
      className={cn(s, 'checkout')}
      initialValues={initialValues}
    >
      <UserForm />

      <Separate />

      <CreditCard />

      <Separate transparent />

      <Form.Input type="submit" form="main-form" id="submit" name="submit" />
    </Form.Root>
  );
}

export default Checkout;
