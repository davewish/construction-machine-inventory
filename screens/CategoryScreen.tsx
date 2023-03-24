import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { MachineCategory } from "../models/Category";
import { RootState } from "../store/redux/store";

const CategoryScreen = () => {
  const machineCategories = useSelector(
    (state: RootState) => state.MachineCategory.categories
  );
  if (machineCategories.length === 0) {
    return (
      <View style={styles.rootScreen}>
        <Text style={styles.noFoundText}> No Category Found </Text>
        <Pressable>
          <View style={styles.addCategoryButton}>
            <Text style={styles.btnText}> Add New Category</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.rootScreen}>
      {machineCategories.map((category) => (
        <Text key={category.id}> {category.categoryName} </Text>
      ))}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFoundText: {
    fontSize: 18,
    fontWeight: 300,
    marginBottom: 10,
  },
  addCategoryButton: {
    padding: 20,
    backgroundColor: "#0E1BA3",
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
