import { setAdvertFormSubmit } from './form.js';
import { initSlider, resetSlider } from './slider.js';
import { activateAdvertForm, deactivateAdvertForm, resetAdvertForm } from './form.js';
import { activateFilterForm, deactivateFilterForm, resetFilterForm } from './filter.js';
import { initMap, createMapAdverts, INITIAL_COORDINATE, setOnMapLoad, resetMap } from './map.js';
import { showSuccessMessage } from './message.js';
import { getData } from './send-form.js';

const NEARBY_ADVERTS_COUNT = 10;

setOnMapLoad(() => {
  activateAdvertForm();
  activateFilterForm();
  initSlider();
});

const onFormSend = () => {
  resetSlider();
  resetAdvertForm();
  resetFilterForm();
  resetMap();
  showSuccessMessage();
};

deactivateAdvertForm();
deactivateFilterForm();
initMap(INITIAL_COORDINATE);

getData((adverts) => {
  createMapAdverts(adverts.slice(0, NEARBY_ADVERTS_COUNT));
});

setAdvertFormSubmit(onFormSend);
