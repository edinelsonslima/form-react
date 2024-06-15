import { CSSProperties as CSS } from 'react';

type KebabCase<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${First extends Uppercase<First> ? `-${Lowercase<First>}` : First}${KebabCase<Rest>}`
  : T;

type KebabCaseKeys<T extends object> = {
  [k in keyof T as KebabCase<string & k>]: T[k];
};

export type CSSProperties = KebabCaseKeys<CSS>;
