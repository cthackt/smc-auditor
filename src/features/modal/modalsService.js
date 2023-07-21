import { createAsyncThunk } from "@reduxjs/toolkit";

export const getErrors = createAsyncThunk("modal/getErrors", async (actionObject) => {

   const payloadObj = {
      'station': actionObject[0],
      'sample_date': actionObject[1],
      'variable': actionObject[2],
   }

   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/search_error_data`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: payload
   }
   )
   const result = await response.json()
   return result.res
})

export const getMetaData = createAsyncThunk("modal/getMetaData", async (actionObject) => {

   const payloadObj = {
      'station': actionObject[0],
      'sampledate': actionObject[1],
      'variable': actionObject[2],
   }

   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/get_metadata`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: payload
   }
   )
   const result = await response.json()
   return result.res
})

export const getSampleInfo = createAsyncThunk("modal/getSampleInfo", async (actionObject) => {

   const result = {
      'station': actionObject[0],
      'sample_date': actionObject[1],
      'variable': actionObject[2]
   }

   return result
})

export const getColumnsData = createAsyncThunk("modal/getColumnsData", async (actionObject) => {
   return actionObject
})
