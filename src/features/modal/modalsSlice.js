import { createSlice } from "@reduxjs/toolkit";
import { getErrors, getMetaData, getSampleInfo, getColumnsData, getSQL, getDbTableData } from "./modalsService";

const initialState = {
   active: false,
   tooltipActice: false,
   ttData: '',
   errors: "",
   sampleInfo: "",
   metadata: "",
   sqlQueries: '',
   dbTableData: '',
   bigTableActive: false,
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
      },
      setBigTableActive(state) {
         state.bigTableActive = !state.bigTableActive
      },
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
         .addCase(getSQL.fulfilled, (state, action) => {
            state.sqlQueries = action.payload;
         })
         .addCase(getDbTableData.fulfilled, (state, action) => {
            state.dbTableData = action.payload;
         })
   
   }
})

export const { showModal, showToolTipModal, setBigTableActive } = modalsSlice.actions;
export default modalsSlice.reducer