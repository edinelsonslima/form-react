import Form from '@/components/Form';
import cn from '@/helpers/cn';

import Separate from '@/components/Separate';
import Address from './Address';
import CreditCard from './CreditCard';
import Shipping from './Shipping';
import UserForm from './UserForm';
import s from './index.module.css';

function Checkout() {
  return (
    <Form.Root id="main-form" onSubmit={(data) => console.log(data)} className={cn(s, 'checkout')}>
      <UserForm />

      <Separate />

      <Address />

      <Separate />

      <Shipping />

      <Separate />

      <CreditCard />

      <Separate transparent />

      <Form.Input type="submit" form="main-form" id="submit" name="submit" />
    </Form.Root>
  );
}

export default Checkout;
