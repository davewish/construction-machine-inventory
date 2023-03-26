import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, TextInput, Text } from "react-native-paper";
import { Field, MachineCategory } from "../models/Category";
import { Button } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { DatePickerIOS } from "react-native";
import { COLORS } from "../utils/colors";
import { Machine, MachineField } from "../models/Machine";
import { useDispatch } from "react-redux";
import { removeMchine } from "../store/redux/categoryReducer";

interface MachineFormProps {
  machine: Machine;
}
const MachineForm = ({ machine }: MachineFormProps) => {
  const onChange = (event, selectedDate) => {
    //setDate(currentDate);
  };

  const dispatch = useDispatch();

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const changeInputHandler = (value: string) => {};
  const removeMachineHandler = () => {
    dispatch(removeMchine(machine));
  };

  const renderInputType = (field: MachineField): JSX.Element => {
    switch (field.fieldType) {
      case "Number":
        return (
          <View>
            <TextInput
              label={field.fieldName}
              mode="outlined"
              style={styles.categoryNameTextBox}
              keyboardType="numeric"
              value={field.fieldValue.toString()}
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
              value={field.fieldValue.toString()}
              underlineColor={"transparent"}
            />
          </View>
        );
      case "Checkbox":
        return <Checkbox status={"checked"} />;
      case "Date":
        return (
          <View style={styles.dateTimeContainer}>
            <TextInput
              label={field.fieldName}
              mode="outlined"
              style={[styles.categoryNameTextBox, { flex: 1 }]}
              value={new Date(field.fieldValue).toDateString()}
              underlineColor={"transparent"}
              onFocus={showMode}
            />
          </View>
        );
      default:
        return <></>;
    }
  };
  // if (machine && machine.fields.length < 1) {
  //   return <></>;
  // }

  return (
    <View key={machine.machineId} style={styles.rootScreen}>
      {machine &&
        machine.fields &&
        machine.fields.map((field) => {
          return (
            <View style={styles.innerContainer} key={field.fieldId}>
              {renderInputType(field)}
            </View>
          );
        })}
      {machine && machine.fields && (
        <View style={styles.btnContainer}>
          <Button
            buttonColor={"red"}
            textColor="#000"
            icon={"delete"}
            style={styles.btn}
            mode="contained"
            onPress={removeMachineHandler}
          >
            Remove
          </Button>
        </View>
      )}
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
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    borderRadius: 8,
    padding: 2,
    marginLeft: 6,
  },
  btnContainer: {
    margin: 10,
    alignItems: "flex-end",
  },
});
