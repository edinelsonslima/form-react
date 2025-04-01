import { Form } from '@/libs/form/components/Form';

import { Separate } from '@/pages/components/Separate';
import { Address } from './Address';
import { CreditCard } from './CreditCard';
import { Shipping } from './Shipping';
import { UserForm } from './UserForm';

export function Checkout() {
  return (
    <>
      <Form.Root
        id="main-form"
        onSubmit={(data) => console.log(data)}
        style={{ margin: '1rem auto', padding: '1rem' }}
        initialValues={{ 'user-name': 'Edinelson Lima' }}
      >
        <UserForm />

        <Separate />

        <Address />

        <Separate />

        <Shipping />

        <Separate />

        <CreditCard />

        <Form.Input type="submit" id="submit" name="submit" value="Pagar e Receber Agora" />
      </Form.Root>
    </>
  );
}
