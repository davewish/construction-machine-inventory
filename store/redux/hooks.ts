import { useSelector } from "react-redux";
import { RootState } from "./store";

export const useCategories = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.persistRed.categories
  );
  const drawerItem = useSelector(
    (state: RootState) => state.persistRed.drawerItem
  );
  return {
    categories: machineCategories,
    drawerItem,
  };
};
