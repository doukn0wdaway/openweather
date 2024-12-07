import { ReactNode } from 'react';
import './Badge.scss';

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
      className={`badge ${accent && 'badge-accent'} ${props.className ?? ''} `}
    >
      {props.children}
    </span>
  );
};
