import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuth = createAsyncThunk("modal/getAuth", async ({un, pw}) => {

   console.log(un, pw)

   const payloadObj = {
      'un': un,
      'pw': pw
   }

   const payload = JSON.stringify(payloadObj)

   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/auth`, {
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