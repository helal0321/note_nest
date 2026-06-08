import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addNote } from "../../services/notesServices";
import { useDispatch } from "react-redux";
import TextInput from "../TextInput";
import TextAreaInput from "../TextAreaInput";
import { formatText } from "../../utils/formatText";

const CreateNoteModal = ({ open, onClose, topicId }) => {
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const dispatch = useDispatch();
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  const handleInputFieldsValidation = () => {
    if (
      formatText(noteData.title).length > 0 &&
      formatText(noteData.description).length > 0
    ) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  };
  useEffect(() => {
    handleInputFieldsValidation();
  }, [noteData]);
  let addNewNote = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    addNote(
      {
        title: formatText(noteData.title),
        description: formatText(noteData.description),
        date: formattedDate,
      },
      topicId,
      dispatch,
    );
  };
  const resetNoteData = () => {
    setNoteData({ title: "", description: "", date: "" });
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetNoteData();
      }}
      onConfirm={() => {
        addNewNote();
        onClose();
        resetNoteData();
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Create New Note</p>
        <div className="mb-6">
          <p className="text-xl">Title</p>
          <TextInput
            value={noteData.title}
            placeholder={"Note Title..."}
            onChange={(e) => {
              setNoteData({ ...noteData, title: e.target.value });
            }}
          />
        </div>
        <div>
          <p className="text-xl">Description</p>
          <TextAreaInput
            placeholder={"Topic Description..."}
            value={noteData.description}
            onChange={(e) => {
              setNoteData({ ...noteData, description: e.target.value });
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;
