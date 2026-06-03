import React from "react";
import Modal from "../Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { addNote, deleteNote } from "../../services/notesServices";
import { useDispatch, useSelector } from "react-redux";

const DragDrobOptionModal = ({ open, onClose, topicId, note }) => {
  const dispatch = useDispatch();
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const moveNote = async () => {
    await deleteNote(selectedTopicId, note?.id, dispatch);
    await addNote(
      {
        title: note?.title,
        description: note?.description,
        date: note?.date,
      },
      topicId,
      dispatch,
    );
    onClose();
  };
  const copyNote = async () => {
    await addNote(
      {
        title: note?.title,
        description: note?.description,
        date: note?.date,
      },
      topicId,
      dispatch,
    );
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      showButtons={false}
    >
      <div className="pt-20 text-center text-white">
        <div className="flex justify-center mb-6s">
          <FaExclamationCircle className="text-secondaryText text-[150px] text-center" />
        </div>
        <p className="text-3xl mb-4">Choose An Option</p>
        <p className="text-lg text-secondaryText">
          choose whether u want to move the note to another topic or just
          copying it
        </p>
        <div className="flex flex-row justify-around mt-8 mb-8 text-white">
          <button
            className="text-xl bg-borderColor w-[150px] py-4 rounded-lg"
            onClick={async () => {
              moveNote();
            }}
          >
            move
          </button>
          <button
            className={`text-xl bg-secondaryColor w-[150px] text-center py-4 rounded-lg`}
            onClick={async () => {
              copyNote();
            }}
          >
            copy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DragDrobOptionModal;
