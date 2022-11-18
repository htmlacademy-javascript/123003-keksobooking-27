const setDisabled = (element) => {
  element.disabled = true;
};

const unsetDisabled = (element) => {
  element.disabled = false;
};

const removeElement = (element) => {
  element.remove();
};

const isEscKey = (evt) => evt.key === 'Escape';

const isValidImageType = (file, types) => {
  const fileName = file.name.toLowerCase();
  const matches = types.some((type) => fileName.endsWith(type));
  return matches;
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId = 0;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeoutDelay, ...rest);
  };
};

export { setDisabled, unsetDisabled, isEscKey, removeElement, isValidImageType, debounce };
