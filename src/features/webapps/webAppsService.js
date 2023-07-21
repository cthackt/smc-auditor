import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWebAppsStatus = createAsyncThunk("webapps/getWebAppsStatus", async () => {
   const response = await fetch(`https://nexus.sccwrp.org/smc-audit/getWebAppsStatus`)
   const result = await response.json()
   return result.res
})

export const queryWebAppsTable = createAsyncThunk("webapps/queryWebAppsTable", async () => {
   const response = await fetch("https://nexus.sccwrp.org/smc-audit/query_webapps_table")
   const result = await response.json()
   return result.res
})