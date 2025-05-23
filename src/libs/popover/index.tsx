import { ComponentProps, memo, ReactNode, useEffect, useState } from 'react';
import { useSafeElementPosition, IPositionPreference } from './use.safe.element.position';

import s from './index.module.css';

type IPopoverProps = ComponentProps<'button'> & {
  timer?: number;
  positionPreference?: IPositionPreference;
  trigger?: ReactNode;
};

function PopoverComponent({
  timer = 2_000,
  trigger = '?',
  positionPreference,
  children,
  ...props
}: IPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [containerRef, contentRef] = useSafeElementPosition<HTMLButtonElement>({
    positionPreference: positionPreference ?? 'vertical',
  });

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
    <button
      ref={containerRef}
      type="button"
      onMouseEnter={handleShowPopover}
      onMouseLeave={handleHidePopover}
      onClick={handleShowPopover}
      className={s['popover-container']}
      tabIndex={-1}
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls={contentRef.current?.id}
      {...props}
    >
      {trigger}
      <span
        ref={contentRef}
        className={isOpen ? s['not-sr-only'] : s['sr-only']}
        tabIndex={-1}
        aria-hidden={!isOpen}
        aria-live="polite"
      >
        {children}
      </span>
    </button>
  );
}

export const Popover = memo(PopoverComponent);
