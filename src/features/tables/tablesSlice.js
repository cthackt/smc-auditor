import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   "TEST": false,
   "Analysis Tables" : false,
   "Raw Data" : false,
   "SQI" : false,
   "CSCI" : false,
   "RSCA" : false,
   "ASCI-D" : false,
   "CRAM" : false,
   "Chemistry" : false,
   "Eutrophication" : false,
   "Conductivity" : false,
   "Habitat" : false,
   "Temperature" : false,
   "PHAB" : false,
   "PHAB Metrics" : false,
   "XSlope" : false,
   "XBKF_W" : false,
   "IPI" : false,
   "W1_HALL_SWAMP" : false,
   "ev_flowhab" : false,
   "h_aqhab" : false,
   "h_subnat" : false,
   "pct_safn" : false,
   "pct_rc" : false,
   "pct_pool" : false,
   "xcmg" : false,
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