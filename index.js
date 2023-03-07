import validator from './validator.js';

const validateBtn = document.getElementById("validateButton");
const clearBtn = document.getElementById("clearButton");
const cardNumber = document.getElementById("numberCard");
const labelCard = document.getElementById("labelCard");
const typeCard = document.getElementById("typeCard");

clearBtn.addEventListener('click', () => {
  cardNumber.value = "";
})

cardNumber.addEventListener('keypress', (e) => {
  validateBtn.disabled = cardNumber.value !== '' ? false : true;
  if (!onlyNumbers(e)) e.preventDefault();
})

cardNumber.addEventListener('paste', (e) => {
  const characters = e.target.value;
  window.setTimeout(() => {
    if(!(/^\d+$/.test(characters))){
      e.target.value = e.target.value.replace(/\D/g, '');
      validateBtn.disabled = e.target.value === '' ? true : false; 
    }
  });
})

function onlyNumbers(e) {
  const key = e.charCode;
  return key >= 48 && key <= 57;
}

validateBtn.addEventListener('click', () => {
  const numbers = cardNumber.value;
  const validation = validator.isValid(numbers);
  const maskifiedNumbers = validator.maskify(numbers);
  cardNumber.value = maskifiedNumbers;

  if(validation){
    labelCard.innerHTML =  "El número de tarjeta ingresado es <b>¡Válido!</b>";
    typeCard.style.display = 'block';
    const cardType = validator.getCardType(numbers);
    typeCard.innerHTML = 'Y es de tipo: <img src="./img/' + cardType + '.png" />';
  } else {
    labelCard.innerHTML =  "El número de tarjeta ingresado es  <b>¡Inválido!</b>";
  }
})

validateBtn.disabled = true;
typeCard.style.display = 'none';