import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteNoteModal from "./Modals/DeleteNoteModal";
import EditeNoteModal from "./Modals/EditeNoteModal";
import { FaRegEye } from "react-icons/fa";
import NoteDetailModal from "./Modals/NoteDetailsModal";
const NoteCard = () => {
  let [openDeleteNoteModal,setOpenDeleteNoteModal]=useState(false)
  let [openEditeNoteModal,setOpenEditeNoteModal]=useState(false)
  let [openNoteDetailModal,setOpenNoteDetailModal]=useState(false)


  return (
    <>
    <NoteDetailModal open={openNoteDetailModal} onClose={()=>{setOpenNoteDetailModal(false)}}/>
    <EditeNoteModal open={openEditeNoteModal} onClose={()=>{setOpenEditeNoteModal(false)}}/>
      <DeleteNoteModal open={openDeleteNoteModal} onClose={()=>{setOpenDeleteNoteModal(false)}}/>
      <div className='bg-[#1a1a1a] border border-solid border-borderColor p-4 w-[calc(100%/3-20px)] rounded-xl'>
          <p className="text-2xl mb-2">Meeting Notes</p>
          <p className="text-secondaryText mb-2">my meerfkjdjcdjcdjcbdcjdbjhbfhbfdcfdc fdc fgvfdgvdcg fdgcvdgcvdcd c...</p>
          <div className="flex flex-row justify-between items-center">
              <p className="text-secondaryText">Mar 15, 2026</p>
              <div className="flex flex-row items-centers text-lg gap-2">
                <button onClick={()=>{
                    setOpenEditeNoteModal(true)
                }}><FaEdit className="text-secondaryText" /></button>
                <button onClick={()=>{
                  setOpenDeleteNoteModal(true)
                }}><MdOutlineDeleteForever className="text-red-600"/></button>
                <button onClick={()=>{
                  setOpenNoteDetailModal(true)
                }}><FaRegEye className="text-blue-600"/></button>
              </div>
          </div>
      </div>
        </>
  );
};

export default NoteCard;