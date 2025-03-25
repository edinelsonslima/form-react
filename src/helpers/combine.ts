import { ComponentProps, CSSProperties, JSX } from 'react';

export function cp(
  component?: string | CSSProperties | (() => ComponentProps<keyof JSX.IntrinsicElements>),
  className?: string,
) {
  if (!component && !className) {
    return {};
  }

  if (typeof component === 'string') {
    return { className: cn(component, className) };
  }

  if (typeof component === 'object' && !('className' in component)) {
    return { className: cn(className), style: component };
  }

  if (typeof component === 'object' && 'className' in component) {
    return { ...component, className: cn(component?.className, className) };
  }

  if (typeof component === 'function') {
    const props = component();
    return { ...props, className: cn(props?.className, className) };
  }

  return { className: cn(className) };
}

export function cn(...classes: (string | undefined | unknown)[]) {
  return classes
    .join(' ')
    .replace(/(undefined|null)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
