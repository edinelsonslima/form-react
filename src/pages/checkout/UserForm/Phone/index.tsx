import { Form } from '@/libs/form/components/Form';
import countries from '@/pages/data/countries.json';
import { Label } from './label';

const phoneOptions = countries.map(({ DDI, isoAlpha2, name, nativeName }) => ({
  key: crypto?.randomUUID?.() ?? Math.random(),
  label: <Label isoAlpha2={isoAlpha2} name={name} nativeName={nativeName} DDI={DDI} />,
  value: DDI,
}));

export function Phone() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Form.Select
        builtinSearch
        id="user-ddi"
        name="user-ddi"
        label="DDI"
        autoComplete="tel-country-code"
        defaultValue="+55"
        options={phoneOptions}
        components={{
          select: { flex: 1, minWidth: '4rem', maxWidth: '6rem', width: 'auto' },
          ul: { minWidth: '18.75rem', maxWidth: '18.75rem', width: 'max-content' },
        }}
      />

      <Form.Input
        type="tel"
        id="user-phone"
        name="user-phone"
        label="Celular"
        mask="(00) 0000-0000, (00) 0 0000-0000"
        components={{ wrapper: { flex: 1 } }}
      />
    </div>
  );
}
