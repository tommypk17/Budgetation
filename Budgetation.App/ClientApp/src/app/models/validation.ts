export interface iValidator {
  validationFields: iValidationField[];

  isObjectValid(): boolean;

  validObjectFields(): FieldValidationMessage[];

  invalidObjectFields(): FieldValidationMessage[];
}

export interface iValidationField {
  fieldName: string;
  validationTypes: eValidationType[];
}

export class Validator implements iValidator {

  constructor(validationFields?: iValidationField[]) {
    if (validationFields) this.validationFields = validationFields;
    else this.validationFields = null;
  }

  validationFields: iValidationField[];

  private validFields: FieldValidationMessage[] = [];
  private invalidFields: FieldValidationMessage[] = [];

  asPayload(): any {
    let payload = Object.assign({}, this);
    delete payload.validFields;
    delete payload.invalidFields;
    delete payload.validationFields;
    return payload;
  }

  isObjectValid(): boolean {
    let res: boolean = true;
    if (this.validationFields){
     // console.log(this.validationFields)
     for (let validationField of this.validationFields){
       if(!this.isValid(validationField.fieldName, validationField.validationTypes)){
         //track which fields failed validation
         if (!this.invalidFields.find(x => x.fieldName == validationField.fieldName)){
           let message: FieldValidationMessage = new FieldValidationMessage();
           message.fieldName = validationField.fieldName;
           message.messages = Validator.getValidationMessages(validationField);
           this.invalidFields.push(message);
         }
         //remove which fields were valid but now failed
         let prevValidIdx = this.validFields.findIndex(x => x.fieldName == validationField.fieldName);
         if (prevValidIdx > -1){
           this.validFields.splice(prevValidIdx, 1);
         }
         //Set result to false indicate error in object
         res = false;
       }else{
         //track which fields passed validation
         if (!this.validFields.find(x => x.fieldName == validationField.fieldName)){
           let message: FieldValidationMessage = new FieldValidationMessage();
           message.fieldName = validationField.fieldName;
           message.messages = Validator.getValidationMessages(validationField);
           this.validFields.push(message);
         }
         //remove which fields were invalid but now passed
         let prevInvalidIdx = this.invalidFields.findIndex(x => x.fieldName == validationField.fieldName);
         if (prevInvalidIdx > -1){
           this.invalidFields.splice(prevInvalidIdx, 1);
         }
       }
     }
    }else {
      return res;
    }
    return res;
  }

  private isValid(fieldName: string, types: eValidationType[]){
    let res = false;
    for (let type of types) {
      switch (type){
        case eValidationType.isEmpty:
          if (this[fieldName] == "") res = true;
          else return false;
          break;
        case eValidationType.isNotEmpty:
          if (this[fieldName] != "") res = true;
          else return false;
          break;
        case eValidationType.isNotNull:
          if (this[fieldName] != null) res = true;
          else return false;
          break;
        case eValidationType.isDate:
            if(this[fieldName]){
              let tempDate: Date = new Date(this[fieldName]);
              if(tempDate > new Date(null)){
                res = true;
              }else{
                return false;
              }
            }else{
              if(types.includes(eValidationType.isNotRequired)){
                res = true;
              }else{
                return false;
              }
            }
          break;
      }
    }
    return res;
  }

  protected static getValidationMessages(validationField: iValidationField): ValidationMessage[]{
    let res: ValidationMessage[] = [];
    validationField.validationTypes.forEach((v, i, a) => {
      let message = Validator.getMessage(v);
      let type = v;
      let tempRes: ValidationMessage = new ValidationMessage(message, type);
      res.push(tempRes);
    })
    return res;
  }

  public static getMessage(type: eValidationType){
    switch (type){
      case eValidationType.isNotEmpty:
        return "cannot be empty";
      case eValidationType.isEmpty:
        return "can be empty";
      case eValidationType.isNotNull:
        return "is required";
      case eValidationType.isNull:
        return "is not required";
      case eValidationType.isAlphaNumeric:
        return "must be alphanumeric";
      case eValidationType.isDate:
        return "must be a date";
      case eValidationType.isNumber:
        return "must be a number";
      case eValidationType.isAlpha:
        return "must be alpha only";
      case eValidationType.isNaN:
        return "must be not a number";
      case eValidationType.isBoolean:
        return "must be true or false";
      case eValidationType.isNotRequired:
        return "can be empty";
      default:
        return "not a validation type";
    }
  }

  validObjectFields(): FieldValidationMessage[] {
    return this.validFields;
  }

  invalidObjectFields(): FieldValidationMessage[] {
    return this.invalidFields;
  }
}

export enum eValidationType {
  isNull,
  isNotNull,
  isEmpty,
  isNotEmpty,
  isNumber,
  isNaN,
  isAlpha,
  isAlphaNumeric,
  isBoolean,
  isDate,
  isNotRequired,
}

export class FieldValidationMessage {
  fieldName: string;
  messages: ValidationMessage[];
}

export class ValidationMessage {
  message: string;
  type: eValidationType;

  constructor(message?: string, type?: eValidationType) {
    this.message = message? message: null;
    this.type = type? type: null;
  }
}
