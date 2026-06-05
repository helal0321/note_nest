import logo from "./logo.svg";
import "./App.css";
import bcrypt from "bcryptjs";
import Sidebar from "./components/Sidebar";
import AppBody from "./components/AppBody";
import TitleBar from "./components/TitleBar";
import { useEffect, useState } from "react";
import { getTopics, saveTopics } from "./services/topicsServices";
import { useDispatch, useSelector } from "react-redux";
import { setTopics } from "./rtk/reducers/topicsDetailsReducer";
import { setTopicId } from "./rtk/reducers/selectedTopicIdReducer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import NoteCard from "./components/NoteCard";
import OverlayCard from "./components/OverlayCard";
import { addNote, deleteNote } from "./services/notesServices";
import DragDrobOptionModal from "./components/Modals/DragDrobOptionModal";
import {
  getGlobalPassword,
  saveGlobalPassword,
} from "./services/globalPasswordServices";
let makeDefaultTopic = async (dispatch) => {
  let defaultTopic = {
    id: Date.now(),
    title: "default",
    notes: [],
    locked: false,
  };
  await saveTopics([defaultTopic], dispatch);

  dispatch(setTopics([defaultTopic]));
  dispatch(setTopicId(defaultTopic.id));
};
let makeDefaultPassword = async () => {
  let password = await window.electronAPI.getGlobalPassword();
  if (password.length <= 0) {
    await saveGlobalPassword("");
  }
};
function App() {
  let dispatch = useDispatch();
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const [activeNote, setActiveNote] = useState(null);
  const sidebarOpenned = useSelector((state) => state.openCloseSidebar);
  const [dragDrobOptionModalOpen, setDragDrobOptionModalOpen] = useState(false);
  const [draggedNote, setDraggedNote] = useState({});
  const [targetTopic, setTargetTopic] = useState({});
  useEffect(() => {
    let getTopicsData = async () => {
      let topics = await getTopics();
      if (topics[0]?.id == null) {
        makeDefaultTopic(dispatch);
      } else {
        dispatch(setTopics(topics));
        for (let topic of topics) {
          if (topic.locked == false) {
            dispatch(setTopicId(topic.id));
            break;
          }
        }
      }
    };
    getTopicsData();
    makeDefaultPassword();
  }, []);
  const handleDragStart = (event) => {
    setActiveNote(event.active.data?.current?.note);
    setDraggedNote(event?.active?.data?.current?.note);
  };
  const handleDragEnd = async (event) => {
    setActiveNote(null);
    if (event.canceled) return;

    let topicId = event?.over?.id;
    let note = event?.active?.data?.current?.note;
    let allTopics = await getTopics();
    let selectedTopic = allTopics.filter((topic) => topic.id == topicId)[0];
    setTargetTopic(selectedTopic);
    if (
      topicId &&
      note &&
      sidebarOpenned &&
      topicId != selectedTopicId &&
      selectedTopic?.locked == false
    ) {
      setDragDrobOptionModalOpen(true);
    }
  };
  const resetTargettopicAndDraggedNote = () => {
    setTargetTopic({});
    setDraggedNote({});
  };
  return (
    <>
      <DragDrobOptionModal
        open={dragDrobOptionModalOpen}
        onClose={() => {
          setDragDrobOptionModalOpen(false);
          resetTargettopicAndDraggedNote();
        }}
        topicId={targetTopic?.id}
        note={draggedNote}
      />
      <TitleBar />

      <div className="flex flex-row h-[calc(100vh-35px)]">
        <DndContext
          onDragStart={(event) => {
            handleDragStart(event);
          }}
          onDragEnd={(event) => {
            handleDragEnd(event);
          }}
        >
          <Sidebar />
          <AppBody />
          <DragOverlay>
            {activeNote ? <OverlayCard noteDetails={activeNote} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
