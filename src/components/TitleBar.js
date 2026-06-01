import React from "react";
import { GiNotebook } from "react-icons/gi";
import { TbArrowsMinimize } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
const TitleBar = () => {
  return (
    <div className="flex justify-between items-center bg-[#121212] h-[35px] px-6 border border-b-borderColor border-t-transparent border-l-transparent border-r-transparent">
      <GiNotebook className="text-secondaryColor text-md" />
      <p className="text-md text-white">Note Nest</p>
      <div className="flex flrex-row text-secondaryText text-md gap-4">
        <button
          onClick={() => {
            window.electronAPI.minimize();
          }}
        >
          <TbArrowsMinimize />
        </button>
        <button
          onClick={() => {
            window.electronAPI.close();
          }}
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
