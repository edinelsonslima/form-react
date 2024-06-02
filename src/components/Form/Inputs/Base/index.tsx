import Popover from '@/components/Popover';
import { forwardRef, memo } from 'react';
import { IProps } from './types';
import useController from './use.controller';

import s from './css/index.module.css';

const Component = forwardRef<HTMLInputElement, IProps>(
  ({ label, labelInfo, ...props }, ref) => {
    const { currentError, popoverId, errorId, ...rest } = useController(
      props,
      ref,
    );

    return (
      <div className={s['input-container']}>
        {label && (
          <div className={s['input-label-container']}>
            <label className={s['input-label']} htmlFor={props.id}>
              {label}
            </label>

            {labelInfo && <Popover id={popoverId}>{labelInfo}</Popover>}
          </div>
        )}

        <input
          {...rest}
          className={s.input}
          aria-invalid={!!currentError}
          aria-disabled={props.disabled}
          aria-errormessage={currentError ? errorId : undefined}
        />

        {currentError && (
          <small className={s['input-error']} aria-errormessage={errorId}>
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
