import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";
import { checkGlobalPassword, saveGlobalPassword } from "../../services/globalPasswordServices";

const EditPasswordModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMismatchError,setPasswordMismatchError]=useState("")
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  useEffect(() => {
    if (oldPassword.length > 0&&newPassword.length>0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  }, [oldPassword,newPassword]);
  useEffect(()=>{
      setPasswordMismatchError("")
  },[oldPassword])
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setOldPassword("")
        setNewPassword("")
        setPasswordMismatchError("")
      }}
      onConfirm={async() => {
        let passwordMatchResult= await checkGlobalPassword(oldPassword)
        if(passwordMatchResult){
        saveGlobalPassword(newPassword)
        setOldPassword("")
        setNewPassword("")
        setPasswordMismatchError("")
        onClose()}
        else{
            setPasswordMismatchError("old password is incorrect")
        }
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Edit Password For Locked Topics</p>
        <div className="mb-6">
          <p className="text-xl">Old Password</p>
          <input
            type="password"
            placeholder="Old Password..."
            className="bg-borderColor p-4 w-full rounded-xl"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        {passwordMismatchError.length>0&&(<p className="text-red-600">{passwordMismatchError}</p>)}
        <p className="text-xl mt-4">New Password</p>
          <input
            type="password"
            placeholder="New Password..."
            className="bg-borderColor p-4 w-full rounded-xl"
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
