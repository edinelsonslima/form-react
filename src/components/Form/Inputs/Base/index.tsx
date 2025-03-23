import { memo } from 'react';
import { IProps } from './types';
import { useController } from './use.controller';
import { mp } from '@/helpers/mp';

import { Label } from './label';
import { Error } from './error';
import { Adornment } from './Adornment';

import s from './index.module.css';

function InputComponent({ label, suffix, prefix, components, ...rest }: IProps) {
  const { currentError, errorId, ...props } = useController(rest);

  return (
    <div {...mp(components?.inputW, s['input-wrapper'])}>
      <Label
        shouldRender={!!label}
        htmlFor={props.id}
        suffix={Object(label)?.suffix}
        components={{ container: components?.labelW, label: components?.label }}
      >
        {Object(label)?.message || label}
      </Label>

      <div {...mp(components?.inputC, s['input-content'])}>
        <Adornment
          shouldRender={!!prefix}
          {...mp(components?.prefix, { onClick: () => props.ref.current?.focus() })}
        >
          {prefix}
        </Adornment>

        <input
          {...mp(props, s.input)}
          title={currentError || undefined}
          aria-invalid={!!currentError}
          aria-errormessage={currentError ? errorId : undefined}
          aria-disabled={props.disabled}
          data-prefix={!!prefix}
          data-suffix={!!suffix}
        />

        <Adornment
          shouldRender={!!suffix}
          {...mp(components?.suffix, { onClick: () => props.ref.current?.focus() })}
        >
          {suffix}
        </Adornment>
      </div>

      <Error
        shouldRender={!!currentError}
        aria-errormessage={errorId}
        id={errorId}
        {...mp(components?.error)}
      >
        {currentError}
      </Error>
    </div>
  );
}

export const Input = memo(InputComponent);
export type { IProps };
