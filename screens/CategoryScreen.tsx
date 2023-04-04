import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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

import { useCategories } from "../store/redux/hooks";

import { COLORS } from "../utils/colors";
import { InventoryParamList } from "../utils/type";
import { groupDataByCategory } from "../utils/utils";
import uuid from "uuid-random";

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
      <View key={uuid()}>
        <Text style={styles.textHeader}> {item}</Text>
        <FlatList
          contentContainerStyle={{ padding: 4 }}
          data={groupedData[item]}
          keyExtractor={(item) => item.machineId}
          numColumns={2}
          renderItem={(item) => <MachineForm machine={item.item} />}
        />
      </View>
    );
  };

  if (machines.length === 0) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS !== "ios" ? "height" : "padding"}
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
      {machines && (
        <FlatList
          contentContainerStyle={{ padding: 4 }}
          data={Object.keys(groupedData)}
          keyExtractor={(item, index) => uuid()}
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
