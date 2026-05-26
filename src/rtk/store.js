import { configureStore } from '@reduxjs/toolkit';
import openCloseSidebarreducer  from './reducers/openCloseSidebarReducer';
import topicsDetailsReducer from './reducers/topicsDetailsReducer';
import selectedTopicIdReducer from './reducers/selectedTopicIdReducer'
export const store = configureStore({
 reducer: {
    openCloseSidebar:openCloseSidebarreducer,
    topicsDetails:topicsDetailsReducer,
    selectedTopicId:selectedTopicIdReducer
 }, 
});