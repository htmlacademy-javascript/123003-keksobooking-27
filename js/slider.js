const INITIAL_MIN_PRICE = 0;
const INITIAL_MAX_PRICE = 100000;
const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('.ad-form #price');
const resetButton = document.querySelector('.ad-form__reset');

priceField.value = INITIAL_MIN_PRICE;

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: INITIAL_MIN_PRICE,
      max: INITIAL_MAX_PRICE,
    },
    start: INITIAL_MIN_PRICE,
    step: 1,
    connect: 'lower',
    format: {
      to(value) {
        return parseInt(value, 10);
      },
      from(value) {
        return parseFloat(value);
      },
    },
  });
  slider.noUiSlider.on('update', () => {
    priceField.value = slider.noUiSlider.get();
  });
};

const deactivateSlider = () => {
  slider.classList.add('ad-form__slider--disabled');
  /* подобная блокировка слайдера взята из документации библиотеки noUiSlider */
  slider.setAttribute('disabled', true);
};

const activateSlider = () => {
  slider.classList.remove('ad-form__slider--disabled');
  slider.removeAttribute('disabled');
};

const onResetButtonClick = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: INITIAL_MIN_PRICE,
      max: INITIAL_MAX_PRICE,
    },
    start: INITIAL_MIN_PRICE,
  });
};

resetButton.addEventListener('click', onResetButtonClick);

export { initSlider, deactivateSlider, activateSlider };
