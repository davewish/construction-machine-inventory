import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

import { Button } from "react-native-paper";

import NotFound from "../components/NoFound";
import { MachineCategory } from "../models/Category";

import uuid from "uuid-random";
import { useDispatch } from "react-redux";
import { addCategory, updateDeviceWidth } from "../store/redux/categoryReducer";
import AddCategoryForm from "./AddCategoryForm";
import { COLORS } from "../utils/colors";
import { useCategories } from "../store/redux/hooksCategory";

import { InventoryParamList } from "../utils/type";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

type ManagedCategoryRouteProp = RouteProp<
  InventoryParamList,
  "ManagedCategory"
>;

type ManagedCategoryDrawerNavigationProp = DrawerNavigationProp<
  InventoryParamList,
  "ManagedCategory"
>;

type ManagedCategoryprops = {
  route?: ManagedCategoryRouteProp;
  navigation?: ManagedCategoryDrawerNavigationProp;
};

const ManagedCategory: React.FC<ManagedCategoryprops> = ({
  navigation,
  route,
}) => {
  const { categories, deviceWidth } = useCategories();

  const dispatch = useDispatch();

  const onLayout = useCallback(() => {
    const { width } = Dimensions.get("window");
    dispatch(updateDeviceWidth({ width }));
  }, []);

  useEffect(() => {
    Dimensions.addEventListener("change", onLayout);
    return () => {};
  }, [deviceWidth]);

  const addNewCategoryForm = useCallback(() => {
    const category = new MachineCategory(uuid(), "New Category");
    dispatch(
      addCategory({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        categoryFields: category.categoryFields,
      })
    );
  }, []);
  const renderCategoryForm = useCallback((itemData: any) => {
    return <AddCategoryForm category={itemData.item} />;
  }, []);

  const displayContent = useCallback(() => {
    return categories.length === 0 ? (
      <>
        <NotFound />
      </>
    ) : deviceWidth < 500 ? (
      <FlatList
        data={categories}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={renderCategoryForm}
        numColumns={1}
        keyExtractor={(item) => item.categoryId}
      />
    ) : (
      <FlatList
        data={categories}
        contentContainerStyle={{ padding: 20 }}
        renderItem={renderCategoryForm}
        numColumns={2}
        keyExtractor={(item) => item.categoryId}
      />
    );
  }, [categories]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS !== "ios" ? "height" : "padding"}
    >
      <View style={styles.rootScreen} onLayout={onLayout}>
        <View style={styles.flatListContainer}>{displayContent()}</View>
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
    </KeyboardAvoidingView>
  );
};

export default ManagedCategory;
const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
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
