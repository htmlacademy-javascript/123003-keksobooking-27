import { setDisabled, unsetDisabled } from './utils.js';

const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');

const deactivateFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFields.forEach(setDisabled);
};

const activateFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFields.forEach(unsetDisabled);
};

const resetFilterForm = () => {
  filterForm.reset();
};

export {deactivateFilterForm, activateFilterForm ,resetFilterForm};
