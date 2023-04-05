import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Checkbox, Button, Menu } from "react-native-paper";
import DatePicker from "@react-native-community/datetimepicker";

import { Field } from "../models/Category";
import { COLORS } from "../utils/colors";
import { useCategories } from "../store/redux/hooksCategory";
import { useDispatch } from "react-redux";
import {
  removeFields,
  updateCategory,
  updateCategoryFields,
} from "../store/redux/categoryReducer";
import { FIELD_TYPES } from "../utils/fieldType";
import MenuItem from "./MenuItem";
interface FieldItemProps {
  field: Field;
  categoryId: string;
}
const FieldItem = ({ field, categoryId }: FieldItemProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const { categories } = useCategories();

  const dispatch = useDispatch();

  const updateFields = useCallback(() => {
    const category = categories.find(
      (category) => category.categoryId === categoryId
    );
    if (category) {
      const filteredField = category?.categoryFields.find(
        (currentField) => currentField.fieldId == field.fieldId
      );
      const fieldNames = category.categoryFields.map(
        (field) => field.fieldName
      );

      return { filteredField, fieldNames };
    }
  }, [categories, categoryId]);

  const textInputHandler = useCallback(
    (text: string) => {
      const { filteredField, fieldNames } = updateFields();

      if (filteredField && fieldNames.indexOf(text) < 0) {
        dispatch(
          updateCategoryFields({
            categoryId,
            field: { ...filteredField, fieldName: text },
          })
        );
      }
    },
    [field, dispatch, updateCategoryFields]
  );

  const handleRemoveField = useCallback(() => {
    dispatch(removeFields({ categoryId: categoryId, fieldId: field.fieldId }));
  }, []);

  const fieldTypeHandler = useCallback(
    (value: string) => {
      const { filteredField } = updateFields();

      if (filteredField) {
        dispatch(
          updateCategoryFields({
            categoryId,
            field: { ...filteredField, fieldType: value },
          })
        );
      }
      closeMenu();
    },
    [field, dispatch, updateCategoryFields, closeMenu]
  );

  const { fieldName, fieldType } = field;

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.textInputConainer}>
        <TextInput
          label={"field"}
          style={styles.textInput}
          value={fieldName}
          onChangeText={textInputHandler}
        />
      </View>
      <View style={styles.menuContainer}>
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
              style={styles.btn}
              buttonColor="#fff"
              textColor="#000"
              mode="text"
              onPress={openMenu}
            >
              {fieldType}
            </Button>
          }
        >
          {FIELD_TYPES.map((field) => (
            <MenuItem
              key={field.id}
              type={field.type}
              onPress={fieldTypeHandler}
            />
          ))}
        </Menu>
      </View>

      <Button
        buttonColor={"#fff"}
        textColor="red"
        icon={"delete"}
        style={styles.btn}
        mode="contained"
        onPress={handleRemoveField}
      />
    </View>
  );
};

export default FieldItem;
const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    borderRadius: 8,

    paddingTop: 10,
    marginLeft: 8,
  },
  textInputConainer: {
    flex: 6,
  },
  menuContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#ccc",
    color: "#000",
    borderRadius: 2,
  },
  fieldText: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    height: "100%",
    textAlign: "center",
    paddingTop: 20,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
});
