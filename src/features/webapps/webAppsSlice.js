import { createSlice } from "@reduxjs/toolkit";
import { getWebAppsStatus, queryWebAppsTable } from "./webAppsService";

const initialState = {
   "statuses": "",
   "loading": false,
   "lastUpdated": new Date(0).toUTCString().substring(16, 22)
}

export const webappsSlice = createSlice({
   name: 'webapp',
   initialState,
   reducers: {
      
   },
   extraReducers: (builder) => {
      builder
      .addCase(queryWebAppsTable.pending, (state) => {
         state.loading = true
      })
      .addCase(queryWebAppsTable.fulfilled, (state, action) => {
         state.statuses = action.payload
         state.loading = false
         // state.lastUpdated = Date.now().toUTCString().substring(16, 22)
      })
   } 
})

export const { display } = webappsSlice.actions;
export default webappsSlice.reducer