import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import logger from "redux-logger";
import thunk from "redux-thunk";

import categoryReducer from "./categoryReducer";
import machineReducer from "./machineReducer";
import settingReducer from "./settingReducer";

const rootReducers = combineReducers({
  categories: categoryReducer,
  machines: machineReducer,
  settings: settingReducer,
});

const persistConfig = {
  key: "inventory",
  storage: AsyncStorage,
};

const persistRed = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: { persistRed },
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
