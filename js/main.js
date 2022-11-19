import { setAdvertFormSubmit, activateAdvertForm, deactivateAdvertForm, resetAdvertForm, setAdvertFormResetHandler } from './form.js';
import { activateFilterForm, deactivateFilterForm, resetFilterForm, addOnFilter, getFilteredAdverts } from './filter.js';
import { initMap, createMapAdverts, setOnMapLoad, resetMap, changeAdvertGroup } from './map.js';
import { showSuccessMessage, showAlert } from './message.js';
import { getData } from './network.js';
import { debounce } from './utils.js';

const ADVERTS_COUNT = 10;
const InitialCoordinate = {
  lat: 35.63714,
  lng: 139.79765,
};

let adverts = [];

const initPage = () => {
  deactivateAdvertForm();
  deactivateFilterForm();
  initMap(InitialCoordinate);
  getData((data) => {
    if (data.length === 0) {
      return;
    }

    adverts = data;
    createMapAdverts(adverts.slice(0, ADVERTS_COUNT));

    activateFilterForm();

    const debounceFilterAdverts = debounce(() => {
      changeAdvertGroup(getFilteredAdverts(adverts, ADVERTS_COUNT));
    });

    addOnFilter(debounceFilterAdverts);
  }, showAlert);
};

const resetPage = () => {
  resetAdvertForm();
  resetFilterForm();
  resetMap(InitialCoordinate);

  createMapAdverts(adverts.slice(0, ADVERTS_COUNT));
};

setOnMapLoad(() => {
  activateAdvertForm();
});

setAdvertFormSubmit(() => {
  showSuccessMessage();
  resetPage();
});

setAdvertFormResetHandler(() => {
  resetPage();
});

initPage();
