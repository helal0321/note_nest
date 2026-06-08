import { saveTopics } from "./topicsServices";

export const addNote = async (note, topicId, dispatch) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  if (Topics.length > 0) {
    let newNote = { ...note, id: Date.now() };
    let newTopics = Topics.map((topic) => {
      if (topic.id == topicId) {
        topic = { ...topic, notes: [...topic.notes, newNote] };
      }
      return topic;
    });
    saveTopics(newTopics, dispatch);
  }
};
export const deleteNote = async (topicId, noteId, dispatch) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  if (Topics.length > 0) {
    let newTopics = Topics.map((topic) => {
      if (topic.id == topicId) {
        let newNotes = topic.notes.filter((note) => note.id != noteId);
        topic = { ...topic, notes: newNotes };
      }
      return topic;
    });
    saveTopics(newTopics, dispatch);
  }
};
export const editeNote = async (topicId, noteId, noteDetails, dispatch) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  if (Topics.length > 0) {
    let newTopics = Topics.map((topic) => {
      if (topic.id == topicId) {
        let newNotes = topic.notes.map((note) => {
          if (note.id == noteId) {
            note.title = noteDetails.title;
            note.description = noteDetails.description;
          }
          return note;
        });
        topic = { ...topic, notes: newNotes };
      }
      return topic;
    });
    saveTopics(newTopics, dispatch);
  }
};
export const getNotesByTopicId = async (topicId) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  if (Topics.length > 0) {
    let notes = Topics.filter((topic) => topic.id == topicId)[0].notes;
    return notes;
  }
};
export const getNoteByTopicIdAndNoteId = async (topicId, noteId) => {
  console.log("note id", noteId);
  console.log("topic id", topicId);
  let notes = await getNotesByTopicId(topicId);
  let selectedNote = notes.filter((note) => note.id == noteId)[0];
  console.log("selected note", selectedNote);
  return selectedNote;
};
