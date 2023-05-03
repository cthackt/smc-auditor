import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   "t1 parent" : true,
   "t2 child" : false,
   "t3 grandchild" : false,
   "All results" : true
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