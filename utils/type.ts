import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

export type InventoryParamList = {
  Category: undefined;
  ManagedCategory: undefined;
  MachineTypeDetail: {
    category: { id: string; name: string };
  };
};
