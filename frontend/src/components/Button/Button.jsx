import PropTypes from "prop-types";
import "./Button.css";
export default function Button({
  children,
  onClick,
  secondaryStyle = false,
  typeSubmit = false,
}) {
  return (
    <div className="button-wrapper">
      <button
        className={secondaryStyle ? "secondary-button" : "primary-button"}
        onClick={onClick}
        type={typeSubmit ? "submit" : "button"}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  secondaryStyle: PropTypes.bool,
  typeSubmit: PropTypes.bool,
};
