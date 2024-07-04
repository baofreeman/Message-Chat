"use client";

import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { DialogTitle } from "@headlessui/react";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onClose, isOpen }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetch(`/api/conversations/${conversationId}`, { method: "DELETE" });
      onClose();
      router.push("/conversations");
      router.refresh();
    } catch (error) {
      toast.error("invalid");
    }
    setIsLoading(false);
  }, [conversationId, router, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full bg-white sm:mx-0 sm:h-10 sw:w-10">
          <FiAlertTriangle className="w-6 h-6 text-red" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray"
          >
            Delete conversation
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-silver">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
