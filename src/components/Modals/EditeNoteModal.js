import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { editeNote } from "../../services/notesServices";
import { useDispatch } from "react-redux";

const EditeNoteModal = ({open,onClose,noteDetails,topicId}) => {
    const [noteData,setNoteData]=useState({title:"",description:""})
    const [isInputsValueValid,setIsInputsValueValid]=useState(false)
    const dispatch=useDispatch()
    useEffect(()=>{
        setNoteData({title:noteDetails?.title,description:noteDetails.description})
    },[open,noteDetails])
        useEffect(()=>{
            if(noteData.title.length>0&&noteData.description.length>0){
                setIsInputsValueValid(true)
            }else{
                setIsInputsValueValid(false)
            }
        },[noteData])
  return   <Modal open={open} onClose={()=>{
    onClose()
    setNoteData({title:"",description:""})
    }} onConfirm={()=>{
        editeNote(topicId,noteDetails.id,noteData,dispatch)
    }} isValidInputs={isInputsValueValid}>
              <div className='text-white pt-10 px-10'>
                <p className='text-center text-2xl mb-6'>Edit Existing Note</p>
                <div className='mb-6'>
                    <p className='text-xl'>Title</p>
                    <input type='text' placeholder='Note Title...' className='bg-borderColor p-4 w-full rounded-xl' value={noteData.title} onChange={(e)=>{
                        setNoteData({...noteData,title:e.target.value})
                    }}/>
                </div>
                <div>
                    <p className='text-xl'>Description</p>
                    <textarea placeholder='Note Description...' className='h-[200px] bg-borderColor p-4 w-full rounded-xl' value={noteData.description} onChange={(e)=>{
                        setNoteData({...noteData,description:e.target.value})
                    }}></textarea>
                </div>
  
              </div>
          </Modal> ;
};

export default EditeNoteModal;