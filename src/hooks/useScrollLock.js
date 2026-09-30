import { useEffect, useRef } from 'react';

let lockCount = 0;
let savedScrollY = 0;
let originalStyles = null;

/**
 * Reusable custom hook to lock background scroll when an overlay/drawer is open.
 * Restores exact scroll position upon closing and prevents layout shifts.
 */
export function useScrollLock(isLocked) {
  const isAppliedRef = useRef(false);

  useEffect(() => {
    if (!isLocked) {
      if (isAppliedRef.current) {
        unlockScroll();
        isAppliedRef.current = false;
      }
      return;
    }

    lockScroll();
    isAppliedRef.current = true;

    return () => {
      if (isAppliedRef.current) {
        unlockScroll();
        isAppliedRef.current = false;
      }
    };
  }, [isLocked]);
}

export function lockScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockScroll(overrideScrollY) {
  if (typeof document === 'undefined') return;

  if (lockCount > 0) {
    lockCount--;
  }

  if (lockCount === 0 && originalStyles) {
    const targetY = typeof overrideScrollY === 'number' ? overrideScrollY : savedScrollY;

    document.body.style.position = originalStyles.position || '';
    document.body.style.top = originalStyles.top || '';
    document.body.style.left = originalStyles.left || '';
    document.body.style.right = originalStyles.right || '';
    document.body.style.width = originalStyles.width || '';
    document.body.style.paddingRight = originalStyles.paddingRight || '';
    document.body.style.overflow = originalStyles.overflow || '';

    originalStyles = null;
    window.scrollTo(0, targetY);
  }
}
