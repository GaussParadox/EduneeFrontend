import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: ButtonType;
}

/**
 * Componente Button reutilizable
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const classes = `${baseClass} ${variantClass} ${sizeClass}`;

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
