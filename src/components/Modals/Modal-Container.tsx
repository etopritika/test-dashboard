"use client";

import { useModal } from "@/providers/modal-provider";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, setClose } = useModal();
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={setClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
