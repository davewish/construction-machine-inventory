import React, { useLayoutEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MachineForm from "../components/MachineForm";
import { useCategories } from "../store/redux/hooks";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { InventoryParamList } from "../utils/type";
import { COLORS } from "../utils/colors";
import { Button } from "react-native-paper";
import { Machine } from "../models/Machine";

import uuid from "uuid-random";
import { useDispatch } from "react-redux";
import { addMachine } from "../store/redux/categoryReducer";
import { MachineCategory } from "../models/Category";

type MachineTypeDetailRouteProp = RouteProp<
  InventoryParamList,
  "MachineTypeDetail"
>;

type MachineTypeDetailDrawerNavigationProp = DrawerNavigationProp<
  InventoryParamList,
  "MachineTypeDetail"
>;

type MachineTypeDetailprops = {
  route: MachineTypeDetailRouteProp;
  navigation: MachineTypeDetailDrawerNavigationProp;
};

const MachineTypeDetail: React.FC<MachineTypeDetailprops> = ({
  route,
  navigation,
}) => {
  const { categoryName } = route.params;
  const { categories, machines } = useCategories();

  const dispatch = useDispatch();

  const { selectedMachines } = useCategories();
  const addNewItemHandler = () => {
    const machine = new Machine(uuid(), categoryName);
    const currentCategory: MachineCategory | undefined = categories.find(
      (category: MachineCategory) => category.categoryName === categoryName
    );
    if (currentCategory) {
      machine.fields = currentCategory.categoryFields.map((category) => {
        let defaultValue: number | string | Date | boolean;
        const type = category.fieldType.toLowerCase();
        if (type === "number") {
          defaultValue = 0;
        } else if (type === "text") {
          defaultValue = "";
        } else if (type === "checkbox") {
          defaultValue = false;
        } else {
          defaultValue = new Date();
        }
        return {
          fieldId: category.fieldId,
          fieldName: category.fieldName,
          fieldType: category.fieldType,
          fieldValue: defaultValue,
        };
      });
    }

    dispatch(addMachine({ ...machine }));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerRight: () => (
        <Button
          textColor="#fff"
          icon={"plus"}
          style={styles.btn}
          buttonColor={COLORS.primary}
          mode="contained"
          onPress={addNewItemHandler}
          disabled={
            categories.find(
              (category) => category.categoryName === categoryName
            )?.categoryFields.length === 0
          }
        >
          Add New Item
        </Button>
      ),
    });
  }, [categoryName]);
  return (
    <View style={styles.rootScreen}>
      <FlatList
        data={selectedMachines(categoryName)}
        keyExtractor={(item) => item.machineId}
        renderItem={(item) => <MachineForm machine={item.item} />}
      />
    </View>
  );
};
export default MachineTypeDetail;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  btn: {
    marginHorizontal: 10,
  },
});
