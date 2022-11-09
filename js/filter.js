const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');
const resetButton = document.querySelector('.ad-form__reset');

const deactivateFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFields.forEach((field) => {
    field.disabled = true;
  });
};

const activateFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFields.forEach((field) => {
    field.disabled = false;
  });
};

const resetFilterForm = () => {
  filterForm.reset();
};

resetButton.addEventListener('click', resetFilterForm);

export {deactivateFilterForm, activateFilterForm ,resetFilterForm};
