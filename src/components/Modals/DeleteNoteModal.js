import React from "react";
import Modal from "../Modal";
import { MdDeleteForever } from "react-icons/md";


const DeleteNoteModal = ({open,onClose}) => {
  return <Modal open={open} onClose={()=>{onClose()}} isDeleteModal={true}>
            <div className='pt-20 text-center text-white'>
              <div className='flex justify-center mb-6s'>
                  <MdDeleteForever className='text-red-600 text-[150px] text-center'/>
  
              </div>
              <p className='text-3xl mb-4'>Delete Note?</p>
              <p className='text-xl text-secondaryText'>This action cannot be undone. the Note will be permanently deleted. </p>
  
            </div>
        </Modal>;
};

export default DeleteNoteModal;