import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteNoteModal from "./Modals/DeleteNoteModal";
import EditeNoteModal from "./Modals/EditeNoteModal";
import { FaRegEye } from "react-icons/fa";
import NoteDetailModal from "./Modals/NoteDetailsModal";
import { useSelector } from "react-redux";
const NoteCard = ({noteDetails}) => {
  let [openDeleteNoteModal,setOpenDeleteNoteModal]=useState(false)
  let [openEditeNoteModal,setOpenEditeNoteModal]=useState(false)
  let [openNoteDetailModal,setOpenNoteDetailModal]=useState(false)
  const selectedTopicId=useSelector((state)=>state.selectedTopicId)

  return (
    <>
    <NoteDetailModal open={openNoteDetailModal} onClose={()=>{setOpenNoteDetailModal(false)}} noteDetails={noteDetails}/>
    <EditeNoteModal open={openEditeNoteModal} onClose={()=>{setOpenEditeNoteModal(false)}} noteDetails={noteDetails} topicId={selectedTopicId}/>
      <DeleteNoteModal open={openDeleteNoteModal} onClose={()=>{setOpenDeleteNoteModal(false)}} topicId={selectedTopicId} noteId={noteDetails?.id}/>
      <div className='bg-[#1a1a1a] border border-solid border-borderColor p-4 w-[calc(100%/3-20px)] h-[200px] flex flex-col justify-between rounded-xl'>
          <p className="text-2xl mb-2">{
            noteDetails?.title?.length>20?`${noteDetails?.title?.slice(0,21)}...`:noteDetails?.title}</p>
          <p className="text-secondaryText mb-2">{noteDetails?.description.length>150?`${noteDetails?.description.slice(0,150)}...`:noteDetails?.description}</p>
          <div className="flex flex-row justify-between items-center">
              <p className="text-secondaryText">{noteDetails?.date}</p>
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