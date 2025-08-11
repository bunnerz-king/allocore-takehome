import React from "react";

export default function TextInput({ onKeyDown, className, label, value, onChange, placeholder, maxLength }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        className={`
          px-2 py-1
          border border-gray-300
          rounded-md
          text-gray-900
          focus:outline-none
        
          focus:border-transparent
          bg-slate-100
          transition
          duration-200
          placeholder-gray-500
            ${className}
          `}
      />
    </div>
  );
}