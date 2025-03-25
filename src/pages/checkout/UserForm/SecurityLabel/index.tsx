import { IconLock } from '@/assets/icons/lock';

export function SecurityLabel() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'end',
        gap: 4,
        height: 'min-content',
        width: '100%',
      }}
    >
      <IconLock color="#1ab25a" width={14} height={14} />
      <p
        title="Seus dados estão protegidos"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 'var(--rb-font-sm)',
          color: 'var(--rb-color-gray-500)',
        }}
      >
        Seus dados estão protegidos
      </p>
    </div>
  );
}
