import { Checkout } from './pages/checkout';

export function App() {
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
      <Checkout />
    </>
  );
}
