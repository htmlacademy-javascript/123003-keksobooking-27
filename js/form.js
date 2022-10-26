const advertForm = document.querySelector('.ad-form');
const advertFields = advertForm.querySelectorAll('fieldset');
const priceSlider = advertForm.querySelector('.ad-form__slider');
const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');

const deactivateForms = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFields.forEach((field) => {
    field.setAttribute('disabled', true);
  });
  priceSlider.classList.add('ad-form__slider--disabled');
  filterForm.classList.add('map__filters--disabled');
  filterFields.forEach((field) => {
    field.setAttribute('disabled', true);
  });
};

const activateForms = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFields.forEach((field) => {
    field.removeAttribute('disabled', true);
  });
  priceSlider.classList.remove('ad-form__slider--disabled');
  filterForm.classList.remove('map__filters--disabled');
  filterFields.forEach((field) => {
    field.removeAttribute('disabled', true);
  });
};


export { deactivateForms, activateForms };
