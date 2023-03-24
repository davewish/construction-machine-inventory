import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: string;
  categoryName: string;
}
interface IntialState {
  categories: Category[];
}
const initialState: IntialState = {
  categories: [
    // {
    //   categoryName: "BullDozer",
    //   id: new Date().toString + Math.random().toString(),
    // },
    // {
    //   categoryName: "Crane",
    //   id: new Date().toString + Math.random().toString(),
    // },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload.category);
    },

    removeCategory: (state, action: PayloadAction<Category>) => {
      const { categories } = state;
      const indexToBeRemoved = categories.findIndex(
        (category) => category.id == action.payload.id
      );

      state.categories.splice(indexToBeRemoved, 1);
    },
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
