const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('.ad-form #price');
const typesField = document.querySelector('.ad-form #type');

priceField.value = 50000;

noUiSlider.create(sliderElement, {
  range: {
    min: 1000,
    max: 100000,
  },
  start: 50000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (...rest) => {
  priceField.value = sliderElement.noUiSlider.get();
});

const setMinPrice = (min) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: 100000,
    }
  });
};

typesField.addEventListener('change', () => {
  switch(typesField.value) {
    case 'bungalow':
      setMinPrice(0);
      break;
    case 'flat':
      setMinPrice(1000);
      break;
    case 'hotel':
      setMinPrice(3000);
      break;
    case 'house':
      setMinPrice(5000);
      break;
    case 'palace':
      setMinPrice(10000);
      break;
    default:
      setMinPrice(0);
      break;
  }
});
