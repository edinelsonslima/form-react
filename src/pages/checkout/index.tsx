import Form from '@/components/Form';
import Separate from '@/components/Separate';
import cn from '@/helpers/cn';

import CreditCard from './PaymentForm/CreditCard';
import UserForm from './UserForm';

import s from './index.module.css';

function Checkout() {
  return (
    <Form.Root id="main-form" onSubmit={(data) => console.log(data)} className={cn(s, 'checkout')}>
      <UserForm />

      <Separate />

      <CreditCard />

      <Separate transparent />

      <Form.Input type="submit" form="main-form" id="submit" name="submit" />
    </Form.Root>
  );
}

export default Checkout;
