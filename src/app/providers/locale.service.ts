import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {
private locales:object = {};

  constructor(){
    this.locales["APP_NAME"] = 'The Scanner';
    this.locales["APP_EXIT_MESSAGE"] = "Do you want Exit?";
    this.locales["APP_EXIT_TITLE"] = "Confirm Exit";
    this.locales["SOMETHING_WRONG"] = "Something went wrong!";
    this.locales["FAILED"] = "Failed";

    this.locales["THANK_YOU_SIGNUP"] = "Thank you!";

    this.locales["ITEM_ALREADY_SCANNED"] = (itemName:string)=>{
        return `Item '${itemName}' already scanned, you want to increase quantity by one?`;
    };
    this.locales["ARE_U_SURE"] = "Are you sure?";
    
    
  }

  get(label:string):string{
    var localeText = "No Locale Text";
      localeText = this.locales[label] || localeText;
      return localeText;
  }

  getFormatStringFunction(label:string):Function{
    var localeFunc = ()=>{return 'No Locale Text';};
    localeFunc = this.locales[label] || localeFunc;
    return localeFunc;
  }
}