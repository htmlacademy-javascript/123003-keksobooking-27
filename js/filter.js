const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');

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

export {deactivateFilterForm, activateFilterForm};
