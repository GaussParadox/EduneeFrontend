import PropTypes from "prop-types";
import "./Button.css";

/**
 * Componente Button reutilizable
 * @param {Object} props - Props del componente
 * @param {string} props.variant - Variante del botón (primary, secondary, danger)
 * @param {string} props.size - Tamaño del botón (sm, md, lg)
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {Function} props.onClick - Función a ejecutar al hacer click
 * @param {React.ReactNode} props.children - Contenido del botón
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  ...rest
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const classes = `${baseClass} ${variantClass} ${sizeClass}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
