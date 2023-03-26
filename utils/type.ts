import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

export type InventoryParamList = {
  Category: undefined;
  ManagedCategory: undefined;
  MachineTypeDetail: {
    categoryName: string;
  };
};
