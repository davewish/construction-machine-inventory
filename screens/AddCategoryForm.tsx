import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button, Menu, TextInput } from "react-native-paper";

import { MachineCategory } from "../models/Category";
import { COLORS } from "../utils/colors";
import { FIELD_TYPES } from "../utils/fieldType";
import MenuItem from "../components/MenuItem";
import { useDispatch } from "react-redux";
import uuid from "uuid-random";
import {
  removeCategory,
  updateCategory,
  updateDrawerItem,
} from "../store/redux/categoryReducer";
import FieldItem from "../components/FieldItem";
import { useCategories } from "../store/redux/hooks";
import { isPortrait } from "../utils/utils";

interface AddCategoryFormProps {
  category: MachineCategory;
}

const AddCategoryForm = ({ category }: AddCategoryFormProps) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const dispatch = useDispatch();

  const menuItemHandler = (value: string) => {
    category.categoryFields = [
      ...category.categoryFields,
      { fieldId: uuid(), fieldName: "", fieldType: value },
    ];
    dispatch(updateCategory(category));
    closeMenu();
  };

  const categoryNameTextInputHandler = (text: string) => {
    category.categoryName = text;

    dispatch(updateCategory(category));
  };
  const categoryRemoveHandler = () => {
    dispatch(removeCategory(category));
  };
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{category.categoryName}</Text>
      <View>
        <Text style={styles.categoryNameText}>Category Name </Text>
        <TextInput
          style={styles.categoryNameTextBox}
          value={category.categoryName}
          onChangeText={categoryNameTextInputHandler}
        />
      </View>
      <View>
        {category.categoryFields &&
          category.categoryFields.map((field) => (
            <FieldItem
              key={field.fieldId}
              field={field}
              categoryId={category.categoryId}
            />
          ))}
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          buttonColor={COLORS.primary}
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Title Field :
        </Button>
      </View>

      <View style={styles.btnsContainer}>
        <View style={styles.btnContainer}>
          <Menu
            theme={{
              colors: {
                background: "blue", // Change the background color here
              },
            }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                icon={"plus"}
                buttonColor={COLORS.secondary}
                textColor="#000"
                style={styles.btn}
                mode="contained"
                onPress={openMenu}
              >
                Add New fField
              </Button>
            }
          >
            {FIELD_TYPES.map((field) => (
              <MenuItem
                key={field.id}
                type={field.type}
                onPress={menuItemHandler}
              />
            ))}
          </Menu>
        </View>

        <View style={styles.btnContainer}>
          <Button
            buttonColor={COLORS.secondary}
            textColor="#000"
            icon={"delete"}
            style={styles.btn}
            mode="contained"
            onPress={categoryRemoveHandler}
          >
            Remove
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AddCategoryForm;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    width: isPortrait() ? "100%" : "50%",

    elevation: 4,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 8,
  },
  categoryNameText: {
    fontSize: 14,
    fontWeight: "300",
  },
  categoryNameTextBox: {
    borderWidth: 1,
    borderColor: "#222",
    padding: 4,
    marginBottom: 20,
    backgroundColor: "#ccc",
    color: "#000",
    borderRadius: 4,
  },
  btn: {
    borderRadius: 8,
  },
  btnContainer: {
    margin: 10,
  },
});
