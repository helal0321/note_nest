import logo from './logo.svg';
import './App.css';

import Sidebar from './components/Sidebar';
import AppBody from './components/AppBody';
import TitleBar from './components/TitleBar';
import { useEffect, useState } from 'react';
import { getTopics } from './services/topicsServices';
import { useDispatch } from 'react-redux';
import { setTopics } from './rtk/reducers/topicsDetailsReducer';

function App() {
  let dispatch=useDispatch()
  useEffect(()=>{
   let getTopicsData=async()=>{
    let topics=await getTopics()
    dispatch(setTopics(topics))
   }
   getTopicsData()
  },[])
  return (<>
    <TitleBar/>
    <div className='flex flex-row h-[calc(100vh-35px)]'>
      <Sidebar/>
      <AppBody/>
    </div>
    </>
  );
}

export default App;