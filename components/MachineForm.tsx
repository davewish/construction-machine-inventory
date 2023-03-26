import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, TextInput, Text } from "react-native-paper";
import { Field, MachineCategory } from "../models/Category";
import DateTimerPicker from "@react-native-community/datetimepicker";

interface MachineFormProps {
  category: MachineCategory;
}
const MachineForm = ({ category }: MachineFormProps) => {
  console.log("category ", category);
  const renderInputType = (field: Field) => {
    switch (field.fieldType) {
      case "Number":
        return (
          <View>
            <TextInput
              label={field.fieldName}
              mode="outlined"
              style={styles.categoryNameTextBox}
              keyboardType="numeric"
              value={field.fieldValue}
              underlineColor={"transparent"}
              ///onChangeText={textInputHansdler}
            />
          </View>
        );
      case "Text":
        return (
          <View>
            <TextInput
              label={field.fieldName}
              mode="outlined"
              style={styles.categoryNameTextBox}
              value={field.fieldValue}
              underlineColor={"transparent"}
            />
          </View>
        );
      case "Checkbox":
        return <Checkbox status={"checked"} />;
      case "Date":
        return <Text>Date</Text>; //<DateTimerPicker value={new Date()} mode="date" />;
    }
  };

  return (
    <View style={styles.rootScreen}>
      {category &&
        category.categoryFields &&
        category.categoryFields.map((field) => {
          return (
            <View style={styles.innerContainer} key={field.fieldId}>
              {renderInputType(field)}
            </View>
          );
        })}
    </View>
  );
};
export default MachineForm;

const styles = StyleSheet.create({
  rootScreen: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    borderRadius: 8,
    elevation: 4,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryNameTextBox: {
    padding: 0,
    marginBottom: 10,
    backgroundColor: "#ccc",
    borderColor: "#ccc",
    color: "#000",
  },

  label: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 4,
    marginTop: 6,
  },
});
