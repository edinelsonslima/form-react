import { CSSProperties as CSS } from 'react';

export type CSSProperties = Partial<Record<`${keyof CSS}`, CSS[keyof CSS]>>;
