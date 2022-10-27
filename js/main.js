import { renderCards } from './map.js';
import { createSimilarAdverts } from './data.js';
import {deactivateAdvertForm, activateAdvertForm} from './form.js';
import {deactivateFilterForm, activateFilterForm} from './filter.js';
const adverts = createSimilarAdverts();

renderCards(adverts);

deactivateAdvertForm();
activateAdvertForm();
deactivateFilterForm();
activateFilterForm();


