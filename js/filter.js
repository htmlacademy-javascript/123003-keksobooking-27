const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');
const filterSelects = filterForm.querySelectorAll('select');
const filterCheckboxes = filterForm.querySelectorAll('input[type="checkbox"]');

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
  filterSelects.forEach((select) => {
    const filterOptions = select.querySelectorAll('option');
    filterOptions.forEach((option) => {
      if(option.selected){
        option.selected = false;
      }
    });
  });
  filterCheckboxes.forEach((checkbox) => {
    if(checkbox.checked){
      checkbox.checked = false;
    }
  });
};

export {deactivateFilterForm, activateFilterForm ,resetFilterForm};
