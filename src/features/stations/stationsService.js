import { createAsyncThunk } from "@reduxjs/toolkit";

import { demoData1 } from "../../assets/demoData";

export const getData = createAsyncThunk("stations/getData", async (stationID) => {
   const payloadObj = {'station': stationID}
   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/search2`, {
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