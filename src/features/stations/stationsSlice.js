import { createSlice } from "@reduxjs/toolkit";
import { getData, getErrorDates, getAllIds } from "./stationsService";

const initialState = {
   data: "",
   allIDs: '',
   errorDates: "",
   pending: false
}

export const stationsSlice = createSlice({
   name: 'station',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder
         .addCase(getData.pending, (state) => {
            state.pending = true
         })
         .addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload
            state.pending = false
         })
         .addCase(getErrorDates.fulfilled, (state, action) => {
            state.errorDates = action.payload
         })
         .addCase(getAllIds.fulfilled, (state, action) => {
            state.allIDs = action.payload
         })
   }
})

export default stationsSlice.reducer