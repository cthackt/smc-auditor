import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   sampleYear: ""
}

export const sampleYearSlice = createSlice({
   name: 'sampleYear',
   initialState,
   reducers: {
      reset(state) {
         state.sampleYear = ""
      }, 
      setSampleYear(state, action) {
         const newSampleYear = action.payload
         state.sampleYear = newSampleYear
      }
   }
})

export const { setSampleYear, reset } = sampleYearSlice.actions;
export default sampleYearSlice.reducer