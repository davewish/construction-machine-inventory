import { useSelector } from "react-redux";
import { RootState } from "./store";

export const useCategories = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.MachineCategory.categories
  );
  const drawerItem = useSelector(
    (state: RootState) => state.MachineCategory.drawerItem
  );
  return {
    categories: machineCategories,
    drawerItem,
  };
};
