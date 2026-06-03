import React, { useState } from "react";
import DeleteTopicModal from "./Modals/DeleteTopicModal";
import { setTopicId } from "../rtk/reducers/selectedTopicIdReducer";
import { useDroppable } from "@dnd-kit/core";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
const SingleTopic = ({ topic }) => {
  let [openDeleteModal, setOpenDeleteModal] = useState(false);
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const dispatch = useDispatch();
  const { setNodeRef, isOver } = useDroppable({
    id: topic?.id,
  });
  return (
    <>
      <DeleteTopicModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
        topicId={topic?.id}
      />
      <li
        ref={setNodeRef}
        className={`py-1 px-4 flex cursor-pointer flex-row mb-2 justify-between items-center ${isOver ? "bg-secondaryColor" : topic?.id == selectedTopicId && "bg-cardColor"}`}
        onClick={() => {
          dispatch(setTopicId(topic?.id));
        }}
      >
        <button>
          {topic?.title?.length > 8
            ? `${topic?.title?.slice(0, 9)}...`
            : topic?.title}
          <span className="ml-1 inline-bock text-[15px] text-[#aaaaaa]">
            ({topic?.notes?.length})
          </span>
        </button>
        <button
          className={`bg-red-600 w-[25px] h-[25px] flex justify-center items-center rounded-md ${topic?.id == selectedTopicId && "collapse"}`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeleteModal(true);
          }}
        >
          <MdOutlineDeleteForever />
        </button>
      </li>
    </>
  );
};

export default SingleTopic;
