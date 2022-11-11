import { activateSlider, deactivateSlider, resetSlider, initSlider } from './slider.js';
import { showErrorMessage } from './message.js';
import { sendData } from './network.js';
import { setDisabled, unsetDisabled } from './utils.js';

const advertForm = document.querySelector('.ad-form');
const advertFields = advertForm.querySelectorAll('fieldset');
const roomsField = advertForm.querySelector('#room_number');
const roomsFields = roomsField.querySelectorAll('option');
const guestsField = advertForm.querySelector('#capacity');
const guestsFields = guestsField.querySelectorAll('option');
const typesField = advertForm.querySelector('#type');
const priceField = advertForm.querySelector('#price');
const timeinField = advertForm.querySelector('#timein');
const timeinFields = timeinField.querySelectorAll('option');
const timeoutField = advertForm.querySelector('#timeout');
const timeoutFields = timeoutField.querySelectorAll('option');
const submitButton = advertForm.querySelector('.ad-form__submit');

const InitialPrice = {
  MIN: 0,
  MAX: 100000,
};

const guestsToRooms = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const pricesToTypes = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const INITIAL_SLIDER_OPTIONS = {
  start: InitialPrice.MIN,
  range: {
    min: InitialPrice.MIN,
    max: InitialPrice.MAX,
  }
};

const deactivateAdvertForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFields.forEach(setDisabled);
  deactivateSlider();
};

const activateAdvertForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFields.forEach(unsetDisabled);
  activateSlider();
};

const resetAdvertForm = () => {
  advertForm.reset();
  resetSlider();
};

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const validateRooms = () => guestsToRooms[roomsField.value].includes(guestsField.value);

const validateMinPrice = (value) => value >= pricesToTypes[typesField.value];

const onRoomsChange = () => {
  pristine.validate(roomsField);
};

const onTypesChange = () => {
  const value = pricesToTypes[typesField.value];
  priceField.min = value;
  pristine.validate(priceField);
};

const onTimeinChange = () => {
  const fieldSelected = timeinField.value;
  Array.from(timeoutFields).find((option)=>option.value === fieldSelected).selected = true;
};

const onTimeoutChange = () => {
  const fieldSelected = timeoutField.value;
  Array.from(timeinFields).find((option)=>option.value === fieldSelected).selected = true;
};

const onPriceInput = () => {
  priceField.value = priceField.value.replace(/\./g, '');
};

const getRoomsErrorMessage = () => {
  const guestsText = Array.from(guestsFields).find((option)=>option.value === guestsField.value).textContent;
  let roomsText = Array.from(roomsFields).find((option)=>option.value === roomsField.value).textContent;
  if(roomsText === '1 комната'){
    roomsText = '1 комнату';
  }
  return `Невозможно забронировать ${roomsText} ${guestsText}`;
};

const getMinPriceErrorMessage = () => `Минимальное значение -  ${pricesToTypes[typesField.value]}`;

roomsField.addEventListener('change', onRoomsChange);
guestsField.addEventListener('change', onRoomsChange);
typesField.addEventListener('change', onTypesChange);
timeinField.addEventListener('change', onTimeinChange);
timeoutField.addEventListener('change', onTimeoutChange);
priceField.addEventListener('input', onPriceInput);

pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
pristine.addValidator(guestsField, validateRooms);
pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

priceField.value = InitialPrice.MIN;

initSlider({
  ...INITIAL_SLIDER_OPTIONS,
  onUpdate: (volume) => {
    priceField.value = volume;
    pristine.validate(priceField);
  }
});

let handlerFormReset = null;

const setAdvertFormResetHandler = (cb) => {
  handlerFormReset = cb;
};

advertForm.addEventListener('reset', () => {
  handlerFormReset?.();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setAdvertFormSubmit = (onSuccess) => {
  advertForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      try {
        const response = await sendData(new FormData(evt.target));
        if (response.ok) {
          onSuccess();
        } else {
          showErrorMessage();
        }
      } catch (err) {
        showErrorMessage();
      } finally {
        unblockSubmitButton();
      }
    }
  });
};


export { deactivateAdvertForm, activateAdvertForm, setAdvertFormSubmit, resetAdvertForm, setAdvertFormResetHandler };
