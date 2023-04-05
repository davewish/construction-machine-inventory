import { useSelector } from "react-redux";
import { RootState } from "./store";
import uuid from "uuid-random";
import { groupDataByCategory } from "../../utils/utils";
import { MachineCategory } from "../../models/Category";

export const useCategories = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.persistRed.categories.categories
  );

  const categoryNames = machineCategories.map((category) => {
    return { id: category.categoryId, name: category.categoryName };
  });
  const fieldsNames = (category: MachineCategory) =>
    category.categoryFields.map((field) => {
      return { id: uuid(), name: field.fieldName };
    }) || [];

  const deviceWidth = useSelector(
    (state: RootState) => state.persistRed.categories.deviceWidth
  );

  return {
    categories: machineCategories,
    categoryNames: [
      { id: uuid(), name: "Category" },
      ...categoryNames,
      { id: uuid(), name: "ManagedCategory" },
    ],
    deviceWidth,
    fieldsNames,
  };
};
