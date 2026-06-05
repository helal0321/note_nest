import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { editeNote } from "../../services/notesServices";
import { useDispatch } from "react-redux";
import TextInput from "../TextInput";
import TextAreaInput from "../TextAreaInput";

const EditeNoteModal = ({ open, onClose, noteDetails, topicId }) => {
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setNoteData({
      title: noteDetails?.title,
      description: noteDetails.description,
    });
  }, [open, noteDetails]);
  const handleInputFieldsValidation = () => {
    if (noteData.title.length > 0 && noteData.description.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  };
  useEffect(() => {
    handleInputFieldsValidation();
  }, [noteData]);
  const resetNoteData = () => {
    setNoteData({ title: "", description: "" });
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetNoteData();
      }}
      onConfirm={() => {
        editeNote(topicId, noteDetails.id, noteData, dispatch);
        onClose();
        resetNoteData();
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Edit Existing Note</p>
        <div className="mb-6">
          <p className="text-xl">Title</p>
          <TextInput
            placeholder={"Note Title..."}
            value={noteData.title}
            onChange={(e) => {
              setNoteData({ ...noteData, title: e.target.value });
            }}
          />
        </div>
        <div>
          <p className="text-xl">Description</p>
          <TextAreaInput
            placeholder={"Note Description..."}
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

export default EditeNoteModal;
