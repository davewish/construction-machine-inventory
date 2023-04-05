import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Field, MachineCategory } from "../../models/Category";
import uuid from "uuid-random";
import { Machine } from "../../models/Machine";
import { acc } from "react-native-reanimated";

interface IntialState {
  categories: MachineCategory[];

  deviceWidth: number;
}
const initialState: IntialState = {
  categories: [],
  deviceWidth: 800,
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
    updateCategoryName: (state, action: PayloadAction<MachineCategory>) => {
      const category: MachineCategory | undefined = state.categories.find(
        (category) => category.categoryId === action.payload.categoryId
      );

      if (category) {
        category.categoryName = action.payload.categoryName;
      }
    },
    updateCategoryFields: (
      state,
      action: PayloadAction<{ categoryId: string; field: Field }>
    ) => {
      const category: MachineCategory | undefined = state.categories.find(
        (category) => category.categoryId === action.payload.categoryId
      );
      const categoryIndex = state.categories.findIndex(
        (category) => category.categoryId === action.payload.categoryId
      );

      if (category) {
        const currentField = category.categoryFields.find(
          (field) => field.fieldId === action.payload.field.fieldId
        );
        const fieldIndex = category.categoryFields.findIndex(
          (field) => field.fieldId === action.payload.field.fieldId
        );

        if (currentField) {
          currentField.fieldName = action.payload.field.fieldName;
          currentField.fieldType = action.payload.field.fieldType;
          state.categories[categoryIndex].categoryFields[fieldIndex] =
            currentField;
        } else {
          category.categoryFields.push(action.payload.field);
        }
      }
    },

    updateFieldTitle: (
      state,
      action: PayloadAction<{ categoryId: string; fieldTitle: string }>
    ) => {
      const category: MachineCategory | undefined = state.categories.find(
        (category) => category.categoryId === action.payload.categoryId
      );

      if (category) {
        category.titleField = action.payload.fieldTitle;
      }
    },

    removeCategory: (state, action: PayloadAction<MachineCategory>) => {
      const { categories } = state;
      const indexToBeRemoved = categories.findIndex(
        (category) => category.categoryId == action.payload.categoryId
      );

      state.categories.splice(indexToBeRemoved, 1);
    },
    removeFields: (
      state,
      action: PayloadAction<{ categoryId: string; fieldId: string }>
    ) => {
      const category: MachineCategory | undefined = state.categories.find(
        (category) => category.categoryId === action.payload.categoryId
      );

      if (category) {
        const fieldIndex = category.categoryFields.findIndex(
          (field) => field.fieldId === action.payload.fieldId
        );
        const currentField = category.categoryFields.find(
          (field) => field.fieldId === action.payload.fieldId
        );
        if (category.titleField === currentField?.fieldName) {
          category.titleField = "";
        }
        category.categoryFields.splice(fieldIndex, 1);
      }
    },

    updateDeviceWidth: (state, action) => {
      state.deviceWidth = action.payload.width;
    },
  },
});

export const {
  addCategory,
  updateCategoryName,
  removeCategory,
  updateCategoryFields,
  updateDeviceWidth,
  updateFieldTitle,
  removeFields,
} = categorySlice.actions;

export default categorySlice.reducer;
