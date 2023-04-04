import { useSelector } from "react-redux";
import { RootState } from "./store";
import uuid from "uuid-random";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

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
  const deviceWidth = useSelector(
    (state: RootState) => state.persistRed.deviceWidth
  );

  return {
    categories: machineCategories,
    categoryNames: [
      { id: uuid(), name: "Category" },
      ...categoryNames,
      { id: uuid(), name: "ManagedCategory" },
    ],
    selectedMachines,
    machines,
    deviceWidth,
  };
};


