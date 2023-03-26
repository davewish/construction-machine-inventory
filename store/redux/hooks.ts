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
  const machines = useSelector((state: RootState) => state.persistRed.machines);
  const selectedMachines = (categoryName: string) => {
    return machines.filter((machine) => machine.categoryName === categoryName);
  };

  return {
    categories: machineCategories,
    categoryNames: [
      { id: uuid(), name: "Category" },
      ...categoryNames,
      { id: uuid(), name: "ManagedCategory" },
    ],
    selectedMachines,
    machines,
  };
};
