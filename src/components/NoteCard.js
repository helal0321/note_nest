import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteNoteModal from "./Modals/DeleteNoteModal";
import EditeNoteModal from "./Modals/EditeNoteModal";
import { FaRegEye } from "react-icons/fa";
import NoteDetailModal from "./Modals/NoteDetailsModal";
import { useSelector } from "react-redux";
import { breakWordCheck } from "../utils/breakWordCheck";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { RiDragMove2Fill } from "react-icons/ri";
const NoteCard = ({ noteDetails }) => {
  let [openDeleteNoteModal, setOpenDeleteNoteModal] = useState(false);
  let [openEditeNoteModal, setOpenEditeNoteModal] = useState(false);
  let [openNoteDetailModal, setOpenNoteDetailModal] = useState(false);
  const sidebarOpenned = useSelector((state) => state.openCloseSidebar);
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: noteDetails?.id,
    data: { note: noteDetails },
  });

  return (
    <>
      <NoteDetailModal
        open={openNoteDetailModal}
        onClose={() => {
          setOpenNoteDetailModal(false);
        }}
        noteDetails={noteDetails}
      />
      <EditeNoteModal
        open={openEditeNoteModal}
        onClose={() => {
          setOpenEditeNoteModal(false);
        }}
        noteDetails={noteDetails}
        topicId={selectedTopicId}
      />
      <DeleteNoteModal
        open={openDeleteNoteModal}
        onClose={() => {
          setOpenDeleteNoteModal(false);
        }}
        topicId={selectedTopicId}
        noteId={noteDetails?.id}
      />
      <div
        ref={setNodeRef}
        {...attributes}
        className={`relative bg-[#1a1a1a] border border-solid border-borderColor p-4 w-[calc(100%/3-20px)] h-[200px] flex flex-col justify-between rounded-xl ${isDragging ? "opacity-50" : "opacity-100"}`}
      >
        {sidebarOpenned ? (
          <div className="absolute top-4 right-4 cursor-move" {...listeners}>
            <RiDragMove2Fill className="text-lg" />
          </div>
        ) : null}
        <p
          className={`text-2xl mb-2 ${breakWordCheck(noteDetails?.title) ? "break-all" : ""}`}
        >
          {noteDetails?.title?.length > 20
            ? `${noteDetails?.title?.slice(0, 21)}...`
            : noteDetails?.title}
        </p>
        <p
          className={`text-secondaryText mb-2 ${breakWordCheck(noteDetails?.description) ? "break-all" : ""}`}
        >
          {noteDetails?.description.length > 150
            ? `${noteDetails?.description?.slice(0, 150)}...`
            : noteDetails?.description}
        </p>
        <div className="flex flex-row justify-between items-center">
          <p className="text-secondaryText">{noteDetails?.date}</p>
          <div className="flex flex-row items-centers text-lg gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenEditeNoteModal(true);
              }}
            >
              <FaEdit className="text-secondaryText" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteNoteModal(true);
              }}
            >
              <MdOutlineDeleteForever className="text-red-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenNoteDetailModal(true);
              }}
            >
              <FaRegEye className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
