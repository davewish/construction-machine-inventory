import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Field, MachineCategory } from "../../models/Category";
import uuid from "uuid-random";
import { Machine, MachineField } from "../../models/Machine";

interface IntialState {
  machines: Machine[];
}
const initialState: IntialState = {
  machines: [],
};

const machineSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    addMachine: (state, action: PayloadAction<Machine>) => {
      state.machines.push(action.payload);
    },
    updateMachine: (
      state,
      action: PayloadAction<{ machineId: string; field: MachineField }>
    ) => {
      const machine: Machine | undefined = state.machines.find(
        (machine) => machine.machineId === action.payload.machineId
      );
      const machineIndex = state.machines.findIndex(
        (machine) => machine.machineId === action.payload.machineId
      );

      if (machine) {
        const currentField = machine.fields.find(
          (field) => field.fieldId === action.payload.field.fieldId
        );
        const fieldIndex = machine.fields.findIndex(
          (field) => field.fieldId === action.payload.field.fieldId
        );
        console.log(currentField);
        if (currentField) {
          currentField.fieldValue = action.payload.field.fieldValue;
          state.machines[machineIndex].fields[fieldIndex] = currentField;
        } else {
          machine.fields.push(action.payload.field);
        }
      }
    },
    removeMchine: (state, action: PayloadAction<Machine>) => {
      const { machines } = state;
      const indexToBeRemoved = machines.findIndex(
        (machine) => machine.machineId == action.payload.machineId
      );

      state.machines.splice(indexToBeRemoved, 1);
    },
  },
});

export const { addMachine, updateMachine, removeMchine } = machineSlice.actions;

export default machineSlice.reducer;
