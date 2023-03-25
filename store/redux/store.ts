import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import logger from "redux-logger";
import thunk from "redux-thunk";

import categoryReducer from "./categoryReducer";

const persistConfig = {
  key: "category",
  storage: AsyncStorage,
};

const persistRed = persistReducer(persistConfig, categoryReducer);
export const store = configureStore({
  reducer: { persistRed },
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
