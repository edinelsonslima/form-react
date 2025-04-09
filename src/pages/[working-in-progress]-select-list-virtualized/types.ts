import { ComponentProps } from 'react';

export interface Option {
  value: number;
  label: string;
}

export interface Props extends ComponentProps<'button'> {
  options: Option[];
  label: string;
  height?: number;
  itemHeight?: number;
}

export interface State {
  selected: Option | null;
  scrollTop: number;
  open: boolean;
  height: number;
  itemHeight: number;
}
