import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic, unLockTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";
import {
  checkGlobalPassword,
  saveGlobalPassword,
} from "../../services/globalPasswordServices";

const UnlockTopicByPasswordModal = ({ open, onClose, topicId }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  const handleInputFieldsValidation = () => {
    if (password.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  };
  useEffect(() => {
    handleInputFieldsValidation();
  }, [password]);
  const resetInputFieldsAndErrorMessage = () => {
    setPassword("");
    setPasswordError("");
  };
  const handleUnlockTopic = async () => {
    let checkPasswordResult = await checkGlobalPassword(password);
    if (checkPasswordResult) {
      unLockTopic(topicId, dispatch);
      resetInputFieldsAndErrorMessage();
      onClose();
    } else {
      setPasswordError("password is incorrect");
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetInputFieldsAndErrorMessage();
      }}
      onConfirm={async () => {
        handleUnlockTopic();
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">
          Write The Password To Unlock This Topic
        </p>
        <div className="mb-6">
          <p className="text-xl">Password</p>
          <input
            type="password"
            placeholder="Password..."
            className="bg-borderColor p-4 w-full rounded-xl"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          {passwordError.length > 0 && (
            <p className="text-red-600">{passwordError}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UnlockTopicByPasswordModal;
