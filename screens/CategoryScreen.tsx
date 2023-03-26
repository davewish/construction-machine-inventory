import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MachineForm from "../components/MachineForm";
import NotFound from "../components/NoFound";
import { setStateFromAsyncStorage } from "../store/redux/categoryReducer";

import { useCategories } from "../store/redux/hooks";
import { loadStateFromAsyncStorage } from "../store/redux/save";

import { COLORS } from "../utils/colors";
import { groupDataByCategory } from "../utils/utils";

interface CategoryScreenProps {
  navigation: any;
}

const CategoryScreen = ({ navigation }: CategoryScreenProps) => {
  const { categories } = useCategories();

  const [groupedData, setGroupedData] = useState<any>([]);

  useEffect(() => {
    const groupedData = groupDataByCategory(categories);
    setGroupedData(groupedData);
  }, [categories]);

  const dispatch = useDispatch();

  const addNewCategoryHandler = () => {
    navigation.navigate("managedCategory");
  };

  const renderItem = (itemData) => {
    return (
      <View>
        <Text style={styles.textHeader}> {itemData.item}</Text>
        <FlatList
          data={groupedData[itemData.item]}
          keyExtractor={(item) => item.categoryId}
          renderItem={(item) => <MachineForm category={item.item} />}
        />
      </View>
    );
  };

  if (categories.length === 0) {
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
      {categories && (
        <FlatList
          data={Object.keys(groupedData)}
          keyExtractor={(item) => item}
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
