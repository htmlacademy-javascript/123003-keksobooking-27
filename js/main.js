import { setAdvertFormSubmit, activateAdvertForm, deactivateAdvertForm, resetAdvertForm, setAdvertFormResetHandler } from './form.js';
import { activateFilterForm, deactivateFilterForm, resetFilterForm } from './filter.js';
import { initMap, createMapAdverts, INITIAL_COORDINATE, setOnMapLoad, resetMap } from './map.js';
import { showSuccessMessage, showAlert } from './message.js';
import { getData } from './network.js';

const NEARBY_ADVERTS_COUNT = 10;

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
  createMapAdverts(adverts.slice(0, NEARBY_ADVERTS_COUNT));
  activateFilterForm();
}, showAlert);

setAdvertFormSubmit(() => {
  showSuccessMessage();
  resetPage();
});

setAdvertFormResetHandler(() => {
  resetPage();
});

initPage();
