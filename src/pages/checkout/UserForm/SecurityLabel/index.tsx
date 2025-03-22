import { IconLock } from '@/assets/icons/lock';

export function SecurityLabel() {
  return (
    <div className="flex items-center flex-wrap justify-end gap-1 h-min w-ful text-font">
      <IconLock color="#1ab25a" />
      <p
        title="Seus dados estão protegidos"
        className="overflow-hidden text-ellipsis whitespace-nowrap text-sm"
      >
        Seus dados estão protegidos
      </p>
    </div>
  );
}
