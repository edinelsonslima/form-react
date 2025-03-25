import { Form } from '@/libs/form/components/Form';
import { validate } from '@/pages/helpers/validate';
import { nameValidation } from './validate';

export function Name() {
  return (
    <Form.Input
      id="user-name"
      name="user-name"
      label="Nome Completo"
      autoComplete="name"
      required
      pattern={validate(nameValidation)}
      mask={Form.Input.masks.noSpecialCharacter}
      defaultErrorMessages={{ valueMissing: 'O nome é obrigatório.' }}
    />
  );
}
