const validator = {
  // ...
  isValid(cardNumber){
    const arrayNumber = cardNumber.toString().split('').reverse();
    let result = 0;

    if(cardNumber.length > 10){
      for (let i = 1; i < arrayNumber.length; i+=2) {
        let number = arrayNumber[i];
        number = number * 2;
        if (number >= 10) {
          const arraySum = number.toString().split('');
          number = parseInt(arraySum[0]) + parseInt(arraySum[1]);
        }
        arrayNumber[i] = number;
      } 

      for (let i = 0; i < arrayNumber.length; i++) {
        result = result + parseInt(arrayNumber[i]);
      }

      if (result % 10 === 0) {
        return true;  
      }
    }

    return false
  },

  maskify(cardNumber) {
    const arrayNumber = cardNumber.toString().split('');
    for (let i = 0; i < arrayNumber.length-4 ; i++) {
      arrayNumber[i] = "#";
    }
    return arrayNumber.join('');
  },

  getCardType(cardNumber) {
    const type = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    }

    for(const key in type) {
      if(type[key].test(cardNumber)) {
        return key
      }
    }
  }

};

export default validator;