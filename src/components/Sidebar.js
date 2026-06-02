import React, { useState } from "react";
import DeleteTopicModal from "./Modals/DeleteTopicModal";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import CreateTopicModal from "./Modals/CreateTopicModal";
import { setTopicId } from "../rtk/reducers/selectedTopicIdReducer";
import SingleTopic from "./SingleTopic";
// import { shell } from 'electron';

function Sidebar() {
  let [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const sidebarOpenned = useSelector((state) => state.openCloseSidebar);
  const topics = useSelector((state) => state.topicsDetails);
  return (
    <>
      <CreateTopicModal
        open={openAddTopicModal}
        onClose={() => {
          setOpenAddTopicModal(false);
        }}
      />
      <div
        className={`bg-[#121212]  text-white ${sidebarOpenned ? "flex flex-col justify-between w-[15%] pt-6 border border-r-[1px] border-r-[#2a2a2a] border-t-transparent border-b-transparent border-l-transparent h-[calc(100vh-35px)] overflow-y-scroll hide-scrollbar" : "w-[0px] overflow-hidden"}`}
      >
        <div>
          {" "}
          <div className="text-2xl font-bold mb-8 px-4">Note Nest</div>
          <p className="text-4xl text-[#00f5ff] mb-6 px-4">Topics</p>
          <div className="px-4">
            <button
              className="block bg-[#1a1a1a] border border-[1px] border-[#2a2a2a] w-[100%] flex   px-4 py-1 items-center text-1xl rounded-lg mb-4"
              onClick={() => {
                setOpenAddTopicModal(true);
              }}
            >
              <span className="mr-1 text-2xl">+</span>
              <p> Add Topic</p>
            </button>
          </div>
          <ul className="text-[20px]">
            {topics?.map((topic) => (
              <SingleTopic topic={topic}/>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center w-full text-sm border-t border-t-borderColor py-4">
          <p className="">
            made with <FaHeart className="inline text-secondaryColor" /> by{" "}
            <a
              className="text-blue-600 underline"
              title="linkedin profile link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.electronAPI.openExternalLink(
                  "https://www.linkedin.com/in/mahmoud-helal-904a56231",
                );
              }}
            >
              mahmoud
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
