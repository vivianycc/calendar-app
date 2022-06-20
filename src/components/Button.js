import React from "react";

export function IconButton({ name, size = "40", onClick, className }) {
  const sizes = {
    24: "w-6 h-6",
    32: "w-8 h-8",
    40: "w-10 h-10",
    48: "w-12 h-12",
  };
  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} rounded-full hover:bg-gray-100 flex items-center justify-center ${className}`}
    >
      <span className="material-icons-outlined cursor-pointer text-gray-600">
        {name}
      </span>
    </button>
  );
}

export function TextButton({ label, onClick, className }) {
  return (
    <button
      className={`h-9 border border-gray-300 rounded hover:bg-gray-100 flex items-center ${className}`}
      onClick={onClick}
    >
      <span className="px-3 py-2 text-base text-gray-700">{label}</span>
    </button>
  );
}
