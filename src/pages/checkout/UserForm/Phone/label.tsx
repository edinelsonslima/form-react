import { ComponentProps } from 'react';

type Props = {
  isoAlpha2: string;
  name: string;
  nativeName: string;
  DDI: string;
};

export function Flag({
  iso,
  name,
  ...props
}: ComponentProps<'img'> & { iso: string; name: string }) {
  return (
    <img
      src={`https://cdn.eduzzcdn.com/sun/flags/${iso.toLowerCase()}.png`}
      style={{ borderRadius: 'var(--rb-radius-xs)' }}
      alt={name}
      loading="lazy"
      width="30"
      height="20"
      {...props}
    />
  );
}

export function Label({ isoAlpha2, name, nativeName, DDI }: Props) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
      title={`${isoAlpha2} - ${name} (${nativeName})`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '6rem' }}>
        <Flag iso={isoAlpha2} name={name} />
        <span>{DDI}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </span>
        <small
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 12,
            color: 'var(--rb-color-gray-300)',
          }}
        >
          {nativeName}
        </small>
      </div>
    </div>
  );
}
