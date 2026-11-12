import type { ReactNode } from 'react';
import s from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  /** With an href it is a link to another site, opened in a new tab. */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export function Button({ children, icon, href, type = 'button', onClick }: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );
  return href ? (
    <a className={s.root} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <button className={s.root} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
