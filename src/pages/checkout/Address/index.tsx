import Div from '@/components/Div';
import Form from '@/components/Form';

function Address() {
  return (
    <Form.Fieldset name="address" legend="ENDEREÇO">
      <Form.Input type="text" id="address-cep" name="address-cep" label="CEP da Residência" />
      <Form.Input type="text" id="address-street" name="address-street" label="Endereço" />

      <Div __display="flex" __gap="1rem" __alignItems="start">
        <Div __display="flex" __gap="1rem" __flexDirection="column">
          <Form.Input type="text" id="address-number" name="address-number" label="Número" />
          <Form.Input
            type="checkbox"
            id="without-number"
            name="without-number"
            label="Não tenho número"
          />
        </Div>
        <Form.Input
          type="text"
          id="address-neighborhood"
          name="address-neighborhood"
          label="Bairro"
        />
      </Div>

      <Form.Input
        type="text"
        id="address-complement"
        name="address-complement"
        label="Complemento"
      />

      <Div __display="flex" __gap="1rem" __alignItems="start">
        <Form.Select id="address-state" name="address-state" label="Estado" options={[]} />
        <Form.Select id="address-city" name="address-city" label="Cidade" options={[]} />
      </Div>
    </Form.Fieldset>
  );
}

export default Address;
