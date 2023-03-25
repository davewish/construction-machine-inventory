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
    addDrawerItem: (state, action) => {
      state.drawerItem.splice(state.drawerItem.length - 1, 0, action.payload);
    },
    updateDrawerItem: (state, action) => {
      state.drawerItem = state.drawerItem.map((item) => {
        return item.drawerName.toLowerCase() ==
          action.payload.oldName.toLowerCase()
          ? { ...item, ...{ drawerName: action.payload.drawerName } }
          : item;
      });
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  addDrawerItem,
  updateDrawerItem,
} = categorySlice.actions;

export default categorySlice.reducer;
