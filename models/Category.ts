export interface Field {
  fieldId: string;
  fieldName: string;
  fieldType: string;
  fieldValue?: string;
}

export class MachineCategory {
  categoryId: string;
  categoryName: string;
  categoryFields: Field[];

  constructor(categoryId: string, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryFields = [];
  }
}
