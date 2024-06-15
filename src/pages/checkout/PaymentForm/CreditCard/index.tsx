import Div from '@/components/Div';
import Fieldset from '@/components/Fieldset';
import Form from '@/components/Form';
import Popover from '@/components/Popover';

function CreditCard() {
  return (
    <Fieldset name="credit">
      <Form.Input
        id="holder-number"
        name="holder-number"
        label="Número do Cartão"
        mask="0000  0000  0000  0000"
      />

      <Div display="flex" gap="1rem" align-items="end">
        <Form.Input
          id="holder-validity"
          name="holder-validity"
          label="Validade"
          mask="00/00"
          placeholder="MM/AA"
          props={{ container: { style: { flex: 1, minWidth: '4rem', maxWidth: '7rem' } } }}
        />

        <Form.Input
          id="holder-cvv"
          name="holder-cvv"
          mask="0000"
          props={{ container: { style: { flex: 1 } } }}
          label={{
            message: 'Código de segurança',
            info: (
              <Popover positionPreference="corners">
                <img
                  src="https://cdn.eduzzcdn.com/sun/assets/img/creditcard-cvv.png"
                  alt="Código de segurança"
                />
              </Popover>
            ),
          }}
        />
      </Div>

      <Form.Input id="holder-name" name="holder-name" label="Nome impresso no cartão" />
    </Fieldset>
  );
}

export default CreditCard;
