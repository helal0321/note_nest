import { createSlice } from '@reduxjs/toolkit';
const openCloseSidebarSlice = createSlice({
 name: 'openCloseSidebar',
 initialState: true,
 reducers: {
   openCloseSidebar: (state) => {
     return !state
   },
 },
});
export const { openCloseSidebar } = openCloseSidebarSlice.actions;
export default openCloseSidebarSlice.reducer;