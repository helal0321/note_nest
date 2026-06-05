import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addNote } from "../../services/notesServices";
import { useDispatch } from "react-redux";

const CreateNoteModal = ({ open, onClose, topicId }) => {
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const dispatch = useDispatch();
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
     const handleInputFieldsValidation=()=>{
      if (noteData.title.length > 0 && noteData.description.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
     }
  useEffect(() => {
      handleInputFieldsValidation()
  }, [noteData]);
  let addNewNote = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    addNote({ ...noteData, date: formattedDate }, topicId, dispatch);
  };
  const resetNoteData=()=>{
    setNoteData({ title: "", description: "", date: "" });

  }
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetNoteData()
      }}
      onConfirm={() => {
        addNewNote();
        onClose()
        resetNoteData()

      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Create New Note</p>
        <div className="mb-6">
          <p className="text-xl">Title</p>
          <input
            type="text"
            placeholder="Topic Title..."
            className="bg-borderColor p-4 w-full rounded-xl"
            value={noteData.title}
            onChange={(e) => {
              setNoteData({ ...noteData, title: e.target.value });
            }}
          />
        </div>
        <div>
          <p className="text-xl">Description</p>
          <textarea
            placeholder="Topic Description..."
            className="h-[200px] bg-borderColor p-4 w-full rounded-xl"
            value={noteData.description}
            onChange={(e) => {
              setNoteData({ ...noteData, description: e.target.value });
            }}
          ></textarea>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;
