import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./stationsService";

const initialState = {
   data: ''
}

export const stationsSlice = createSlice({
   name: 'station',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder
         .addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload
         })
   }
})

export default stationsSlice.reducer