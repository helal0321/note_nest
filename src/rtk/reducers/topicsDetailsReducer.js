import { createSlice } from '@reduxjs/toolkit';
const topicsDetailsSlice = createSlice({
 name: 'topicsDetails',
 initialState: [],
 reducers: {
    setTopics: (state, action) => {
      return action.payload; 
    },
 },
});
export const { setTopics } = topicsDetailsSlice.actions;
export default topicsDetailsSlice.reducer;