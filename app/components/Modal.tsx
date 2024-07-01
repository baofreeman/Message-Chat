"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={"relative z-50"}>
      <DialogBackdrop className="fixed inset-0 bg-black opacity-40" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full fixed w-screen items-center justify-center top-0 p-4">
          <DialogPanel
            transition
            className={
              "bg-white pb-4 transform rounded-lg px-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            }
          >
            <div className="absolute right-0 top-0 pr-4 pt-4 sm:block z-10">
              <button
                type="button"
                onClick={onClose}
                className="text-gray hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-silver focus:ring-offset-2 rounded-md"
              >
                <span className="sr-only">Close</span>
                <IoClose size={20} />
              </button>
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
