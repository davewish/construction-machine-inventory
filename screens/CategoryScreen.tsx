import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Button } from "react-native-paper";

import MachineForm from "../components/MachineForm";
import NotFound from "../components/NoFound";

import { COLORS } from "../utils/colors";
import { InventoryParamList } from "../utils/type";


import { useMachine } from "../store/redux/hooksMachine";
import { useCategories } from "../store/redux/hooksCategory";
import { getBehavior } from "../utils/utils";
import { Machine } from "../models/Machine";

type CategoryRouteProp = RouteProp<InventoryParamList, "Category">;

type CategoryDrawerNavigationProp = DrawerNavigationProp<
  InventoryParamList,
  "Category"
>;

type Categoryprops = {
  route?: CategoryRouteProp;
  navigation: CategoryDrawerNavigationProp;
};

const CategoryScreen: React.FC<Categoryprops> = ({ navigation, route }) => {
  const { machines, groupedData } = useMachine();

  const addNewCategoryHandler = useCallback(() => {
    navigation.navigate("ManagedCategory");
  }, []);

  const renderMachineForm = useCallback(
    (itemData: { item: Machine }) => {
      return <MachineForm machine={itemData.item} />;
    },
    [machines]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => {
      return (
        <View>
          <Text style={styles.textHeader}> {item}</Text>
          <FlatList
            contentContainerStyle={styles.flatListContentStyle}
            data={groupedData[item]}
            keyExtractor={getkey}
            numColumns={2}
            renderItem={renderMachineForm}
          />
        </View>
      );
    },
    [groupedData]
  );

  if (Object.keys(groupedData).length === 0) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={getBehavior()}
      >
        <View style={styles.rootScreen}>
          <NotFound />

          <Button
            buttonColor={COLORS.primary}
            style={styles.btn}
            mode="contained"
            onPress={addNewCategoryHandler}
          >
            Add new
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.rootScreen}>
      {groupedData && (
        <FlatList
          contentContainerStyle={styles.flatListContentStyle}
          data={Object.keys(groupedData)}
          keyExtractor={getkey}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default CategoryScreen;

const getkey = (item: any) => (item?.machineId ? item?.machineId : item);

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  btn: {
    borderRadius: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 10,
  },
  flatListContentStyle: {
    padding: 4,
  },
});
