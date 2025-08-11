import React from 'react'

export default function Button({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        items-center
        py-1
        gap-1
        cursor-pointer
        px-4 rounded 
        bg-blue-500 text-white 
        hover:bg-blue-600 
        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      {children}
    </button>
  );
}