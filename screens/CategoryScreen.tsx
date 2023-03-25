import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { Button } from "react-native-paper";
import MachineForm from "../components/MachineForm";
import NotFound from "../components/NoFound";

import { useCategories } from "../store/redux/hooks";

import { COLORS } from "../utils/colors";

interface CategoryScreenProps {
  navigation: any;
}

const CategoryScreen = ({ navigation }: CategoryScreenProps) => {
  const { categories } = useCategories();

  const addNewCategoryHandler = () => {
    navigation.navigate("managedCategory");
  };

  const renderItem = ({ item }) => {
    return <MachineForm category={item} />;
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
    justifyContent: "space-between",
  },

  btn: {
    borderRadius: 8,
  },
});
