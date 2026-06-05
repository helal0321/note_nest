import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import Notes from "./Notes";
import { useDispatch, useSelector } from "react-redux";
import { openCloseSidebar } from "../rtk/reducers/openCloseSidebarReducer";
import { IoAddOutline } from "react-icons/io5";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import CreateNoteModal from "./Modals/CreateNoteModal";
import { addTopic, saveTopics } from "../services/topicsServices";
import { MdOutlineTextRotationAngleup } from "react-icons/md";
import { filterNotesBySearchtermAndDate } from "../utils/filterNotesBySearchTermAndDate";
import { exportTopics, importTopics } from "../utils/importAndExportTopics";
import { breakWordCheck } from "../utils/breakWordCheck";
import { TbLockPassword } from "react-icons/tb";
import AddPasswordModal from "./Modals/AddPasswordModal";
import EditPasswordModal from "./Modals/EditPasswordModal";
import { checkGlobalPassword } from "../services/globalPasswordServices";
const AppBody = () => {
  const dispatch = useDispatch();
  let [sidebarOpenned, setsidebarOpenned] = useState(true);
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  let [createNoteModalOpenned, setCreateNoteModalOpenned] = useState(false);
  let [DateOption, setDateOption] = useState("newest");
  const topics = useSelector((state) => state.topicsDetails);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [openAddPasswordModal,setOpenAddPasswordModal]=useState(false)
  const [openEditPasswordModal,setOpenEditPasswordModal]=useState(false)
  const resetFilteredNotesAndInputFields = () => {
    setFilteredNotes(selectedTopic?.notes);
    setSearchValue("");
    setDateOption("newest");
  };
  useEffect(() => {
    resetFilteredNotesAndInputFields();
  }, [selectedTopic]);
  const getSelectedTopic = () => {
    let selectedTopic = topics.filter(
      (topic) => topic.id == selectedTopicId,
    )[0];
    setSelectedTopic(selectedTopic);
  };
  useEffect(() => {
    getSelectedTopic();
  }, [topics, selectedTopicId]);
  useEffect(() => {
    setFilteredNotes(
      filterNotesBySearchtermAndDate(DateOption, searchValue, selectedTopic),
    );
  }, [searchValue, DateOption, selectedTopic]);
  let handleSidebarStatus = () => {
    dispatch(openCloseSidebar());
    setsidebarOpenned(!sidebarOpenned);
  };
  return (
    <>
      <CreateNoteModal
        open={createNoteModalOpenned}
        onClose={() => {
          setCreateNoteModalOpenned(false);
        }}
        topicId={selectedTopicId}
      />
      <AddPasswordModal open={openAddPasswordModal}
      onClose={()=>{
        setOpenAddPasswordModal(false)
      }}/>
      <EditPasswordModal open={openEditPasswordModal} onClose={()=>{
        setOpenEditPasswordModal(false)
      }}/>
      <div className="h-[calc(100vh-35px)] overflow-y-scroll hide-scrollbar flex-1 bg-[#0a0a0a] p-6  text-white flex flex-col">
        <div className="flex flex-row justify-between items-center mb-8">
          <button
            className={`transform ${!sidebarOpenned && "rotate-180"} text-2xl`}
            onClick={() => {
              handleSidebarStatus();
            }}
          >
            <IoIosArrowBack />
          </button>
          <ul className="text-xl flex flex-row items-center gap-4">
            <li
              title="import"
              className="border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer"
              onClick={async () => {
                importTopics(topics, dispatch);
              }}
            >
              <CiImport />
            </li>
            <li
              title="export"
              className="border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer"
              onClick={async () => {
                exportTopics();
              }}
            >
              <CiExport />
            </li>
            <li
              className="border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer"
              onClick={async() => {
                let passwordMatchResult= await checkGlobalPassword("")
                if(passwordMatchResult){
                  setOpenAddPasswordModal(true)

                }else{
                    setOpenEditPasswordModal(true)
                }
              }}
            >
                <TbLockPassword/>
            </li>
          </ul>
        </div>
        <div className="flex flex-row justify-between items-center mb-6">
          <h1
            className={`text-4xl ${breakWordCheck(selectedTopic?.title) ? "break-all" : ""}`}
          >
            {selectedTopic?.title}
            <span className="text-xl text-secondaryText ml-10">
              {selectedTopic?.notes?.length}
              {selectedTopic?.notes?.length == 1 ? " note" : " notes"}
            </span>
          </h1>
          <div className="relative">
            <GrSearch className="absolute top-[50%] transform left-2 -translate-y-[50%]" />
            <input
              type="text"
              placeholder="Search Notes..."
              value={searchValue}
              className="border border-[1px] border-borderColor bg-[transparent] w-[300px] pl-8 pr-4 py-2 rounded-xl "
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-6">
          <p className="text-4xl text-[#f0f0f0]">Notes</p>
          <div className="flex items-center flex-row border border-[1px] border-solid border-borderColor p-[2px] rounded-md">
            <button
              className={`w-[150px] ${DateOption == "newest" && "bg-[#22d3ee]"} rounded-md flex justify-center items-center h-[35px] `}
              onClick={() => {
                setDateOption("newest");
              }}
            >
              Date (Newest)
            </button>
            <button
              className={`w-[150px] ${DateOption == "oldest" && "bg-[#22d3ee]"} rounded-md flex justify-center items-center h-[35px] `}
              onClick={() => {
                setDateOption("oldest");
              }}
            >
              Date (Oldest)
            </button>
          </div>
        </div>
        <Notes notes={filteredNotes} />
        <button
          className="bg-secondaryColor w-[60px] h-[60px] rounded-tl-xl rounded-br-xl flex justify-center items-center opacity-50 hover:opacity-100 absolute bottom-16 right-16"
          onClick={() => {
            setCreateNoteModalOpenned(true);
          }}
        >
          <IoAddOutline className="text-white text-4xl" />
        </button>
      </div>
    </>
  );
};

export default AppBody;
