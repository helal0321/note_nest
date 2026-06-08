import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";
import { saveGlobalPassword } from "../../services/globalPasswordServices";
import PasswordInput from "../PasswordInput";
import { formatText } from "../../utils/formatText";

const AddPasswordModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  const handleInputFieldsValidation = () => {
    if (formatText(password).length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  };
  useEffect(() => {
    handleInputFieldsValidation();
  }, [password]);
  const resetInputField = () => {
    setPassword("");
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetInputField();
      }}
      onConfirm={() => {
        saveGlobalPassword(formatText(password));
        resetInputField();
        onClose();
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">
          Add Password For Locked Topics
        </p>
        <div className="mb-6">
          <p className="text-xl">Password</p>
          <PasswordInput
            key={open}
            placeholder={"Password..."}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddPasswordModal;
