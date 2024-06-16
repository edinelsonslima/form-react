import { CSSProperties as CSS } from 'react';

export type CSSProperties = Partial<Record<`__${keyof CSS}`, CSS[keyof CSS]>>;
