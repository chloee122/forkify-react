import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ children, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#00000066] backdrop-blur-sm"
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-[1000px] px-14 py-12 shadow-2xl shadow-neutral-500">
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container") as Element
  );
}

export default Modal;
