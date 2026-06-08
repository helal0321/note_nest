import React from "react";
import Modal from "../Modal";
import { MdDeleteForever } from "react-icons/md";
import { deleteNote } from "../../services/notesServices";
import { useDispatch } from "react-redux";

const DeleteNoteModal = ({ open, onClose, topicId, noteId }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      isDeleteModal={true}
      onDelete={() => {
        deleteNote(topicId, noteId, dispatch);
      }}
    >
      <div className="pt-20 text-center text-white">
        <div className="flex justify-center mb-6s">
          <MdDeleteForever className="text-red-600 text-[150px] text-center" />
        </div>
        <p className="text-3xl mb-4">Delete Note?</p>
        <p className="text-xl text-secondaryText">
          This action cannot be undone. the Note will be permanently deleted.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
