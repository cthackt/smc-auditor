import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMetaData = createAsyncThunk(
   "modals/getMetaData", 
   async (inputDataArray) => {
      return inputDataArray;
})