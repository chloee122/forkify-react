import ReactDOM from "react-dom";

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-90"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">{children}</div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
