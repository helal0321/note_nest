import React from "react";
import Modal from "../Modal";
import { MdDeleteForever } from "react-icons/md";
import { deleteTopic } from "../../services/topicsServices";
import { useDispatch } from "react-redux";


const DeleteTopicModal = ({open,onClose,topicId}) => {
    const dispatch=useDispatch()
  return <Modal open={open} onClose={()=>{onClose()}} isDeleteModal={true} onDelete={()=>{
    deleteTopic(topicId,dispatch)
  }}>
            <div className='pt-20 text-center text-white'>
              <div className='flex justify-center mb-6s'>
                  <MdDeleteForever className='text-red-600 text-[150px] text-center'/>
  
              </div>
              <p className='text-3xl mb-4'>Delete Topic?</p>
              <p className='text-xl text-secondaryText'>This action cannot be undone. the Topic will be permanently deleted. </p>
  
            </div>
        </Modal>;
};

export default DeleteTopicModal;