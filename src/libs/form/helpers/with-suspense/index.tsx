import { ElementType, ComponentProps, ReactNode, Suspense } from 'react';
import { LoadPromise } from './load-promise';

export type WithSuspenseProps<T extends ElementType> = ComponentProps<T> & {
  fallback?: ReactNode;
  promise?: {
    [K in keyof ComponentProps<T>]: { [P in K]: Promise<ComponentProps<T>[P]> };
  }[keyof ComponentProps<T>];
};

export function withSuspense<T extends ElementType>(Component: T) {
  return function WrappedComponent({ promise, fallback, ...props }: WithSuspenseProps<T>) {
    if (!promise) {
      return <Component {...(props as ComponentProps<T>)} />;
    }

    const [[key, value]] = Object.entries<Promise<unknown>>(promise);

    return (
      <Suspense fallback={fallback}>
        <LoadPromise Component={Component} promise={{ key, value }} props={props} />
      </Suspense>
    );
  };
}
