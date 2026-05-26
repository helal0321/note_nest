import { createSlice } from '@reduxjs/toolkit';
const selectedTopicIdSlice = createSlice({
 name: 'selectedTopicId',
 initialState: null,
 reducers: {
    setTopicId: (state, action) => {
      return action.payload; 
    },
 },
});
export const { setTopicId } = selectedTopicIdSlice.actions;
export default selectedTopicIdSlice.reducer;