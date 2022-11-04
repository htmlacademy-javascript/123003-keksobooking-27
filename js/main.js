import { validateAdvertForm } from './form.js';
import { initSlider } from './slider.js';
import { activateAdvertForm, deactivateAdvertForm } from './form.js';
import { activateFilterForm, deactivateFilterForm } from './filter.js';
import { initMap, createMapAdverts, INITIAL_COORDINATE, setOnMapLoad } from './map.js';
import { createSimilarAdverts } from './data.js';

const adverts = createSimilarAdverts();
validateAdvertForm();

setOnMapLoad(()=>{
  createMapAdverts(adverts);
  activateAdvertForm();
  activateFilterForm();
  initSlider();
});

deactivateAdvertForm();
deactivateFilterForm();
initMap(INITIAL_COORDINATE);
