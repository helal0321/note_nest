import React, { useState } from "react";
import DeleteTopicModal from "./Modals/DeleteTopicModal";
import { setTopicId } from "../rtk/reducers/selectedTopicIdReducer";
import { useDroppable } from "@dnd-kit/core";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CiUnlock } from "react-icons/ci";
import { lockTopic, unLockTopic } from "../services/topicsServices";
import { CiLock } from "react-icons/ci";
import UnlockTopicByPasswordModal from "./Modals/UnlockTopicByPasswordModal";
import AddPasswordModal from "./Modals/AddPasswordModal";
import {
  checkGlobalPassword,
  getGlobalPassword,
} from "../services/globalPasswordServices";
const SingleTopic = ({ topic }) => {
  let [openDeleteModal, setOpenDeleteModal] = useState(false);
  let [openUnlockTopicModal, setOpenUnlockTopicModal] = useState(false);
  let [openAddGlobalPasswordModal, setOpenAddGlobalPasswordModal] =
    useState(false);
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const dispatch = useDispatch();
  const { setNodeRef, isOver } = useDroppable({
    id: topic?.id,
  });
  const handleLockTopic = async () => {
    const checkPasswordResult = await checkGlobalPassword("");
    if (checkPasswordResult) {
      setOpenAddGlobalPasswordModal(true);
    } else {
      lockTopic(topic?.id, dispatch);
    }
  };
  const handleLoclOrUnlockTopic = async () => {
    if (topic?.locked == true) {
      setOpenUnlockTopicModal(true);
    } else {
      handleLockTopic();
    }
  };

  return (
    <>
      <AddPasswordModal
        open={openAddGlobalPasswordModal}
        onClose={() => {
          setOpenAddGlobalPasswordModal(false);
        }}
      />
      <UnlockTopicByPasswordModal
        open={openUnlockTopicModal}
        onClose={() => {
          setOpenUnlockTopicModal(false);
        }}
        topicId={topic?.id}
      />
      <DeleteTopicModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
        topicId={topic?.id}
      />
      <li
        ref={setNodeRef}
        className={`py-1 px-4 flex cursor-pointer flex-row mb-2 justify-between items-center ${isOver && topic?.id != selectedTopicId && topic?.locked == false ? "bg-secondaryColor" : isOver && topic.id != selectedTopicId && topic.locked == true ? "bg-red-600" : topic?.id == selectedTopicId && "bg-cardColor"}`}
        onClick={() => {
          if (topic?.locked == false) {
            dispatch(setTopicId(topic?.id));
          } else {
            setOpenUnlockTopicModal(true);
          }
        }}
      >
        <button>
          {topic?.title?.length > 8
            ? `${topic?.title?.slice(0, 8)}...`
            : topic?.title}
          <span className="ml-1 inline-bock text-[15px] text-[#aaaaaa]">
            {!topic?.locked && `(${topic?.notes?.length})`}
          </span>
        </button>
        <div className="flex flex-row items-center gap-1">
          {!topic?.locked && (
            <button
              className={`bg-red-600 w-[25px] h-[25px] flex justify-center items-center rounded-md ${topic?.id == selectedTopicId && "collapse"}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(true);
              }}
            >
              <MdOutlineDeleteForever />
            </button>
          )}
          <button
            className={`bg-borderColor w-[25px] h-[25px] flex justify-center items-center rounded-md ${topic?.id == selectedTopicId && "collapse"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLoclOrUnlockTopic();
            }}
          >
            {topic.locked ? (
              <CiLock className="text-red-600" />
            ) : (
              <CiUnlock className="text-green-600" />
            )}
          </button>
        </div>
      </li>
    </>
  );
};

export default SingleTopic;
