import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Checkbox, Button } from "react-native-paper";
import DatePicker from "@react-native-community/datetimepicker";

import { Field } from "../models/Category";
import { COLORS } from "../utils/colors";
import { useCategories } from "../store/redux/hooks";
import { useDispatch } from "react-redux";
import { updateCategory } from "../store/redux/categoryReducer";
interface FieldItemProps {
  field: Field;
  categoryId: string;
}
const FieldItem = ({ field, categoryId }: FieldItemProps) => {
  const { categories } = useCategories();

  const dispatch = useDispatch();

  const textInputHandler = (text: string) => {
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

      if (filteredField && fieldNames.indexOf(text) < 0) {
        filteredField.fieldName = text;
        dispatch(updateCategory(category));
      }
    }
  };

  const handleRemoveField = () => {
    const category = categories.find(
      (category) => category.categoryId === categoryId
    );
    if (category) {
      category.categoryFields = category.categoryFields.filter(
        (currentField) => currentField.fieldId != field.fieldId
      );
      dispatch(updateCategory(category));
    }
  };

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

      <Text style={styles.fieldText}> {fieldType}</Text>
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
    height: "100%",
    paddingTop: 10,
    marginLeft: 8,
  },
  textInputConainer: {
    flex: 6,
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
