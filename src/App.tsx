import Form from './components/Form';
import Popover from './components/Popover';

type FormValues = {
  username: string;
  password: string;
  email: string;
  phone: string;
};

function App() {
  return (
    <section style={{ padding: '1rem' }}>
      <Form.Root<FormValues> id="user-form" layout="vertical" onSubmit={console.log}>
        <Form.Input
          type="text"
          id="username"
          name="username"
          label={{
            message: 'Username',
            info: (
              <Popover id="popover-username">
                <small>Enter your username</small>
              </Popover>
            ),
          }}
          placeholder='e.g. "john_doe123"'
          pattern={(value) => {
            if (value.length < 8) return 'Username must be at least 8 characters long';

            if (value.length > 16) return 'Username must be at most 16 characters long';

            if (!/^[a-zA-Z0-9]*$/.test(value))
              return 'Username must contain only letters and numbers';

            if (value.startsWith('admin')) return 'Username cannot start with "admin"';

            return '';
          }}
          required
        />

        <Form.Input
          type="password"
          id="password"
          name="password"
          label="Password"
          placeholder="********"
          pattern={{
            message: 'Password must be at least 8 digits long',
            regexp: '^[0-9]{8,}$',
          }}
        />

        <Form.Input
          type="email"
          id="email"
          name="email"
          placeholder="e.g.  example@domain.com"
          label="Email"
        />

        <Form.Input
          type="tel"
          id="phone"
          name="phone"
          label="Telephone"
          placeholder="+00 (00) 0 0000-0000"
          onChange={(_, value, masked) => console.log({ value, masked })}
          mask="(00) 0000-0000, (00) 0 0000-0000, +00 (00) 0 0000-0000"
        />

        <Form.Input
          type="text"
          id="document"
          name="document"
          label="CPF ou CNPJ"
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          mask={{
            set(value) {
              value = value || '';

              const regexp =
                value.length <= 11
                  ? /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/
                  : /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/;

              const result =
                value.length < 4
                  ? '$1'
                  : value.length < 7
                    ? '$1.$2'
                    : value.length < 10
                      ? '$1.$2.$3'
                      : value.length <= 11
                        ? '$1.$2.$3-$4'
                        : '$1.$2.$3/$4-$5';

              return value.replace(regexp, result).replace(/-$/, '');
            },
            clear(value) {
              value = value || '';

              return value.replace(/[^\d]/gi, '').substring(0, 14);
            },
          }}
        />

        <Form.Input
          type="submit"
          value="Pagar e Receber agora"
          id="submit-button"
          name="submit-button"
        />
      </Form.Root>

      <Form.Input label="outside" id="outside" name="outside" form="user-form" />
    </section>
  );
}

export default App;
