import { FormGroup, FormControl } from '@angular/forms';

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        } else {
            passwordConfirmation.setErrors(null);
        }
    }
}

export function numeriqueValidator(control: FormControl): {[key: string]: any} {
    var numericRegix = /^[0-9]+$/;
    if(control.value && !numericRegix.test(control.value))
        return {invalidNumeric: true}

}
