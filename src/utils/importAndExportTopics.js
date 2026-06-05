import { saveTopics } from "../services/topicsServices";

export const exportTopics = () => {
  window.electronAPI.exportData();
};
export const importTopics = async (topics, dispatch) => {
  const result = await window.electronAPI.importData();
  let index = 0;
  let mergedTopics = [
    ...topics,
    ...result.map((topic) => {
      index++;
      return {
        title: topic.title,
        notes: topic.notes,
        id: Date.now() + index,
        locked:false
      };
    }),
  ];
  saveTopics(mergedTopics, dispatch);
};
