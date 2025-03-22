import { useEffect, useRef } from 'react';

type Padding = number | { top?: number; right?: number; bottom?: number; left?: number };

export type IPositionPreference = 'corners' | 'horizontal' | 'vertical';

type IProps = {
  padding?: Padding;
  positionPreference?: IPositionPreference;
};

export function useSafeElementPosition<
  TContainer extends HTMLElement = HTMLElement,
  TContent extends HTMLElement = HTMLElement,
>({ positionPreference = 'corners', padding }: IProps = {}) {
  const containerRef = useRef<TContainer>(null);
  const contentRef = useRef<TContent>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const containerWidth = container?.clientWidth || 0;
    const containerHeight = container?.clientHeight || 0;

    const rect = content.getBoundingClientRect();
    const largestSideTop = rect.top > window.innerHeight - rect.bottom;
    const largestSideRight = window.innerWidth - rect.right > rect.left;
    const largestSideBottom = window.innerHeight - rect.bottom > rect.top;
    const largestSideLeft = rect.left > window.innerWidth - rect.right;

    const paddingTop = Number(padding) || Object(padding)?.top || 2;
    const paddingRight = Number(padding) || Object(padding)?.right || 2;
    const paddingBottom = Number(padding) || Object(padding)?.bottom || 2;
    const paddingLeft = Number(padding) || Object(padding)?.bottom || 2;

    const corners = (): Partial<CSSStyleDeclaration> => {
      const topReposition: Partial<CSSStyleDeclaration> = {
        bottom: `${containerHeight + paddingBottom}px`,
      };

      const rightReposition: Partial<CSSStyleDeclaration> = {
        left: `${containerWidth + paddingLeft}px`,
      };

      const bottomReposition: Partial<CSSStyleDeclaration> = {
        top: `${containerHeight + paddingTop}px`,
      };

      const leftReposition: Partial<CSSStyleDeclaration> = {
        right: `${containerWidth + paddingRight}px`,
      };

      return {
        ...(largestSideTop && topReposition),
        ...(largestSideRight && rightReposition),
        ...(largestSideBottom && bottomReposition),
        ...(largestSideLeft && leftReposition),
      };
    };

    const horizontal = () => {
      const topReposition: Partial<CSSStyleDeclaration> = {
        bottom: `${containerHeight + paddingBottom}px`,
        right: '50%',
        transform: 'translateX(50%)',
      };

      const bottomReposition: Partial<CSSStyleDeclaration> = {
        top: `${containerHeight + paddingTop}px`,
        right: '50%',
        transform: 'translateX(50%)',
      };

      return {
        ...(largestSideTop && topReposition),
        ...(largestSideBottom && bottomReposition),
      };
    };

    const vertical = () => {
      const rightReposition: Partial<CSSStyleDeclaration> = {
        left: `${containerWidth + paddingLeft}px`,
        bottom: '50%',
        transform: 'translateY(50%)',
      };

      const leftReposition: Partial<CSSStyleDeclaration> = {
        right: `${containerWidth + paddingRight}px`,
        bottom: '50%',
        transform: 'translateY(50%)',
      };

      return {
        ...(largestSideRight && rightReposition),
        ...(largestSideLeft && leftReposition),
      };
    };

    const newStyles = Object.entries({ corners, horizontal, vertical }[positionPreference]());

    ['top', 'right', 'left', 'bottom'].forEach((key) => content.style.removeProperty(key));
    newStyles.forEach(([key, value]) => content.style.setProperty(key, value as string));
  }, [padding, positionPreference]);

  return [containerRef, contentRef] as const;
}
