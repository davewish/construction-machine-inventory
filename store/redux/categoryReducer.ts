import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MachineCategory } from "../../models/Category";
import uuid from "uuid-random";
import { Machine } from "../../models/Machine";

interface IntialState {
  categories: MachineCategory[];
  machines: Machine[];
}
const initialState: IntialState = {
  categories: [],

  machines: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setStateFromAsyncStorage: (state, action) => {
      state = action.payload;
    },
    addCategory: (state, action: PayloadAction<MachineCategory>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<MachineCategory>) => {
      state.categories = state.categories.map((category) => {
        return category.categoryId === action.payload.categoryId
          ? { ...category, ...action.payload }
          : category;
      });
    },

    removeCategory: (state, action: PayloadAction<MachineCategory>) => {
      const { categories } = state;
      const indexToBeRemoved = categories.findIndex(
        (category) => category.categoryId == action.payload.categoryId
      );

      state.categories.splice(indexToBeRemoved, 1);
    },
    addMachine: (state, action: PayloadAction<Machine>) => {
      state.machines.push(action.payload);
    },
    removeMchine: (state, action: PayloadAction<Machine>) => {
      const { machines } = state;
      const indexToBeRemoved = machines.findIndex(
        (machine) => machine.machineId == action.payload.machineId
      );

      state.machines.splice(indexToBeRemoved, 1);
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,

  setStateFromAsyncStorage,
  addMachine,
  removeMchine,
} = categorySlice.actions;

export default categorySlice.reducer;
