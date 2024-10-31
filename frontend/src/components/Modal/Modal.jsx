import "./Modal.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";

export default function Modal({ isOpen, onClose, children, title, handleSubmit }) {
  if (!isOpen) {
    return null;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </header>
        <form onSubmit={onSubmit}>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button onClick={onClose} secondaryStyle>
              Close
            </Button>
            <Button typeSubmit>
              <FaPlus /> Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
