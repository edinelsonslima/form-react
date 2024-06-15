import IconLock from '@/assets/icons/lock';
import cn from '@/helpers/cn';

import s from './index.module.css';

function SecurityLabel() {
  return (
    <div className={cn(s, 'security-label')}>
      <IconLock />
      <p title="Seus dados estão protegidos">Seus dados estão protegidos</p>
    </div>
  );
}

export default SecurityLabel;
