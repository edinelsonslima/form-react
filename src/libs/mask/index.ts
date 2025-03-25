import { RefObject } from 'react';

export { useMask, useMasks } from './hook';
export { Input } from './component';
export { masks } from './masks';

export type Mask = string | { set: (input: string) => string; clear: (input: string) => string };
export type HTMLInput = HTMLInputElement & { 'rb-value': string };
export type Target = RefObject<HTMLInput | null> | undefined;
