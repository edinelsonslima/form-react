import { ElementType, ComponentProps } from 'react';

type WithShouldRenderProps<T extends ElementType> = ComponentProps<T> & {
  shouldRender: boolean;
};

export function withShouldRender<T extends ElementType>(Component: T) {
  function shouldRender({ shouldRender, ...props }: WithShouldRenderProps<typeof Component>) {
    return shouldRender ? <Component {...(props as ComponentProps<typeof Component>)} /> : null;
  }

  return shouldRender;
}
