import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MachineCategory } from "../../models/Category";
import uuid from "uuid-random";


interface IntialState {
  categories: MachineCategory[];
  drawerItem: any;
}
const initialState: IntialState = {
  categories: [],
  drawerItem: [
    { drawerName: "category", id: uuid() },
    { drawerName: "managedCategory", id: uuid() },
  ],
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
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,

  setStateFromAsyncStorage,
} = categorySlice.actions;

export default categorySlice.reducer;
