import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {ibanValidator} from "../model/iban_validator";


@Directive({
  selector: '[iban]',
  providers: [{provide : NG_VALIDATORS, useExisting: IbanDirective, multi:true}]
})
export class IbanDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return ibanValidator()(control);
  }
}
