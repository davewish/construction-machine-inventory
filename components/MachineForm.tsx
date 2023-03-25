import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, TextInput, Text } from "react-native-paper";
import { Field, MachineCategory } from "../models/Category";
import DateTimerPicker from "@react-native-community/datetimepicker";

interface MachineFormProps {
  category: MachineCategory;
}
const MachineForm = ({ category }: MachineFormProps) => {
  const renderInputType = (field: Field) => {
    switch (field.fieldType) {
      case "Number":
        return (
          <View>
            <Text style={styles.label}>{field.fieldName}</Text>
            <TextInput
              style={styles.categoryNameTextBox}
              keyboardType="numeric"
              value={field.fieldValue}
              ///onChangeText={textInputHansdler}
            />
          </View>
        );
      case "Text":
        return (
          <View>
            <Text style={styles.label}>{field.fieldName}</Text>
            <TextInput
              style={styles.categoryNameTextBox}
              value={field.fieldValue}
            />
          </View>
        );
      case "Checkbox":
        return (
          <View>
            <Checkbox status={"checked"} />
          </View>
        );
      case "Date":
        return <DateTimerPicker value={new Date()} mode="date" />;
    }
  };

  return (
    <View style={styles.rootScreen}>
      <Text style={styles.textHeader}>{category && category.categoryName}</Text>
      {category &&
        category.categoryFields &&
        category.categoryFields.map((field) => {
          return renderInputType(field);
        })}
    </View>
  );
};
export default MachineForm;

const styles = StyleSheet.create({
  rootScreen: {
    width: "100%",
    backgroundColor: "#ffff",
    padding: 20,
    margin: 10,
    borderRadius: 8,
    elevation: 4,
  },
  categoryNameTextBox: {
    borderWidth: 1,
    borderColor: "#222",
    padding: 2,
    marginBottom: 20,
    backgroundColor: "#ccc",
    color: "#000",
    borderRadius: 8,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 4,
    marginTop: 10,
  },
});
