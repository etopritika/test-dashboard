"use client";

import { useModal } from "@/providers/modal-provider";
import React, { useState } from "react";
import ModalContainer from "./Modal-Container";

interface EditModalProps {
  initialCategory: string;
  initialCount: number;
  onEdit: (newCategory: string, newCount: number) => void;
  onDelete: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  initialCategory,
  initialCount,
  onEdit,
  onDelete,
}) => {
  const { setOpen, setClose } = useModal();
  const [category, setCategory] = useState(initialCategory);
  const [count, setCount] = useState(initialCount);

  const isChanged = category !== initialCategory || count !== initialCount;

  const handleEdit = () => {
    onEdit(category, count);
    setClose();
  };

  const handleDelete = () => {
    setOpen(
      <ModalContainer>
        <div>
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-between">
            <button
              className="text-white bg-red-500 hover:bg-red-400 p-2 rounded"
              onClick={() => {
                onDelete();
                setClose();
              }}
            >
              Delete
            </button>
            <button
              className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded"
              onClick={setClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalContainer>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit or Delete Item</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Category input"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Count</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Count input"
        />
      </div>
      <div className="flex justify-between">
        <button
          disabled={!isChanged}
          onClick={handleEdit}
          className={`text-white p-2 px-4 rounded ${
            !isChanged
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-white bg-red-500 hover:bg-red-400 p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditModal;
