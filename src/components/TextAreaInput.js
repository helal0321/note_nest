import React from "react";

const TextAreaInput = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="h-[200px] bg-borderColor p-4 w-full rounded-xl"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    ></textarea>
  );
};

export default TextAreaInput;
