import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic, unLockTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";
import { checkGlobalPassword, saveGlobalPassword } from "../../services/globalPasswordServices";

const UnlockTopicByPasswordModal = ({ open, onClose,topicId }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError]=useState("")
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);

  useEffect(() => {
    setPasswordError("")
    if (password.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  }, [password]);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setPassword("");
        setPasswordError("")
      }}
      onConfirm={async() => {
        let checkPasswordResult=await checkGlobalPassword(password)
        if(checkPasswordResult){
          unLockTopic(topicId,dispatch)
          setPassword("");
          setPasswordError("")
          onClose()
        }
        else{
          setPasswordError("password is incorrect")
        }
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Write The Password To Unlock This Topic</p>
        <div className="mb-6">
          <p className="text-xl">Password</p>
          <input
            type="password"
            placeholder="Password..."
            className="bg-borderColor p-4 w-full rounded-xl"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {passwordError.length>0&&(<p className="text-red-600">{passwordError}</p>)}
        </div>
      </div>
    </Modal>
  );
};

export default UnlockTopicByPasswordModal;