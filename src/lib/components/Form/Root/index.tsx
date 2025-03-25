import { useController } from './use.controller';
import { IProps } from './types';

import s from './index.module.css';

export function Root<T extends object>({ layout = 'column', className, ...props }: IProps<T>) {
  const { ...rest } = useController<T>(props);

  return <form data-layout={layout} className={`${s.form} ${className}`} {...rest} />;
}

export type { IProps };
