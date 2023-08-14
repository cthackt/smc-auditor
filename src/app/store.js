import { configureStore } from '@reduxjs/toolkit';
import stationsReducer from '../features/stations/stationsSlice'
import tablesReducer from '../features/tables/tablesSlice'
import modalReducer from '../features/modal/modalsSlice'
import sampleYearReducer from '../features/sampleYear/sampleYearSlice'
import webAppsReducer from '../features/webapps/webAppsSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
   reducer: {
      station: stationsReducer,
      tables: tablesReducer,
      modal: modalReducer,
      sampleYear: sampleYearReducer,
      webapps: webAppsReducer,
      auth: authReducer,
   },
});
