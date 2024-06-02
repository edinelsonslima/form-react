import { useEffect, useRef } from 'react';

const padding = 2;

function useSafeElementPosition<TContent extends HTMLElement>() {
  const contentRef = useRef<TContent>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const siblingWidth = content.previousElementSibling?.clientWidth || 0;
    const siblingHeight = content.previousElementSibling?.clientHeight || 0;

    const rect = content.getBoundingClientRect();
    const largestSideTop = rect.top > window.innerHeight - rect.bottom;
    const largestSideRight = window.innerWidth - rect.right > rect.left;
    const largestSideBottom = window.innerHeight - rect.bottom > rect.top;
    const largestSideLeft = rect.left > window.innerWidth - rect.right;

    let top = 'inherit';
    let left = 'inherit';
    let right = 'inherit';
    let bottom = 'inherit';

    if (largestSideTop && largestSideLeft) {
      right = `${siblingWidth + padding}px`;
      bottom = `${siblingHeight + padding}px`;
    }

    if (largestSideTop && largestSideRight) {
      left = `${siblingWidth + padding}px`;
      bottom = `${siblingHeight + padding}px`;
    }

    if (largestSideBottom && largestSideRight) {
      left = `${siblingWidth + padding}px`;
      top = `${siblingHeight - padding}px`;
    }

    if (largestSideBottom && largestSideLeft) {
      right = `${siblingWidth + padding}px`;
      top = `${siblingHeight - padding}px`;
    }

    content.style.top = top;
    content.style.left = left;
    content.style.right = right;
    content.style.bottom = bottom;
  });

  return [contentRef] as const;
}

export default useSafeElementPosition;
