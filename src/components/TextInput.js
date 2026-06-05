import React from "react";

const TextInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-borderColor p-4 w-full rounded-xl"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

export default TextInput;
