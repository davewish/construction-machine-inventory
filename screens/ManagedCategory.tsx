import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

import NotFound from "../components/NoFound";
import { MachineCategory } from "../models/Category";
import { RootState } from "../store/redux/store";

import uuid from "uuid-random";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/redux/categoryReducer";
import AddCategoryForm from "./AddCategoryForm";
import { COLORS } from "../utils/colors";
import { useCategories } from "../store/redux/hooks";
import { isPortrait } from "../utils/utils";
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
        contentContainerStyle={{ padding: 4 }}
        renderItem={renderCategoryForm}
        numColumns={isPortrait() ? 1 : 2}
        keyExtractor={(item) => item.categoryId}
      />
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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

