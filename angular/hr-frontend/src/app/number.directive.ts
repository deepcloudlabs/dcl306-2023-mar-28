import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[number]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberDirective, multi: true}]
})
export class NumberDirective implements Validator {
  @Input() min: number = Number.MIN_VALUE;
  @Input() max: number = Number.MAX_VALUE;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return rangeValidator(this)(control);
  }
}

function rangeValidator(params: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let errors: any = {};
    let value = Number(control.value);
    if (value < params.min) {
      errors.min = true;
    }
    if (value > params.max) {
      errors.max = true;
    }
    if (errors.hasOwnProperty('min') || errors.hasOwnProperty('max'))
      return errors;
    return null;
  };
}
