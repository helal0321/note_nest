import logo from "./logo.svg";
import "./App.css";

import Sidebar from "./components/Sidebar";
import AppBody from "./components/AppBody";
import TitleBar from "./components/TitleBar";
import { useEffect, useState } from "react";
import { getTopics, saveTopics } from "./services/topicsServices";
import { useDispatch } from "react-redux";
import { setTopics } from "./rtk/reducers/topicsDetailsReducer";
import { setTopicId } from "./rtk/reducers/selectedTopicIdReducer";

let makeDefaultTopic = async (dispatch) => {
  let defaultTopic = { id: Date.now(), title: "default", notes: [] };
  await saveTopics([defaultTopic], dispatch);

  dispatch(setTopics([defaultTopic]));
  dispatch(setTopicId(defaultTopic.id));
};
function App() {
  let dispatch = useDispatch();

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
  return (
    <>
      <TitleBar />
      <div className="flex flex-row h-[calc(100vh-35px)]">
        <Sidebar />
        <AppBody />
      </div>
    </>
  );
}

export default App;
