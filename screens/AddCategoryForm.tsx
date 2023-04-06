import React, { useCallback, useRef, useState } from "react";

import { View, Text, StyleSheet, TextInput } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useDebouncedCallback } from "use-debounce";
import cloneDeep from "lodash/cloneDeep";

import { MachineCategory } from "../models/Category";
import { COLORS } from "../utils/colors";
import { FIELD_TYPES } from "../utils/fieldType";
import MenuItem from "../components/MenuItem";
import { useDispatch } from "react-redux";
import uuid from "uuid-random";
import {
  removeCategory,
  updateCategoryFields,
  updateCategoryName,
  updateFieldTitle,
} from "../store/redux/categoryReducer";
import FieldItem from "../components/FieldItem";

import { useCategories } from "../store/redux/hooksCategory";

interface AddCategoryFormProps {
  category: MachineCategory;
}

const AddCategoryForm = ({ category }: AddCategoryFormProps) => {
  const [visible, setVisible] = useState(false);
  const [visibleTitleField, setVisibleTitleField] = useState(false);

  const openMenu = useCallback(() => setVisible(true), [visible, setVisible]);
  const closeMenu = useCallback(() => setVisible(false), [visible, setVisible]);

  const openMenuTitleField = useCallback(
    () => setVisibleTitleField(true),
    [visibleTitleField, setVisibleTitleField]
  );
  const closeMenuTitleField = useCallback(
    () => setVisibleTitleField(false),
    [visibleTitleField, setVisibleTitleField]
  );

  const { deviceWidth, fieldsNames } = useCategories();
  const dispatch = useDispatch();

  const menuItemHandler = useCallback(
    (value: string) => {
      const fields = {
        categoryId: category.categoryId,
        field: { fieldId: uuid(), fieldName: "", fieldType: value },
      };

      dispatch(updateCategoryFields(fields));
      closeMenu();
    },
    [dispatch, closeMenu, updateCategoryFields]
  );

  const categoryNameTextInputHandler = useCallback(
    (text: string) => {
      dispatch(updateCategoryName({ ...category, categoryName: text }));
    },
    [dispatch, updateCategoryName]
  );

  const categoryRemoveHandler = useCallback(() => {
    dispatch(removeCategory(category));
  }, [dispatch, removeCategory]);

  const fieldTitleHandler = useCallback(
    (value: string) => {
      dispatch(
        updateFieldTitle({ categoryId: category.categoryId, fieldTitle: value })
      );
      closeMenuTitleField();
    },
    [dispatch, closeMenuTitleField]
  );
  const renderFieldItems = useCallback(() => {
    return (
      category.categoryFields &&
      category.categoryFields.map((field) => (
        <FieldItem
          key={field.fieldId}
          field={field}
          categoryId={category.categoryId}
        />
      ))
    );
  }, [category.categoryFields]);
  return (
    <View
      style={[
        styles.rootContainer,
        deviceWidth < 500 ? { width: "100%" } : { width: "50%" },
      ]}
    >
      <Text style={styles.title}>{category.categoryName}</Text>
      <View>
        <Text style={styles.categoryNameText}>Category Name </Text>
        <TextInput
          style={styles.categoryNameTextBox}
          onChangeText={categoryNameTextInputHandler}
          autoCorrect={false}
          defaultValue={category.categoryName}
        />
      </View>
      <View>{renderFieldItems()}</View>
      <View style={styles.btnContainer}>
        <Menu
          theme={{
            colors: {
              background: "blue",
            },
          }}
          visible={visibleTitleField}
          onDismiss={closeMenuTitleField}
          anchor={
            <Button
              style={styles.btn}
              buttonColor={COLORS.primary}
              mode="contained"
              onPress={openMenuTitleField}
            >
              Title Field :{category.titleField}
            </Button>
          }
        >
          {fieldsNames(category).map((fieldName) => (
            <MenuItem
              key={fieldName.id}
              type={fieldName.name}
              onPress={fieldTitleHandler}
            />
          ))}
        </Menu>
      </View>

      <View style={styles.btnsContainer}>
        <View style={styles.btnContainer}>
          <Menu
            theme={{
              colors: {
                background: "blue",
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
    backgroundColor: "#fff",
    margin: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,

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
