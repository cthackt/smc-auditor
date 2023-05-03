import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   sampleYear: ""
}

export const sampleYearSlice = createSlice({
   name: 'sampleYear',
   initialState,
   reducers: {
      setSampleYear(state, action) {
         const newSampleYear = action.payload
         state.sampleYear = newSampleYear
      }
   }
})

export const { setSampleYear } = sampleYearSlice.actions;
export default sampleYearSlice.reducer