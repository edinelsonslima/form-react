import { ElementType, use } from 'react';

interface LoadPromiseProps<TPromise, TProps> {
  promise: { key: string; value: Promise<TPromise> };
  Component: ElementType;
  props: TProps;
}

export function LoadPromise<TPromise, TProps>({
  Component,
  props,
  promise: { key, value: promise },
}: LoadPromiseProps<TPromise, TProps>) {
  const result = use(promise);

  return <Component {...{ ...props, [key]: result }} />;
}
