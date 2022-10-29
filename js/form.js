const advertForm = document.querySelector('.ad-form');
const advertFields = advertForm.querySelectorAll('fieldset');
const priceSlider = advertForm.querySelector('.ad-form__slider');

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

  const roomsField = advertForm.querySelector('#room_number');
  const guestsField = advertForm.querySelector('#capacity');

  const roomsOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  const validateRooms = () => roomsOption[roomsField.value].includes(guestsField.value);

  const onRoomsChange = () => {
    pristine.validate(roomsField);
  };

  const getRoomsErrorMessage = () => {
    const guestsText = Array.from(guestsField.querySelectorAll('option')).find((option)=>option.value === guestsField.value).textContent;
    let roomsText = Array.from(roomsField.querySelectorAll('option')).find((option)=>option.value === roomsField.value).textContent;
    if(roomsText === '1 комната'){
      roomsText = '1 комнату';
    }
    return `Невозможно забронировать ${roomsText} ${guestsText}`;
  };

  roomsField.addEventListener('change', onRoomsChange);
  guestsField.addEventListener('change', onRoomsChange);

  pristine.addValidator(roomsField, validateRooms, getRoomsErrorMessage);

  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      console.log('Можно отправлять');
    }
    else{
      console.log(pristine.getErrors());
    }
  });
};

export { deactivateAdvertForm, activateAdvertForm, validateAdvertForm };
