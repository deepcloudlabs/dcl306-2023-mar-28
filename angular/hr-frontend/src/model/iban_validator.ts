import {AbstractControl, ValidatorFn} from "@angular/forms";

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!isIbanValid(control.value)) {
      return {iban: true};
    }
    return null;
  };
}

function isIbanValid(value: string): boolean {
  if (value == null) return false;
  if (value == undefined || value.length < 5) {
    return false;
  }
  let modulusResult = calculateModulus(value);
  if (modulusResult != 1) {
    return false;
  }
  return true;
}

function calculateModulus(code: string) {
  let reformattedCode: string = code.substring(4) + code.substring(0, 4);
  reformattedCode = reformattedCode.replace(/[A-Z]/g, match => (match.charCodeAt(0) - 55).toString());
  var total = 0;
  for (let i = 0; i < reformattedCode.length; i++) {
    let charValue = reformattedCode.charCodeAt(i) - 48;
    if (charValue < 0 || charValue > 35) {
      return 0;
    }
    total = (Number(charValue) > 9 ? total * 100 : total * 10) + charValue;
    if (total < 999999999) {
      total = (total % 97);
    }
  }
  return total % 97;
};
