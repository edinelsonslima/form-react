import { ComponentProps, memo, useEffect, useState } from 'react';

import useSafeElementPosition from '@/hooks/use.safe.element.position';
import s from './index.module.css';

type IPopoverProps = ComponentProps<'div'> & {
  timer?: number;
};

function Component({ timer = 2_000, children, ...props }: IPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentRef] = useSafeElementPosition<HTMLSpanElement>();

  const handleShowPopover = () => {
    setIsOpen(true);
  };

  const handleHidePopover = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(handleHidePopover, timer);
    return () => clearTimeout(timeoutId);
  }, [isOpen, timer]);

  return (
    <div className={s['popover-button-container']} {...props}>
      <button
        type="button"
        onMouseEnter={handleShowPopover}
        onMouseLeave={handleHidePopover}
        onClick={handleShowPopover}
        tabIndex={-1}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={contentRef.current?.id}
      >
        ?
      </button>

      <span
        ref={contentRef}
        className={isOpen ? s['not-sr-only'] : s['sr-only']}
        tabIndex={-1}
        aria-hidden={!isOpen}
        aria-live="polite"
      >
        {children}
      </span>
    </div>
  );
}

const Popover = memo(Component);
export default Popover;
