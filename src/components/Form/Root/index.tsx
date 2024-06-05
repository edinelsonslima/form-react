import useController from './use.controller';

import s from './index.module.css';
import { IProps } from './types';

function Root<T extends object>({ layout = 'vertical', ...props }: IProps<T>) {
  const { ...rest } = useController<T>(props);
  return <form className={s.root} data-layout={layout} {...rest} />;
}

export type { IProps };
export default Root;
