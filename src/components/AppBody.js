import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import Notes from "./Notes";
import { useDispatch } from "react-redux";
import { openCloseSidebar } from "../rtk/reducers/openCloseSidebarReducer";
import { IoAddOutline } from "react-icons/io5";
import CreateNoteModal from "./Modals/CreateNoteModal";
const AppBody = () => {
  const dispatch=useDispatch()
  let [sidebarOpenned,setsidebarOpenned]=useState(true)
  let [createNoteModalOpenned,setCreateNoteModalOpenned]= useState(false)
  let [DateOption,setDateOption]=useState("newest")
  return (<>
  <CreateNoteModal open={createNoteModalOpenned} onClose={()=>{setCreateNoteModalOpenned(false)}}/>
        <div className='h-[calc(100vh-35px)] overflow-y-scroll hide-scrollbar flex-1 bg-[#0a0a0a] p-6  text-white flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-8'>
        <button className={`transform ${!sidebarOpenned&&'rotate-180'} text-2xl`} onClick={()=>{
          dispatch(openCloseSidebar())
          setsidebarOpenned(!sidebarOpenned)
        }}><IoIosArrowBack /></button>
        <ul className='text-xl flex flex-row items-center gap-4'>
          <li className='border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'><GrSearch /></li>
          <li className='border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'><IoSettingsOutline /></li>
          <li className='border border-[1px] border-borderColor w-[40px] h-[40px] rounded-[50%] flex justify-center items-center cursor-pointer'><FaRegUser /></li>
        </ul>
      </div>
      <div className='flex flex-row justify-between items-center mb-6'>
        <h1 className='text-4xl'>Project ALpha <span className='text-xl text-secondaryText'>42 notes</span></h1>
        <div className='relative'>
          <GrSearch className='absolute top-[50%] transform left-2 -translate-y-[50%]'/>
          <input type='text' placeholder='Search Notes...' className='border border-[1px] border-borderColor bg-[transparent] w-[300px] pl-8 pr-4 py-2 rounded-xl '/>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center mb-6'>
        <p className='text-4xl text-[#f0f0f0]'>Notes</p>
        <div className='flex items-center flex-row border border-[1px] border-solid border-borderColor p-[2px] rounded-md'>
          <button className={`w-[150px] ${DateOption=="newest"&&'bg-[#22d3ee]'} rounded-md flex justify-center items-center h-[35px] `} onClick={()=>{
            setDateOption("newest")
          }}>Date (Newest)</button>
          <button className={`w-[150px] ${DateOption=="oldest"&&'bg-[#22d3ee]'} rounded-md flex justify-center items-center h-[35px] `} onClick={()=>{
            setDateOption("oldest")
          }}>Date (Oldest)</button>
        </div>
      </div>
      <Notes />
      <button className="bg-secondaryColor w-[60px] h-[60px] rounded-tl-xl rounded-br-xl flex justify-center items-center opacity-50 hover:opacity-100 absolute bottom-10 right-10" onClick={()=>{
        setCreateNoteModalOpenned(true)
      }}><IoAddOutline className="text-white text-4xl" /></button>
    </div>
    </>
  );
};

export default AppBody;