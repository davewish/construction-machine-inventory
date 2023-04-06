import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, TextInput, Text } from "react-native-paper";

import { Button } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { Machine, MachineField } from "../models/Machine";
import { useDispatch } from "react-redux";
import { removeMchine, updateMachine } from "../store/redux/machineReducer";
import { useCategories } from "../store/redux/hooksCategory";

interface MachineFormProps {
  machine: Machine;
}

const MachineForm = ({ machine }: MachineFormProps) => {
  const dispatch = useDispatch();
  const { getFieldTitle } = useCategories();

  const fieldTitle = useMemo(
    () => getFieldTitle(machine.categoryId),
    [machine, machine.categoryId, getFieldTitle]
  );

  const updateValue = useCallback(
    (value: string | number | Date | boolean, fieldId: string) => {
      const currentField = machine.fields.find(
        (field) => field.fieldId === fieldId
      );

      if (currentField) {
        dispatch(
          updateMachine({
            machineId: machine.machineId,
            field: { ...currentField, fieldValue: value },
          })
        );
      }
    },
    [machine, dispatch, updateMachine]
  );
  const changeDateHandler = useCallback(
    (selectedDate: any, id: string) => {
      updateValue(new Date(selectedDate.nativeEvent.timestamp), id);
    },
    [updateValue]
  );

  const changeInputHandler = useCallback(
    (value: string, id: string) => {
      updateValue(value, id);
    },
    [updateValue]
  );
  const removeMachineHandler = useCallback(() => {
    dispatch(removeMchine(machine));
  }, [dispatch, removeMchine]);

  const checkboxHandler = useCallback(
    (value: boolean, id: string) => {
      updateValue(!value, id);
    },
    [updateValue]
  );

  const renderInputType = useCallback(
    (field: MachineField): JSX.Element => {
      const showMode = () => {
        DateTimePickerAndroid.open({
          value: new Date(),
          onChange: (value) => {
            changeDateHandler(value, field.fieldId);
          },
          mode: "date",
          is24Hour: true,
        });
      };
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
                onChangeText={(input) =>
                  changeInputHandler(input, field.fieldId)
                }
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
                onChangeText={(input) =>
                  changeInputHandler(input, field.fieldId)
                }
              />
            </View>
          );
        case "Checkbox":
          return (
            <Checkbox
              onPress={() => {
                checkboxHandler(field.fieldValue as boolean, field.fieldId);
              }}
              status={field.fieldValue ? "checked" : "unchecked"}
            />
          );
        case "Date":
          return (
            <View style={styles.dateTimeContainer}>
              <TextInput
                label={field.fieldName}
                mode="outlined"
                style={[styles.categoryNameTextBox, { flex: 1 }]}
                value={new Date(field.fieldValue as Date).toDateString()}
                underlineColor={"transparent"}
                onFocus={showMode}
              />
            </View>
          );
        default:
          return <></>;
      }
    },
    [machine]
  );

  return (
    <View key={machine.machineId} style={styles.rootScreen}>
      <View style={styles.fieldTitleCotainer}>
        <Text
          style={styles.fieldTitleText}
        >{`Field Title: ${fieldTitle}`}</Text>
      </View>
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
            buttonColor={"#fff"}
            textColor="red"
            icon={"delete"}
            style={styles.btn}
            mode="contained"
            onPress={removeMachineHandler}
          >
            {""}
          </Button>
        </View>
      )}
    </View>
  );
};
export default MachineForm;

const styles = StyleSheet.create({
  rootScreen: {
    width: "50%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 8,
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
    width: "10%",
    paddingTop: 2,
  },

  btnContainer: {
    margin: 10,
    alignItems: "flex-end",
  },
  fieldTitleCotainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 4,
  },
  fieldTitleText: {
    fontSize: 16,
    textTransform: "capitalize",
    color: "#000",
    fontWeight: "bold",
  },
});
