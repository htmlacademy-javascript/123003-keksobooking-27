const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('.ad-form #price');
const typesField = document.querySelector('.ad-form #type');
const resetButton = document.querySelector('.ad-form__reset');
const pricesToTypes = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const INITIAL_MIN_PRICE = 0;
const INITIAL_MAX_PRICE = 100000;

priceField.value = pricesToTypes[typesField.value];

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: INITIAL_MIN_PRICE,
      max: INITIAL_MAX_PRICE,
    },
    start: INITIAL_MIN_PRICE,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return parseInt(value, 10);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: pricesToTypes[typesField.value],
      max: INITIAL_MAX_PRICE,
    },
    start: pricesToTypes[typesField.value],
  });
};

typesField.addEventListener('change', updateSlider);

resetButton.addEventListener('click', ()=>{
  slider.noUiSlider.updateOptions({
    range: {
      min: INITIAL_MIN_PRICE,
      max: INITIAL_MAX_PRICE,
    },
    start: INITIAL_MIN_PRICE,
  });
});

createSlider();

slider.noUiSlider.on('update', () => {
  priceField.value = slider.noUiSlider.get();
});
