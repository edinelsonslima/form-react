import cn from '@/helpers/cn';
import { forwardRef, memo } from 'react';
import { IProps } from './types';
import useController from './use.controller';

import s from './css/index.module.css';

const Component = forwardRef<HTMLInputElement, IProps>(
  ({ label, props: othersProps, suffix, prefix, ...rest }, ref) => {
    const { currentError, errorId, ...props } = useController(rest, ref);

    return (
      <div
        {...othersProps?.container}
        className={cn(s, 'input-container', othersProps?.container?.className)}
      >
        {label && (
          <div
            {...othersProps?.label?.container}
            className={cn(s, 'input-label-container', othersProps?.label?.container?.className)}
          >
            <label
              {...othersProps?.label?.label}
              htmlFor={rest.id}
              children={typeof label === 'object' && 'message' in label ? label.message : label}
              className={cn(s, 'input-label', othersProps?.label?.label?.className)}
            />

            {typeof label === 'object' && 'info' in label && label.info}
          </div>
        )}

        <div className={cn(s, 'input-content')}>
          {prefix && (
            <span onClick={() => props.ref?.current?.focus()} className={cn(s, 'input-prefix')}>
              {prefix}
            </span>
          )}
          <input
            {...props}
            className={cn(s, 'input', rest?.className)}
            title={currentError || undefined}
            aria-invalid={!!currentError}
            aria-disabled={rest.disabled}
            aria-errormessage={currentError ? errorId : undefined}
          />
          {suffix && (
            <span onClick={() => props.ref?.current?.focus()} className={cn(s, 'input-suffix')}>
              {suffix}
            </span>
          )}
        </div>

        {currentError && (
          <small
            {...othersProps?.error}
            className={cn(s, 'input-error', othersProps?.error?.className)}
            aria-errormessage={errorId}
          >
            {currentError}
          </small>
        )}
      </div>
    );
  },
);

export type { IProps };

const Input = memo(Component);
export default Input;
