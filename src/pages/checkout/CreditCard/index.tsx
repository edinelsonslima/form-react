import { Form } from '@/components/Form';
import { Popover } from '@/components/Popover';

export function CreditCard() {
  return (
    <Form.Fieldset name="credit" legend="FORMAS DE PAGAMENTO">
      <Form.Input
        prefix={
          <img
            src="https://cdn.eduzzcdn.com/sun/assets/img/payment-method/brand/one_card.svg"
            alt="Bandeira do cartão"
            width={20}
            height={20}
            loading="eager"
          />
        }
        id="holder-number"
        name="holder-number"
        label="Número do Cartão"
        mask="0000  0000  0000  0000"
        autoComplete="cc-number"
      />

      <div className="flex gap-4 items-end">
        <Form.Input
          id="holder-validity"
          name="holder-validity"
          label="Validade"
          mask="00/00"
          placeholder="MM/AA"
          autoComplete="cc-exp"
          components={{ wrapper: { flex: 1, minWidth: '4rem', maxWidth: '7rem' } }}
        />

        <Form.Input
          id="holder-cvv"
          name="holder-cvv"
          mask="0000"
          autoComplete="cc-csc"
          components={{ wrapper: { flex: 1 } }}
          label={{
            message: 'Código de segurança',
            suffix: (
              <Popover positionPreference="corners">
                <img
                  src="https://cdn.eduzzcdn.com/sun/assets/img/creditcard-cvv.png"
                  alt="Código de segurança"
                />
              </Popover>
            ),
          }}
        />
      </div>

      <Form.Input
        id="holder-name"
        name="holder-name"
        label="Nome impresso no cartão"
        autoComplete="cc-name"
      />

      <Form.Input
        defaultChecked
        type="checkbox"
        id="holder-save-card"
        name="holder-save-card"
        label="Usar esses dados nas próximas compras"
      />
    </Form.Fieldset>
  );
}
