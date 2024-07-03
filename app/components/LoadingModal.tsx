"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingModal = () => {
  return (
    <Transition show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duaration-500"
          enterFrom="opacity-0"
          enterTo="opactiy-100"
          leave="ease-in duaration-200"
          leaveFrom="opactiy-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-silver opacity-50 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel>
              <ClipLoader size={40} color="#0284c7" />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingModal;
