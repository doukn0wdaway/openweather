import { ReactNode } from 'react';
import './Badge.scss';
import { clsx } from 'clsx';
export const Badge = ({
  accent = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) => {
  return (
    <span
      className={clsx('badge', { 'badge-accent': accent }, props.className)}
    >
      {props.children}
    </span>
  );
};
