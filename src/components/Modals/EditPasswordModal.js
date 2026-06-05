import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";
import {
  checkGlobalPassword,
  saveGlobalPassword,
} from "../../services/globalPasswordServices";
import PasswordInput from "../PasswordInput";

const EditPasswordModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  const handleInputFieldsValidation = () => {
    if (oldPassword.length > 0 && newPassword.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  };

  useEffect(() => {
    handleInputFieldsValidation();
  }, [oldPassword, newPassword]);
  const resetInputFieldsAndErrorMessage = () => {
    setOldPassword("");
    setNewPassword("");
    setPasswordMismatchError("");
  };
  const handleEditPassword = async () => {
    let passwordMatchResult = await checkGlobalPassword(oldPassword);
    if (passwordMatchResult) {
      saveGlobalPassword(newPassword);
      resetInputFieldsAndErrorMessage();
      onClose();
    } else {
      setPasswordMismatchError("old password is incorrect");
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        resetInputFieldsAndErrorMessage();
      }}
      onConfirm={() => {
        handleEditPassword();
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">
          Edit Password For Locked Topics
        </p>
        <div className="mb-6">
          <p className="text-xl">Old Password</p>
          <PasswordInput
            key={open}
            placeholder={"Old Password..."}
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setPasswordMismatchError("");
            }}
          />
          {passwordMismatchError.length > 0 && (
            <p className="text-red-600">{passwordMismatchError}</p>
          )}
          <p className="text-xl mt-4">New Password</p>
          <PasswordInput
            key={open ? 0 : 1}
            placeholder={"New Password..."}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
