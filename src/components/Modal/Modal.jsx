import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import useDisclose from "../../hooks/useDisclose";

function Modal({ isOpen, onOpen, onClose, children }) {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center absolute top-0 z-40 h-screen w-screen backdrop-blur">
          <div className=" p-4 min-h-[200px] min-w-[80%] bg-white relative z-50 m-auto cursor-pointer rounded-lg">
            <div onClick={onClose}>
              <AiOutlineClose className="text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
