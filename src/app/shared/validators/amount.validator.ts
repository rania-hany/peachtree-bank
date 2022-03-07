import { AbstractControl, ValidatorFn } from '@angular/forms';

export function amount(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return { msg: 'This Field is required.' };
    }    else if (isNaN(control.value)) {
      return { msg: 'Numbers only allowed' };
    } else if (control.value < 0) {
      return { msg: 'Negative numbers are not allowed' };
    } else if (control.value < 500) {
      return { msg: 'amount below -€500 not allowed' };
    } else {
      return null;
    }
  };
}
