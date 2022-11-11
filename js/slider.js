const slider = document.querySelector('.ad-form__slider');

const initSlider = ({ onUpdate, ...options }) => {
  noUiSlider.create(slider, {
    connect: 'lower',
    step: 1,
    format: {
      to(value) {
        return Math.floor(value);
      },
      from(value) {
        return parseFloat(value);
      },
    },
    ...options,
  });

  slider.noUiSlider.on('update', () => {
    const volume = slider.noUiSlider.get(true);
    onUpdate?.(Math.floor(volume));
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

const resetSlider = () => {
  slider.noUiSlider.reset();
};


export { initSlider, deactivateSlider, activateSlider, resetSlider };
