import { ForwardedRef, RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  ignoreRef: ForwardedRef<HTMLElement> | RefObject<HTMLElement> | null = null,
  onClickOutside: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (
          typeof ignoreRef !== 'function' &&
          ignoreRef?.current &&
          ignoreRef.current.contains(event.target as Node)
        ) {
          return;
        }
        onClickOutside(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ignoreRef, onClickOutside]);
};
