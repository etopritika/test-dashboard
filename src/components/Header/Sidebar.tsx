"use client";
import { X } from "lucide-react";
import Navigation from "./Navigation";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 flex flex-col text-white">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button onClick={onClose} className="p-2" aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <Navigation onLinkClick={onClose} />
    </div>
  );
}
