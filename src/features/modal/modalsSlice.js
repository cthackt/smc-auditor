import { createSlice } from "@reduxjs/toolkit";
import { getMetaData } from "./modalsService";

const initialState = {
   active: false,
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
         .addCase(getMetaData.fulfilled, (state, action) => {
            state.metadata = action.payload
         })
   }
})

export const { showModal } = modalsSlice.actions;
export default modalsSlice.reducer