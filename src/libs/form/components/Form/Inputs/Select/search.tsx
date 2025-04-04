import { withShouldRender } from '@/libs/form/helpers/should.render';
import { Input, IProps } from '../Base';

function InputSelectSearchComponent({ components, ...props }: IProps) {
  return (
    <Input
      autoFocus
      type="search"
      label="Selecionar"
      components={{
        ...components,
        inputC: { height: 40 },
        wrapper: () => ({
          id: 'option-search',
          style: { position: 'sticky', top: 0, background: '#fff', padding: '10px 16px 8px' },
        }),
      }}
      {...props}
    />
  );
}

export const InputSelectSearch = withShouldRender(InputSelectSearchComponent);
