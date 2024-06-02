import { lazy } from 'react';
import { type IRoot } from './Root';

const Form = {
  Root: lazy(() => import('./Root')) as IRoot,
  Input: lazy(() => import('./Inputs/Proxy')),
};

export default Form;
