export interface Field {
  fieldId: string;
  fieldName: string;
  fieldType: string;
}

export class MachineCategory {
  categoryId: string;
  categoryName: string;
  categoryFields: Field[];
  titleField: string;

  constructor(categoryId: string, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryFields = [];
    this.titleField = "";
  }
}
