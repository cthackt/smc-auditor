import { createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("stations/getData", async (stationID) => {
   const payloadObj = {'station': stationID}
   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/search`, {
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

export const getErrorDates = createAsyncThunk("stations/getErrorDates", async (stationID) => {
   const payloadObj = {'station': stationID}
   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/get_error_dates`, {
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

export const getAllIds = createAsyncThunk("stations/getAllIds", async (stationID) => {
   
   const payloadObj = {'stationcode': stationID}
   const payload = JSON.stringify(payloadObj)

   const response = await fetch('https://nexus.sccwrp.org/smc-audit/masterid_mapper', {
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