import { createSlice } from "@reduxjs/toolkit";
import { getErrors, getMetaData } from "./modalsService";

const initialState = {
   active: false,
   errors: "",
   metadata: ""
}

export const modalsSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      showModal(state) {
         state.active = !state.active
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getErrors.fulfilled, (state, action) => {
            state.errors = action.payload
         })
         .addCase(getMetaData.fulfilled, (state, action) => {
            state.metadata = action.payload
         })
   }
})

export const { showModal, setSampleData } = modalsSlice.actions;
export default modalsSlice.reducer