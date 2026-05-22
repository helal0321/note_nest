import React, { useState } from 'react'

import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteTopicModal from './Modals/DeleteTopicModal';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import CreateTopicModal from './Modals/CreateTopicModal';

function Sidebar() {
    
    let [openDeleteModal,setOpenDeleteModal]=useState(false)
    let[openAddTopicModal,setOpenAddTopicModal]=useState(false)
    const sidebarOpenned=useSelector((state)=>state.openCloseSidebar)
    const topics=useSelector((state)=>state.topicsDetails)
    const [deletedTopicId,setDeletedTopicId]=useState(null)



  return (
    <>
      <DeleteTopicModal open={openDeleteModal} onClose={()=>{setOpenDeleteModal(false)}} topicId={deletedTopicId}/>
     <CreateTopicModal open={openAddTopicModal} onClose={()=>{setOpenAddTopicModal(false)}}/>
     <div className={`bg-[#121212]  text-white ${sidebarOpenned?'flex flex-col justify-between w-[15%] p-6 border border-r-[1px] border-r-[#2a2a2a] border-t-transparent border-b-transparent border-l-transparent h-[calc(100vh-35px)] overflow-y-scroll hide-scrollbar':'w-[0px] overflow-hidden'}`}>
      <div> <div className='text-2xl font-bold mb-8'>Note Nest</div>
      <p className='text-4xl text-[#00f5ff] mb-6'>Topics</p>
      <button className='block bg-[#1a1a1a] border border-[1px] border-[#2a2a2a] w-[100%] flex  px-4 py-1 items-center text-1xl rounded-lg mb-4' onClick={()=>{
        setOpenAddTopicModal(true)
      }}><span className='mr-1 text-2xl'>+</span><p> Add Topic</p></button>
      <ul className='text-[20px]'>
        {topics?.map((topic)=>(<>
                  <li className='mb-2 flex flex-row justify-between items-center'>
          <button>{topic?.title?.length>8?`${topic.title.slice(0,9)}...`:topic?.title}<span className='ml-1 inline-bock text-[15px] text-[#aaaaaa]'>({topic.notes.length})</span></button>
          <button className='bg-red-600 w-[25px] h-[25px] flex justify-center items-center rounded-md' onClick={()=>{
            setOpenDeleteModal(true)
            setDeletedTopicId(topic.id)
          }}><MdOutlineDeleteForever /></button>
        </li >
       </> ))}

      </ul></div>
      <p className='text-sm border-t border-t-borderColor pt-4'>made with <FaHeart className='inline text-secondaryColor'/> by <a href='facebook.com'>mahmoud</a></p>
     
     </div></>  )
}
export default Sidebar