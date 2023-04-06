import { useSelector } from "react-redux";
import { RootState } from "./store";
import uuid from "uuid-random";

import { MachineCategory } from "../../models/Category";
import { useCallback, useMemo } from "react";

const fieldsNames = (category: MachineCategory) =>
  category.categoryFields.map((field) => {
    return { id: uuid(), name: field.fieldName };
  }) || [];

export const useCategories = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.persistRed.categories.categories
  );

  const categoryNames = machineCategories.map((category) => {
    return { id: category.categoryId, name: category.categoryName };
  });

  const deviceWidth = useSelector(
    (state: RootState) => state.persistRed.settings.deviceWidth
  );
  const getFieldTitle = useCallback(
    (categoryId: string) => {
      return machineCategories.find(
        (machineCategory) => machineCategory.categoryId === categoryId
      )?.titleField;
    },
    [machineCategories]
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
    getFieldTitle,
  };
};
