import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   "TEST": true,
   "Analysis Tables" : true,
   "Raw Data" : true,
   "SQI" : true,
   "CSCI" : true,
   "RSCA" : true,
   "ASCI-D" : true,
   "CRAM" : true,
   "Chemistry" : true,
   "Eutrophication" : true,
   "Conductivity" : true,
   "Habitat" : true,
   "Temperature" : true,
   "PHAB" : true,
   "PHAB Metrics" : true,
   "XSlope" : true,
   "XBKF_W" : true,
   "IPI" : true,
   "W1_HALL_SWAMP" : true,
   "ev_flowhab" : true,
   "h_aqhab" : true,
   "h_subnat" : true,
   "pct_safn" : true,
   "pct_rc" : true,
   "pct_pool" : true,
   "xcmg" : true,
   "xc" : true,
   "fl_q_m" : true,
   "fl_n_m" : true,
   "fl_d_m" : true,
   "fl_t_m" : true,
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