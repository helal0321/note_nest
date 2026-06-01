import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { addTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";

const CreateTopicModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [topicData, setTopicdata] = useState({ title: "", notes: [] });
  const [isInputsValueValid, setIsInputsValueValid] = useState(false);
  useEffect(() => {
    if (topicData.title.length > 0) {
      setIsInputsValueValid(true);
    } else {
      setIsInputsValueValid(false);
    }
  }, [topicData]);
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setTopicdata({ title: "", notes: [] });
      }}
      onConfirm={() => {
        addTopic(topicData, dispatch);
      }}
      isValidInputs={isInputsValueValid}
    >
      <div className="text-white pt-10 px-10">
        <p className="text-center text-2xl mb-6">Create New Topic</p>
        <div className="mb-6">
          <p className="text-xl">Title</p>
          <input
            type="text"
            placeholder="Topic Title..."
            className="bg-borderColor p-4 w-full rounded-xl"
            value={topicData.title}
            onChange={(e) => {
              setTopicdata({ ...topicData, title: e.target.value });
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateTopicModal;
