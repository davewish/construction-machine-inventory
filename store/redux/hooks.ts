import { useSelector } from "react-redux";
import { RootState } from "./store";
import uuid from "uuid-random";

export const useCategories = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.persistRed.categories
  );

  const categoryNames = machineCategories.map((category) => {
    return { id: category.categoryId, name: category.categoryName };
  });

  return {
    categories: machineCategories,
    categoryNames: [
      { id: uuid(), name: "category" },
      ...categoryNames,
      { id: uuid(), name: "managedCategory" },
    ],
  };
};
