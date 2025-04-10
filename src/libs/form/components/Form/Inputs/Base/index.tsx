import { memo } from 'react';

import { Label } from './label';
import { Error } from './error';
import { IProps } from './types';
import { useController } from './use.controller';

import { cn, cp } from '@/libs/form/helpers/combine';

import s from './index.module.css';

function InputComponent({ label, suffix, prefix, components, ...rest }: IProps) {
  const { currentError, errorId, ...props } = useController(rest);

  return (
    <div {...cp(components?.wrapper, s['input-wrapper'])}>
      <Label
        {...cp(components?.label)}
        container={cp(components?.labelW)}
        shouldRender={!!label}
        htmlFor={props.id}
        suffix={Object(label)?.suffix}
      >
        {Object(label)?.message || label}
      </Label>

      <div {...cp(components?.inputC, s['input-content'])}>
        {!!prefix && prefix}

        <input
          {...props}
          className={cn(props?.className, s.input)}
          title={currentError || undefined}
          aria-invalid={!!currentError}
          aria-errormessage={currentError ? errorId : undefined}
          aria-disabled={props.disabled}
          data-prefix={!!prefix}
          data-suffix={!!suffix}
        />

        {suffix && suffix}
      </div>

      <Error
        shouldRender={!!currentError}
        aria-errormessage={errorId}
        id={errorId}
        {...cp(components?.error)}
      >
        {currentError}
      </Error>
    </div>
  );
}

export const Input = memo(InputComponent);
export type { IProps };
