import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MachineForm from "../components/MachineForm";
import NotFound from "../components/NoFound";
import { MachineCategory } from "../models/Category";
import { setStateFromAsyncStorage } from "../store/redux/categoryReducer";

import { useCategories } from "../store/redux/hooks";
import { loadStateFromAsyncStorage } from "../store/redux/save";

import { COLORS } from "../utils/colors";
import { InventoryParamList } from "../utils/type";
import { groupDataByCategory } from "../utils/utils";

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
  const { machines } = useCategories();

  const [groupedData, setGroupedData] = useState<any>([]);

  useEffect(() => {
    const groupedData = groupDataByCategory(machines);
    setGroupedData(groupedData);
  }, [machines]);

  const addNewCategoryHandler = () => {
    navigation.navigate("ManagedCategory");
  };

  const renderItem = ({ item }: ListRenderItemInfo<string>) => {
    return (
      <View key={item}>
        <Text style={styles.textHeader}> {item}</Text>
        <FlatList
          contentContainerStyle={{ padding: 4 }}
          data={groupedData[item]}
          keyExtractor={(item) => item.categoryId}
          renderItem={(item) => <MachineForm machine={item.item} />}
        />
      </View>
    );
  };

  if (machines.length === 0) {
    return (
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
    );
  }

  return (
    <View style={styles.rootScreen}>
      {machines && (
        <FlatList
          contentContainerStyle={{ padding: 4 }}
          data={Object.keys(groupedData)}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
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
});
