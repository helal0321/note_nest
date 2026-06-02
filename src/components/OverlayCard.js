import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteNoteModal from "./Modals/DeleteNoteModal";
import EditeNoteModal from "./Modals/EditeNoteModal";
import { FaRegEye } from "react-icons/fa";
import NoteDetailModal from "./Modals/NoteDetailsModal";
import { useSelector } from "react-redux";
import { breakWordCheck } from "../utils/breakWordCheck";
import {DragOverlay, useDraggable} from '@dnd-kit/core';
const OverlayCard = ({ noteDetails }) => {

  return (
    <>
      <div  className={`bg-[#1a1a1a] border border-solid border-borderColor p-4 w-[400px] opacity-40 h-[200px] flex flex-col justify-between rounded-xl`}>
        <p className={`text-2xl text-white mb-2 ${breakWordCheck(noteDetails?.title)?'break-all':''}`}>
          {noteDetails?.title?.length > 20
            ? `${noteDetails?.title?.slice(0, 21)}...`
            : noteDetails?.title}
        </p>
        <p className={`text-secondaryText mb-2 ${breakWordCheck(noteDetails?.description)?'break-all':''}`}>
          {noteDetails?.description.length > 150
            ? `${noteDetails?.description?.slice(0, 150)}...`
            : noteDetails?.description}
        </p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-secondaryText">{noteDetails?.date}</p>

        </div>
      </div>
    </>
  );
};

export default OverlayCard;