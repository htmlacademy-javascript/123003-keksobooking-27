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

export { deactivateAdvertForm, activateAdvertForm };
