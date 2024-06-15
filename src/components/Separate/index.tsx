import cn from '@/helpers/cn';

import s from './index.module.css';

type IProps = {
  transparent?: boolean;
};

function Separate({ transparent }: IProps) {
  return <span data-transparent={transparent} className={cn(s, 'separate')} />;
}

export default Separate;
