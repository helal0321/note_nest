import { setTopics } from "../rtk/reducers/topicsDetailsReducer";

export const saveTopics = async (topics, dispatch) => {
  await window.electronAPI.saveTopics(topics);
  dispatch(setTopics(topics));
};
export const addTopic = async (topic, dispatch) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  let newTopic = { ...topic, id: Date.now(),locked:false };
  let newTopics = [...Topics, newTopic];
  saveTopics(newTopics, dispatch);
};

export const deleteTopic = async (topicId, dispatch) => {
  let Topics = (await window.electronAPI.getTopics()) || [];
  if (Topics.length > 0) {
    let newTopics = Topics.filter((topic) => topic.id != topicId);
    saveTopics(newTopics, dispatch);
  }
};
export const getTopics = async () => {
  return (await window.electronAPI.getTopics()) || [];
};
export const lockTopic=async(topicId,dispatch)=>{
  let Topics = (await window.electronAPI.getTopics()) || [];
  if(Topics.length>0){
      let newTopics=Topics.map((topic)=>{
        if(topic?.id==topicId){
          topic.locked=true
          
        }
        return topic
      })
      await saveTopics(newTopics,dispatch)
  }
}
export const unLockTopic=async(topicId,dispatch)=>{
  let Topics = (await window.electronAPI.getTopics()) || [];
  if(Topics.length>0){
      let newTopics=Topics.map((topic)=>{
        if(topic?.id==topicId){
          topic.locked=false
          
        }
        return topic
      })
      await saveTopics(newTopics,dispatch)
  }
}

