
import * as moment_ from 'moment';
import { from } from 'rxjs';
export const moment =  moment_["default"];

  export const isValidateExpiryDate = (expiryDate) => {
    const fromNow =  moment(expiryDate, 'MM/YY').fromNow();

    console.log('fromNow', fromNow)

    return moment(expiryDate, "MM/YY", true).isValid();    
    return true;
  }

  export const  isValidatePhoneNumber = (phone) => {
    return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone);
}


export function validateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {

    // alert("Valid email address!");

    // document.form1.text1.focus();

    return true;

  } else {

    // alert("Invalid email address!");

    // document.form1.text1.focus();

    return false;

  }

}