import { configureStore } from '@reduxjs/toolkit';
import stationsReducer from '../features/stations/stationsSlice'
import tablesReducer from '../features/tables/tablesSlice'
import modalReducer from '../features/modal/modalsSlice'

export const store = configureStore({
  reducer: {
    station: stationsReducer,
    tables: tablesReducer,
    modal: modalReducer
  },
});
