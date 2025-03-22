import { Form } from '@/components/Form';
import countries from '@/data/countries.json';
import { SecurityLabel } from './SecurityLabel';

const phoneOptions = countries.map(({ DDI, isoAlpha2, name, nativeName }) => ({
  key: crypto?.randomUUID?.() ?? Math.random(),
  value: DDI,
  label: (
    <div className="flex items-center w-full" title={`${isoAlpha2} - ${name} (${nativeName})`}>
      <div className="flex items-center gap-3 min-w-24">
        <img
          src={`https://cdn.eduzzcdn.com/sun/flags/${isoAlpha2.toLowerCase()}.png`}
          alt={name}
          loading="lazy"
          width="30"
          height="20"
        />
        <span>{DDI}</span>
      </div>
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <span className="truncate">{name}</span>
        <small className="truncate text-sm text-gray">{nativeName}</small>
      </div>
    </div>
  ),
}));

export function UserForm() {
  return (
    <Form.Fieldset name="user">
      <Form.Input
        id="user-name"
        name="user-name"
        label="Nome Completo"
        mask={Form.Input.masks.noSpecialCharacter}
        autoComplete="name"
        pattern={(value) => {
          if (!(value.trim().split(' ').length < 2)) return;
          return 'Por favor, informe seu nome completo.';
        }}
      />

      <Form.Input
        type="email"
        id="user-email"
        name="user-email"
        label="E-mail"
        autoComplete="email"
        defaultErrorMessages={(input) => {
          const error = { valueMissing: 'O e-mail é obrigatório.' };

          if (!input.includes('@')) {
            return { typeMismatch: `O e-mail "${input}" precisa conter um "@".`, ...error };
          }

          return { typeMismatch: 'Por favor, informe um e-mail válido.', ...error };
        }}
      />

      <div className="flex gap-4 flex-wrap">
        <div className="flex-shrink min-w-16 max-w-28">
          <Form.Select
            id="user-ddi"
            name="user-ddi"
            label="DDI"
            autoComplete="tel-country-code"
            options={phoneOptions}
            props={{
              ul: { style: { maxWidth: '18.75rem', width: 'max-content' } },
            }}
          />
        </div>

        <Form.Input
          type="tel"
          id="user-phone"
          name="user-phone"
          label="Celular"
          mask="(00) 0000-0000, (00) 0 0000-0000"
        />
      </div>

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
