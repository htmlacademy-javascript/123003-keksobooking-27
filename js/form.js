const advertForm = document.querySelector('.ad-form');
const advertFields = advertForm.querySelectorAll('fieldset');
const priceSlider = advertForm.querySelector('.ad-form__slider');
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

const deactivateAdvertForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFields.forEach((field) => {
    field.disabled = true;
  });
  priceSlider.classList.add('ad-form__slider--disabled');
};

const activateAdvertForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFields.forEach((field) => {
    field.disabled = false;
  });
  priceSlider.classList.remove('ad-form__slider--disabled');
};

const validateAdvertForm = () => {
  const pristine = new Pristine(advertForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  });

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

  const validateRooms = () => guestsToRooms[roomsField.value].includes(guestsField.value);

  const validateMinPrice = (value) => value >= pricesToTypes[typesField.value];

  const onRoomsChange = () => {
    pristine.validate(roomsField);
  };

  const onTypesChange = () => {
    const value = pricesToTypes[typesField.value];
    priceField.min = value;
    priceField.placeholder = value;
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

  pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(guestsField, validateRooms);
  pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      //console.log('Можно отправлять');
    }
    else{
      //console.log(pristine.getErrors());
    }
  });
};

export { deactivateAdvertForm, activateAdvertForm, validateAdvertForm};
