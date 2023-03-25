import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

import NotFound from "../components/NoFound";
import { MachineCategory } from "../models/Category";
import { RootState } from "../store/redux/store";

import uuid from "uuid-random";
import { useDispatch } from "react-redux";
import { addCategory, addDrawerItem } from "../store/redux/categoryReducer";
import AddCategoryForm from "./AddCategoryForm";
import { COLORS } from "../utils/colors";
import { useCategories } from "../store/redux/hooks";

const ManagedCategory = () => {
  const { categories } = useCategories();

  const dispatch = useDispatch();

  const addNewCategoryForm = () => {
    const category = new MachineCategory(uuid(), "New Category");
    dispatch(
      addCategory({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        categoryFields: category.categoryFields,
      })
    );
    dispatch(addDrawerItem({ id: uuid(), drawerName: category.categoryName }));
  };
  const renderCategoryForm = (itemData: any) => {
    return <AddCategoryForm category={itemData.item} />;
  };

  const displayContent: React.ReactElement =
    categories.length === 0 ? (
      <>
        <NotFound />
      </>
    ) : (
      <FlatList
        data={categories}
        renderItem={renderCategoryForm}
        keyExtractor={(item) => item.categoryId}
      />
    );

  return (
    <View style={styles.rootScreen}>
      <View style={styles.flatListContainer}>{displayContent}</View>
      <View style={styles.addBtnContainer}>
        <Button
          buttonColor={COLORS.primary}
          style={styles.btn}
          mode="contained"
          onPress={addNewCategoryForm}
        >
          Add new
        </Button>
      </View>
    </View>
  );
};

export default ManagedCategory;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    margin: 10,
  },
  flatListContainer: {
    flex: 2,
    padding: 10,
  },
  addBtnContainer: {
    width: "100%",
  },
  btn: {
    borderRadius: 8,
  },
});
