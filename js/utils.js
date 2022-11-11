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

export { setDisabled, unsetDisabled, isEscKey, removeElement };
