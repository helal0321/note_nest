import { configureStore } from '@reduxjs/toolkit';
import openCloseSidebarreducer  from './reducers/openCloseSidebarReducer';
import topicsDetailsReducer from './reducers/topicsDetailsReducer';
export const store = configureStore({
 reducer: {
    openCloseSidebar:openCloseSidebarreducer,
    topicsDetails:topicsDetailsReducer
 }, 
});