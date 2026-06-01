import React, { useState } from 'react'

import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteTopicModal from './Modals/DeleteTopicModal';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import CreateTopicModal from './Modals/CreateTopicModal';
import { setTopicId } from '../rtk/reducers/selectedTopicIdReducer';
// import { shell } from 'electron';


function Sidebar() {
    
    let [openDeleteModal,setOpenDeleteModal]=useState(false)
    let[openAddTopicModal,setOpenAddTopicModal]=useState(false)
    const sidebarOpenned=useSelector((state)=>state.openCloseSidebar)
    const topics=useSelector((state)=>state.topicsDetails)
    const [deletedTopicId,setDeletedTopicId]=useState(null)
    const selectedTopicId=useSelector((state)=>state.selectedTopicId)
    const dispatch=useDispatch()
    let openDeleteModalHandler=(e,topic)=>{
          e.stopPropagation()
          setOpenDeleteModal(true)
          setDeletedTopicId(topic?.id)
    }
  return (
    <>
      <DeleteTopicModal open={openDeleteModal} onClose={()=>{setOpenDeleteModal(false)}} topicId={deletedTopicId}/>
     <CreateTopicModal open={openAddTopicModal} onClose={()=>{setOpenAddTopicModal(false)}}/>
     <div className={`bg-[#121212]  text-white ${sidebarOpenned?'flex flex-col justify-between w-[15%] pt-6 border border-r-[1px] border-r-[#2a2a2a] border-t-transparent border-b-transparent border-l-transparent h-[calc(100vh-35px)] overflow-y-scroll hide-scrollbar':'w-[0px] overflow-hidden'}`}>
      <div> <div className='text-2xl font-bold mb-8 px-4'>Note Nest</div>
      <p className='text-4xl text-[#00f5ff] mb-6 px-4'>Topics</p>
      <div className='px-4'><button className='block bg-[#1a1a1a] border border-[1px] border-[#2a2a2a] w-[100%] flex   px-4 py-1 items-center text-1xl rounded-lg mb-4' onClick={()=>{
        setOpenAddTopicModal(true)
      }}><span className='mr-1 text-2xl'>+</span><p> Add Topic</p></button></div>

      <ul className='text-[20px]'>
        {topics?.map((topic)=>(<>
                  <li className={`py-1 px-4 flex cursor-pointer flex-row mb-2 justify-between items-center ${topic?.id==selectedTopicId&&'bg-cardColor'}`}onClick={()=>{
            dispatch(setTopicId(topic?.id))
          }}>
          <button >{topic?.title?.length>8?`${topic?.title?.slice(0,9)}...`:topic?.title}<span className='ml-1 inline-bock text-[15px] text-[#aaaaaa]'>({topic?.notes?.length})</span></button>
          <button className={`bg-red-600 w-[25px] h-[25px] flex justify-center items-center rounded-md ${topic?.id==selectedTopicId&&'collapse'}`} onClick={(e)=>{
            openDeleteModalHandler(e,topic)
          }}><MdOutlineDeleteForever /></button>
        </li >
       </> ))}

      </ul></div>
      <div className='flex items-center justify-center w-full text-sm border-t border-t-borderColor h-12'>
      <p className=''>made with <FaHeart className='inline text-secondaryColor'/> by <a className='text-blue-600 underline' title='linkedin profile link' href='#' onClick={(e)=>{
        e.preventDefault()
        window.electronAPI.openExternalLink("https://www.linkedin.com/in/mahmoud-helal-904a56231")
      }}>mahmoud</a></p>

      </div>
     
     </div></>  )
}
export default Sidebar