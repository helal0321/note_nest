import React from "react";
import Modal from "../Modal";
import { breakWordCheck } from "../../utils/breakWordCheck";

const NoteDetailModal = ({ open, onClose, noteDetails }) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      showButtons={false}
    >
      <div className="pt-10 px-6 pb-10">
        <p className={`text-white text-center text-xl mb-6 border-b pb-4 border-t border-t-borderColor pt-4 border-b-borderColor ${breakWordCheck(noteDetails?.title)?'break-all':''}`}>
          {noteDetails?.title}
        </p>
        <p className={`bg-borderColor text-secondaryText p-2 h-[350px] rounded-xl overflow-y-scroll hide-scrollbar ${breakWordCheck(noteDetails?.description)?'break-all':''}`}>
          {noteDetails?.description}
        </p>
      </div>
    </Modal>
  );
};

export default NoteDetailModal;
