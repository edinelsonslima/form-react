import { Form } from '@/components/Form';

export function Shipping() {
  return (
    <Form.Fieldset name="shipping" legend="FORMAS DE ENVIO">
      <Form.Input
        type="radio"
        name="delivery"
        id="delivery-1"
        value="1"
        label="Sedex (R$ 10,00) - Entrega em até 5 dias úteis"
        defaultChecked
      />
      <Form.Input
        type="radio"
        name="delivery"
        id="delivery-2"
        value="2"
        label="Pac (R$ 5,00) - Entrega em até 10 dias úteis"
      />
      <Form.Input
        type="radio"
        name="delivery"
        id="delivery-3"
        value="3"
        label="Retirar na loja (Grátis) - Entrega em até 2 dias úteis"
      />
    </Form.Fieldset>
  );
}
