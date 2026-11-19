import type { ReactNode } from 'react';
import s from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  /** With an href it is a link to another site, opened in a new tab. */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({
  children,
  icon,
  href,
  type = 'button',
  onClick,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  const buttonClasses = `${s.root} ${s[variant]} ${className}`.trim();

  return href ? (
    <a className={buttonClasses} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <button className={buttonClasses} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
