import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "./authService";

const initialState = {
   'check': false,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      
   },
   extraReducers: (builder) => {
      builder
      .addCase(getAuth.fulfilled, (state, action) => {
         state.check = action.payload
      })
   } 
})

export default authSlice.reducer