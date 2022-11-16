import { setAdvertFormSubmit, activateAdvertForm, deactivateAdvertForm, resetAdvertForm, setAdvertFormResetHandler } from './form.js';
import { activateFilterForm, deactivateFilterForm, resetFilterForm, setOnFilter, getFilteredAdverts, ADVERTS_COUNT } from './filter.js';
import { initMap, createMapAdverts, INITIAL_COORDINATE, setOnMapLoad, resetMap, changeAdvertGroup } from './map.js';
import { showSuccessMessage, showAlert } from './message.js';
import { getData } from './network.js';
import './photo.js';

const initPage = () => {
  deactivateAdvertForm();
  deactivateFilterForm();
  initMap(INITIAL_COORDINATE);
};

const resetPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMap();
};

setOnMapLoad(() => {
  activateAdvertForm();
});

getData((adverts) => {
  createMapAdverts(adverts.slice(0, ADVERTS_COUNT));
  activateFilterForm();
  setOnFilter(()=>{
    changeAdvertGroup(getFilteredAdverts(adverts));
  });
}, showAlert);


setAdvertFormSubmit(() => {
  showSuccessMessage();
  resetPage();
});

setAdvertFormResetHandler(() => {
  resetPage();
});

initPage();
