import { Field } from "./Category";

export interface MachineField {
  fieldId: string;
  fieldName: string;
  fieldType: string;
  fieldValue: number | string | Date | boolean;
}
export class Machine {
  machineId: string;
  categoryName: string;
  fields: MachineField[];
  constructor(machineId: string, categoryName: string) {
    this.machineId = machineId;
    this.categoryName = categoryName;
    this.fields = [];
  }
}
