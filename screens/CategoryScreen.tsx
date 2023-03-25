import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CustomButton from "../components/Button";
import Button from "../components/Button";
import MachineForm from "../components/MachineForm";
import NotFound from "../components/NoFound";
import { MachineCategory } from "../models/Category";
import { useCategories } from "../store/redux/hooks";
import { RootState } from "../store/redux/store";

interface CategoryScreenProps {
  navigation: any;
}

const CategoryScreen = ({ navigation }: CategoryScreenProps) => {
  const { categories } = useCategories();

  const addNewCategoryHandler = () => {
    navigation.navigate("managedCategory");
  };

  const renderItem = (itemData) => {
    console.log("ite", itemData);
    return <MachineForm category={itemData.item} />;
  };

  if (categories.length === 0) {
    return (
      <View style={styles.rootScreen}>
        <NotFound />

        <CustomButton
          addNewCategoryForm={addNewCategoryHandler}
          label={"Add New Category"}
        />
      </View>
    );
  }

  return (
    <View style={styles.rootScreen}>
      {categories && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.categoryId}
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
  },
});
