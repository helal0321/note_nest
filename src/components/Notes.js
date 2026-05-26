import React from "react";
import NoteCard from "./NoteCard";

const Notes = ({notes}) => {
  return (
          <div className='w-[100%] flex flex-row flex-wrap gap-[20px] relative '>
            {
              notes?.map((note)=><NoteCard noteDetails={note}/>)
            }       
      
      </div>
  );
};

export default Notes;