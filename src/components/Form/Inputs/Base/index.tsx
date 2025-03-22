import { ForwardedRef, forwardRef, memo } from 'react';
import { IProps } from './types';
import useController from './use.controller';

import { Label } from './label';
import { Error } from './error';
import { Adornment } from './Adornment';

import s from './index.module.css';

function InputComponent(
  { label, suffix, prefix, ...rest }: IProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { currentError, errorId, className, ...props } = useController(rest, ref);

  return (
    <div className={s['input-container']}>
      <Label shouldRender={!!label} htmlFor={props.id} suffix={Object(label)?.suffix}>
        {Object(label)?.message || label}
      </Label>

      <div className={s['input-content']}>
        <Adornment shouldRender={!!prefix} onClick={() => props.ref?.current?.focus()}>
          {prefix}
        </Adornment>

        <input
          {...props}
          className={`${s.input} ${className}`}
          title={currentError || undefined}
          aria-invalid={!!currentError}
          aria-errormessage={currentError ? errorId : undefined}
          aria-disabled={props.disabled}
          data-prefix={!!prefix}
          data-suffix={!!suffix}
        />

        <Adornment shouldRender={!!suffix} onClick={() => props.ref?.current?.focus()}>
          {suffix}
        </Adornment>
      </div>

      <Error shouldRender={!!currentError} aria-errormessage={errorId} id={errorId}>
        {currentError}
      </Error>
    </div>
  );
}

export const Input = memo(forwardRef(InputComponent));
export type { IProps };
