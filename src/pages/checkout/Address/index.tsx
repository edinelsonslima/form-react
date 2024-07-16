import Div from '@/components/Div';
import Form from '@/components/Form';

function Address() {
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

      <Div __display="flex" __gap="1rem" __alignItems="start">
        <Form.Input
          type="text"
          id="address-neighborhood"
          name="address-neighborhood"
          label="Bairro"
          autoComplete="shipping address-level2"
        />
        <Div __display="flex" __gap="1rem" __flexDirection="column">
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
            label={
              <small style={{ fontSize: '.875rem', color: '#00000072', fontWeight: 400 }}>
                Não tenho número
              </small>
            }
          />
        </Div>
      </Div>

      <Form.Input
        type="text"
        id="address-complement"
        name="address-complement"
        label="Complemento"
        autoComplete="shipping address-line3"
      />

      <Div __display="flex" __gap="1rem" __alignItems="start">
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
      </Div>
    </Form.Fieldset>
  );
}

export default Address;
