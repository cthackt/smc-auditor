import { createSlice } from "@reduxjs/toolkit";
import { getErrors, getMetaData, getSampleInfo, getColumnsData } from "./modalsService";

const initialState = {
   active: false,
   tooltipActice: false,
   ttData: '',
   errors: "",
   sampleInfo: "",
   metadata: ""
}

export const modalsSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      showModal(state) {
         state.active = !state.active
      },
      showToolTipModal(state) {
         state.tooltipActive = !state.tooltipActive
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
         .addCase(getColumnsData.fulfilled, (state, action) => {
            state.ttData = action.payload;
         })
         .addCase(getSampleInfo.fulfilled, (state, action) => {
            state.sampleInfo = action.payload;
         })
   }
})

export const { showModal, showToolTipModal } = modalsSlice.actions;
export default modalsSlice.reducer