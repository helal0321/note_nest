import logo from "./logo.svg";
import "./App.css";

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

let makeDefaultTopic = async (dispatch) => {
  let defaultTopic = { id: Date.now(), title: "default", notes: [] };
  await saveTopics([defaultTopic], dispatch);

  dispatch(setTopics([defaultTopic]));
  dispatch(setTopicId(defaultTopic.id));
};
function App() {
  let dispatch = useDispatch();
  const selectedTopicId = useSelector((state) => state.selectedTopicId);
  const [activeNote, setActiveNote] = useState(null);
  const sidebarOpenned = useSelector((state) => state.openCloseSidebar);
  useEffect(() => {
    let getTopicsData = async () => {
      let topics = await getTopics();
      if (topics[0]?.id == null) {
        makeDefaultTopic(dispatch);
      } else {
        dispatch(setTopics(topics));
        dispatch(setTopicId(topics[0].id));
      }
    };
    getTopicsData();
  }, []);
  const handleDragStart=(event)=>{
        setActiveNote(event.active.data?.current?.note); 
  }
  const handleDragEnd=async(event)=>{
        setActiveNote(null)
        if (event.canceled) return;

        let topicId=(event?.over?.id);
        let note=event?.active?.data?.current?.note
        if(topicId&&note&&sidebarOpenned){
          
        await deleteNote(selectedTopicId,note?.id,dispatch)
        await addNote({title:note?.title,description:note?.description,date:note?.date},topicId,dispatch)}


  }
  return (
    <>
      <TitleBar />

      <div className="flex flex-row h-[calc(100vh-35px)]">
               <DndContext               
                     onDragStart={(event) => {
                      handleDragStart(event)
      }}
      onDragEnd={(event) => {
        handleDragEnd(event)
      }}
    >
        <Sidebar />
        <AppBody />
      <DragOverlay >
        {activeNote ? <OverlayCard noteDetails={activeNote} /> : null}
      </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default App;
