import Div from '@/components/Div';
import Form from '@/components/Form';
import countries from '@/data/countries.json';
import SecurityLabel from './SecurityLabel';

const phoneOptions = countries.map(({ DDI, isoAlpha2, name, nativeName }) => ({
  key: crypto.randomUUID(),
  value: DDI,
  label: (
    <Div
      __display="flex"
      __alignItems="center"
      __width="100%"
      title={`${isoAlpha2} - ${name} (${nativeName})`}
    >
      <Div __display="flex" __alignItems="center" __gap={5} __minWidth={90}>
        <img
          src={`https://cdn.eduzzcdn.com/sun/flags/${isoAlpha2.toLowerCase()}.png`}
          alt={name}
          loading="lazy"
          width="30"
          height="20"
        />
        <span>{DDI}</span>
      </Div>
      <Div __display="flex" __flexDirection="column" __width="100%" __flex={4} __overflow="hidden">
        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</span>
        <small
          style={{
            color: 'gray',
            fontSize: '.8rem',
            opacity: 0.8,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {nativeName}
        </small>
      </Div>
    </Div>
  ),
}));

function UserForm() {
  return (
    <Form.Fieldset name="user">
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

      <Div __display="flex" __gap="1rem" __flexWrap="wrap">
        <Form.Select
          required
          id="user-ddi"
          name="user-ddi"
          label="DDI"
          props={{
            container: { style: { flex: 1, minWidth: '4rem', maxWidth: '7rem' } },
            ul: { style: { maxWidth: '18.75rem', width: 'max-content' } },
          }}
          options={phoneOptions}
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
    </Form.Fieldset>
  );
}

export default UserForm;
