"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  src?: string | null;
  onClose: () => void;
  isOpen?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-[400px] h-[400px]">
        <Image alt="Image" className="object-contain" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
