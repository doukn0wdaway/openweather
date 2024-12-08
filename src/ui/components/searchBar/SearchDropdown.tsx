import { useRef } from 'react';
import { useClickOutside } from '../../../hooks/useEventListener';

export type DropdownOption<T> = { key: string; text: string; value: T };

interface ISearchDropdown<T> {
  options: DropdownOption<T>[];
  width: number;
  onChoose?: (e?: T) => any;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SearchDropdown = <T,>(props: ISearchDropdown<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, null, () => props.setIsVisible(false));

  return (
    <div
      style={{ position: 'relative' }}
      className='search-dropdown-wrapper'
      ref={dropdownRef}
    >
      <div
        style={{
          visibility: props.isVisible ? 'visible' : 'hidden',
          width: props.width,
        }}
        className='search-dropdown'
      >
        {props.options.map(e => (
          <div
            className='search-dropdown-item'
            key={e.key}
            onClick={() => {
              props.setIsVisible(false);
              props.onChoose?.(e?.value);
            }}
          >
            {e.text}
          </div>
        ))}
      </div>
    </div>
  );
};
