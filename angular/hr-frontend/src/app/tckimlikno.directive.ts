import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {tcKimlikNoValidator} from "../model/tckimlikno_validator";

@Directive({
  selector: '[tckimlikno]',
  providers: [{provide : NG_VALIDATORS, useExisting: TckimliknoDirective, multi:true}]
})
export class TckimliknoDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return tcKimlikNoValidator()(control);
  }

}
