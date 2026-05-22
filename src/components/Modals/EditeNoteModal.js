import React from "react";
import Modal from "../Modal";

const EditeNoteModal = ({open,onClose}) => {
  return   <Modal open={open} onClose={()=>{onClose()}}>
              <div className='text-white pt-10 px-10'>
                <p className='text-center text-2xl mb-6'>Edite Existing Note</p>
                <div className='mb-6'>
                    <p className='text-xl'>Title</p>
                    <input type='text' placeholder='Topic Title...' className='bg-borderColor p-4 w-full rounded-xl'/>
                </div>
                <div>
                    <p className='text-xl'>Description</p>
                    <textarea placeholder='Topic Description...' className='h-[200px] bg-borderColor p-4 w-full rounded-xl'></textarea>
                </div>
  
              </div>
          </Modal> ;
};

export default EditeNoteModal;