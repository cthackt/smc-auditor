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
   console.log(result);
   return result.res

   // return demoData1;
})