import { Form } from '@/libs/form/components/Form';

export function Address() {
  return (
    <Form.Fieldset name="address" legend="ENDEREÇO">
      <Form.Input
        type="text"
        autoComplete="shipping postal-code"
        id="address-postal-code"
        name="address-postal-code"
        label="CEP da Residência"
        mask="00000-000"
      />

      <Form.Input
        type="text"
        id="address-street"
        name="address-street"
        label="Endereço"
        autoComplete="shipping address-line1"
      />

      <div className="flex gap-4 items-start">
        <Form.Input
          type="text"
          id="address-neighborhood"
          name="address-neighborhood"
          label="Bairro"
          autoComplete="shipping address-level2"
        />
        <div className="flex gap-4 flex-col">
          <Form.Input
            type="text"
            id="address-number"
            name="address-number"
            label="Número"
            autoComplete="shipping address-line2"
          />
          <Form.Input
            type="checkbox"
            id="without-number"
            name="without-number"
            label={<small className="text-sm text-black/40 font-normal">Não tenho número</small>}
          />
        </div>
      </div>

      <Form.Input
        type="text"
        id="address-complement"
        name="address-complement"
        label="Complemento"
        autoComplete="shipping address-line3"
      />

      <div className="flex gap-4 items-start">
        <Form.Select
          id="address-state"
          name="address-state"
          label="Estado"
          options={[]}
          autoComplete="shipping address-level1"
        />
        <Form.Select
          id="address-city"
          name="address-city"
          label="Cidade"
          options={[]}
          autoComplete="shipping address-level3"
        />
      </div>
    </Form.Fieldset>
  );
}
