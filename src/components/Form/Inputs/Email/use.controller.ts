import { ISelectOptions } from '../Select/types';
import { IProps } from './types';

const providersOptions: ISelectOptions = [
  { key: 'gmail.com', value: 'gmail.com' },
  { key: 'hotmail.com', value: 'hotmail.com' },
  { key: 'outlook.com', value: 'outlook.com' },
  { key: 'yahoo.com', value: 'yahoo.com' },
  { key: 'msn.com', value: 'msn.com' },
  { key: 'bol.com.br', value: 'bol.com.br' },
];

function useController(props: IProps) {
  const customFilter = (input?: string): ISelectOptions => {
    const [email] = input?.split('@') ?? [];

    if (!input?.includes('@')) return [];

    const filtered = providersOptions
      .map(({ key, value }) => ({ key, value: `${email}@${value}` }))
      .filter((email) => email.value.includes(input));

    if (filtered.length === 1 && filtered.at(0)!.value === input) {
      return [];
    }

    return filtered;
  };

  return { providersOptions, customFilter, ...props };
}

export default useController;
