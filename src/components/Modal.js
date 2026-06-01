import React, {useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ReactDOM from "react-dom";
const Modal = ({open,onClose,isDeleteModal=false,showButtons=true,onConfirm=()=>{},onDelete=()=>{},isValidInputs=true,children}) => {
  let deleteItem=()=>{
      onDelete()
      onClose()
  }
  let confirmChanges=()=>{
      onConfirm()
      onClose()
  }
  return ReactDOM.createPortal(
<div className={`fixed z-60 w-full h-[100vh] inset-0 ${open==false&&'collapse'}`}>

      <div className={`w-[50%] -translate-x-1/2 -translate-y-1/2 fixed bg-cardColor border border-[1px] border-solid border-borderColor rounded-2xl  opcaity-100 top-1/2 left-1/2   z-50`}>
            {children}

            {showButtons&&<div className='flex flex-row justify-around mt-8 mb-8 text-white'>
              <button className='text-xl bg-borderColor w-[150px] py-4 rounded-lg' onClick={()=>{
                onClose()
              }}>Cancel</button>
              {isDeleteModal?<button className='text-xl bg-red-600 w-[150px] py-4 rounded-lg' onClick={()=>{
                    deleteItem()
              }}>Delete</button>:<button className={`text-xl bg-secondaryColor w-[150px] text-center py-4 rounded-lg ${isValidInputs?'opacity-100':'opacity-50 cursor-not-allowed'}`} disabled={!isValidInputs} onClick={()=>{
                  if(isValidInputs==true){
                    confirmChanges()}
                }}>Save</button>}
            </div>}   
      </div>
      <div className='backdrop-blur-sm absolute w-full h-full bg-black/30 top-0 left-0 z-40 cursor-pointer' onClick={()=>onClose()}></div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;