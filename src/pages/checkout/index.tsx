import { Form } from '@/components/Form';

import { Separate } from '@/components/Separate';
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
        className="container mx-auto my-4 p-4"
        initialValues={{
          'user-name': 'John',
        }}
      >
        <UserForm />

        <Separate />

        <Address />

        <Separate />

        <Shipping />

        <Separate />

        <CreditCard />

        <Separate transparent />

        <Form.Input type="submit" id="submit" name="submit" value="Pagar e Receber Agora" />
      </Form.Root>
    </>
  );
}
