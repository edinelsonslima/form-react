import { Form } from '@/libs/form/components/Form';
import { emailValidation } from './validate';
import { validate } from '@/pages/helpers/validate';

export function Email() {
  return (
    <Form.Input
      type="email"
      id="user-email"
      name="user-email"
      label="E-mail"
      autoComplete="email"
      required
      scrollIntoViewError
      pattern={validate(emailValidation)}
      defaultErrorMessages={{ valueMissing: 'O e-mail é obrigatório.' }}
    />
  );
}
