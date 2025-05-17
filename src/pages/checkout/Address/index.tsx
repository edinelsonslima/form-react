import { Form } from '@/libs/form/components/Form';
import { STATES } from './states';
import { useState } from 'react';

export function Address() {
  const [state, setState] = useState<string | null>(null);

  const handleCities = async () => {
    if (!state) return [{ key: '', value: '' }];

    try {
      const response = await fetch(`https://cdn.eduzzcdn.com/sun/cities/${state}.json`);
      const res: { id: number; name: string }[] = await response.json();
      return res.map(({ id, name }) => ({ key: String(id), value: name }));
    } catch {
      return [{ key: '', value: '' }];
    }
  };

  return (
    <Form.Fieldset name="address" legend="ENDEREÇO">
      <Form.Input
        type="text"
        autoComplete="shipping postal-code"
        id="address-postal-code"
        name="address-postal-code"
        label="CEP da Residência"
        mask="00000-000"
        suffix={
          <a
            id="discover-postalCode"
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="blank"
            tabIndex={-1}
            style={{
              background: '#eceff1',
              height: '100%',
              padding: '0 11px',
              borderLeft: '1px solid #B0BEC5',
              display: 'grid',
              placeItems: 'center',
              fontSize: 'var(--rb-font-sm)',
              color: 'var(--rb-color-primary)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Não sei meu CEP
          </a>
        }
      />

      <Form.Input
        type="text"
        id="address-street"
        name="address-street"
        label="Endereço"
        autoComplete="shipping address-line1"
      />

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Input
          type="text"
          id="address-neighborhood"
          name="address-neighborhood"
          label="Bairro"
          autoComplete="shipping address-level2"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
              <small
                style={{ fontSize: 'var(--rb-font-sm)', color: '#00000073', whiteSpace: 'nowrap' }}
              >
                Não tenho número
              </small>
            }
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

      <div style={{ display: 'flex', gap: 16 }}>
        <Form.Select
          id="address-state"
          name="address-state"
          label="Estado"
          color="#000"
          openBy="focus"
          readOnly
          onInput={(evt) => setState(evt.currentTarget.value)}
          options={STATES}
          autoComplete="shipping address-level1"
        />

        <Form.Select
          id="address-city"
          name="address-city"
          label="Cidade"
          options={[]}
          promise={{ options: handleCities() }}
          fallback={<h1>Carregando...</h1>}
          autoComplete="shipping address-level3"
        />
      </div>
    </Form.Fieldset>
  );
}
