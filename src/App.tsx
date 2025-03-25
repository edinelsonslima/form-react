import { Checkout } from './pages/checkout';
import { useMask, masks, Input } from './libs/mask';

export function App() {
  const inputRef = useMask(masks.currency());

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          color: 'var(--rb-color-primary)',
          fontSize: 'var(--rb-font-xxl)',
          fontWeight: 'var(--rb-font-bold)',
          marginTop: 'var(--rb-space-3xl)',
        }}
      >
        Checkout
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log(Object.fromEntries(formData.entries()));
          console.log(inputRef.current?.['rb-value']);
        }}
      >
        <input name="mask-ref" ref={inputRef} defaultValue={1.23} />
        <Input name="mask-component" mask={masks.currency()} defaultValue={1.55} />
        <input type="submit" value="enviar" />
      </form>
      <Checkout />
    </>
  );
}
