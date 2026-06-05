import React, { useEffect, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="bg-borderColor p-4 pr-12 w-full rounded-xl"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {showPassword ? (
        <IoMdEyeOff
          className="text-secondaryText absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-2xl"
          onClick={() => {
            setShowPassword(false);
          }}
        />
      ) : (
        <IoEye
          className="text-secondaryText absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-2xl"
          onClick={() => {
            setShowPassword(true);
          }}
        />
      )}
    </div>
  );
};

export default PasswordInput;
