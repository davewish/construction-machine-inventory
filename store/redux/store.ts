import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from "./categoryReducer";

export const store = configureStore({
  reducer: {
    MachineCategory: categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
