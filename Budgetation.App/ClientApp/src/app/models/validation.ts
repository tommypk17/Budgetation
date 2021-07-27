export interface iValidator {
  validationFields: iValidationField[];

  isObjectValid(): boolean;

  validObjectFields(): cFieldValidationMessage[];

  invalidObjectFields(): cFieldValidationMessage[];
}

export interface iValidationField {
  fieldName: string;
  fieldValue: any;
  validationTypes: eValidationType[];
}

export class cValidator implements iValidator {

  constructor(validationFields?: iValidationField[]) {
    if (validationFields) this.validationFields = validationFields;
    else this.validationFields = null;
  }

  validationFields: iValidationField[];

  private validFields: cFieldValidationMessage[] = [];
  private invalidFields: cFieldValidationMessage[] = [];

  isObjectValid(): boolean {
    let res: boolean = true;
    if (this.validationFields){
     //console.log(this.validationFields)
     for (let validationField of this.validationFields){
       if(!cValidator.isValid(validationField.fieldValue, validationField.validationTypes)){
         //track which fields failed validation
         if (!this.invalidFields.find(x => x.fieldName == validationField.fieldName)){
           let message: cFieldValidationMessage = new cFieldValidationMessage();
           message.fieldName = validationField.fieldName;
           message.messages = cValidator.getValidationMessages(validationField);
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
           let message: cFieldValidationMessage = new cFieldValidationMessage();
           message.fieldName = validationField.fieldName;
           message.messages = cValidator.getValidationMessages(validationField);
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

  private static isValid(value: any, types: eValidationType[]){
    let res = false;
    for (let type of types) {
      switch (type){
        case eValidationType.isEmpty:
          if (value == "") res = true;
          else return false;
          break;
        case eValidationType.isNotEmpty:
          if (value != "") res = true;
          else return false;
          break;
        case eValidationType.isNotNull:
          if (value != null) res = true;
          else return false;
          break;
        case eValidationType.isDate:
            if(value){
              let tempDate: Date = new Date(value);
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

  protected static getValidationMessages(validationField: iValidationField): cValidationMessage[]{
    let res: cValidationMessage[] = [];
    validationField.validationTypes.forEach((v, i, a) => {
      let message = cValidator.getMessage(v);
      let type = v;
      let tempRes: cValidationMessage = new cValidationMessage(message, type);
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

  validObjectFields(): cFieldValidationMessage[] {
    return this.validFields;
  }

  invalidObjectFields(): cFieldValidationMessage[] {
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

export class cFieldValidationMessage {
  fieldName: string;
  messages: cValidationMessage[];
}

export class cValidationMessage {
  message: string;
  type: eValidationType;

  constructor(message?: string, type?: eValidationType) {
    this.message = message? message: null;
    this.type = type? type: null;
  }
}
