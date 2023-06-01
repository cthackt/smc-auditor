import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   "TEST": false,
   "Analysis Tables" : false,
   "Raw Data" : false,
   "SQI" : true,
   "CSCI" : false,
   "RSCA" : true,
   "ASCI-D" : false,
   "CRAM" : false,
   "Chemistry" : false,
   "Eutrophication" : false,
   "Conductivity" : false,
   "Habitat" : false,
   "Temperature" : false,
   "PHAB" : true,
   "PHAB Metrics" : true,
}

export const tablesSlice = createSlice({
   name: 'table',
   initialState,
   reducers: {
      display(state, action) {
         const tableTitle = action.payload
         state[tableTitle] = !state[tableTitle]
      }
   }
})

export const { display } = tablesSlice.actions;
export default tablesSlice.reducer