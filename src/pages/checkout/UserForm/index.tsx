import Div from '@/components/Div';
import Fieldset from '@/components/Fieldset';
import Form from '@/components/Form';
import SecurityLabel from './SecurityLabel';

function UserForm() {
  return (
    <Fieldset name="user">
      <Form.Input
        required
        id="user-name"
        name="user-name"
        label="Nome Completo"
        mask={Form.Input.masks.noSpecialCharacter}
        pattern={(value) => {
          if (!(value.trim().split(' ').length < 2)) return;
          return 'Por favor, informe seu nome completo.';
        }}
      />

      <Form.Input
        required
        type="email"
        id="user-email"
        name="user-email"
        label="E-mail"
        defaultErrorMessages={(input) => {
          const error = { valueMissing: 'O e-mail é obrigatório.' };

          if (!input.includes('@')) {
            return { typeMismatch: `O e-mail "${input}" precisa conter um "@".`, ...error };
          }

          return { typeMismatch: 'Por favor, informe um e-mail válido.', ...error };
        }}
      />

      <Div display="flex" gap="1rem" flex-wrap="wrap">
        <Form.Input
          required
          type="tel"
          id="user-ddi"
          name="user-ddi"
          label="DDI"
          mask="+00"
          props={{ container: { style: { flex: 1, minWidth: '4rem', maxWidth: '7rem' } } }}
        />

        <Form.Input
          required
          type="tel"
          id="user-phone"
          name="user-phone"
          label="Celular"
          mask="(00) 0000-0000, (00) 0 0000-0000"
          props={{ container: { style: { flex: 3 } } }}
        />
      </Div>

      <Form.Input
        required
        id="user-document"
        name="user-document"
        label="CPF ou CNPJ"
        mask="000.000.000-00, 00.000.000/0000-00"
      />

      <SecurityLabel />
    </Fieldset>
  );
}

export default UserForm;
