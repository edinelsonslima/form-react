import { Form } from '@/lib/components/Form';
import { SecurityLabel } from './SecurityLabel';
import { Name } from './Name';
import { Email } from './Email';
import { Phone } from './Phone';

export function UserForm() {
  return (
    <Form.Fieldset name="user">
      <Name />
      <Email />
      <Phone />

      <Form.Input
        id="user-document"
        name="user-document"
        label="CPF ou CNPJ"
        inputMode="numeric"
        autoComplete="on"
        mask="000.000.000-00, 00.000.000/0000-00"
      />

      <SecurityLabel />
    </Form.Fieldset>
  );
}
