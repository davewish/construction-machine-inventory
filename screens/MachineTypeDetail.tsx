import React, { useCallback, useLayoutEffect, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MachineForm from "../components/MachineForm";
import { useCategories } from "../store/redux/hooksCategory";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { InventoryParamList } from "../utils/type";
import { COLORS } from "../utils/colors";
import { Button } from "react-native-paper";
import { Machine, MachineField } from "../models/Machine";

import uuid from "uuid-random";
import { useDispatch } from "react-redux";

import { MachineCategory } from "../models/Category";
import { useMachine } from "../store/redux/hooksMachine";
import { addMachine } from "../store/redux/machineReducer";
import FieldItem from "../components/FieldItem";
import { getBehavior } from "../utils/utils";

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
  const { id: categoryId, name: categoryName } = route.params.category;
  const { categories, getFieldTitle } = useCategories();
  const { selectedMachines } = useMachine();

  const dispatch = useDispatch();

  const addNewItemHandler = useCallback(() => {
    const machine = new Machine(uuid(), categoryName, categoryId);

    const currentCategory: MachineCategory | undefined = categories.find(
      (category: MachineCategory) => category.categoryId === categoryId
    );

    let fields: MachineField[] = [];
    if (currentCategory) {
      fields = currentCategory.categoryFields.map((category) => {
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
    dispatch(addMachine({ ...machine, fields }));
  }, [categories, categoryId, categoryName, dispatch, addMachine]);

  const isAddNewButtonDIsbaled = useMemo(
    () =>
      categories.find((category) => category.categoryName === categoryName)
        ?.categoryFields.length === 0,
    [categories]
  );

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
          disabled={isAddNewButtonDIsbaled}
        >
          Add New Item
        </Button>
      ),
    });
  }, [categoryName, categories, categoryId, addNewItemHandler]);

  const renderMachineForm = useCallback(
    (itemData: { item: Machine }) => {
      return <MachineForm machine={itemData.item} />;
    },
    [selectedMachines]
  );

  return (
    <KeyboardAvoidingView style={styles.rootScreen} behavior={getBehavior()}>
      <View style={styles.rootScreen}>
        <FlatList
          contentContainerStyle={styles.containerStyle}
          data={selectedMachines(categoryName)}
          keyExtractor={getKey}
          numColumns={2}
          renderItem={renderMachineForm}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const getKey = (item: Machine) => item?.machineId;

export default MachineTypeDetail;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  btn: {
    marginHorizontal: 10,
  },
  containerStyle: {
    paddingHorizontal: 12,
  },
});
