import { renderCards } from './map.js';
import { createSimilarAdverts } from './data.js';
import { deactivateForms, activateForms } from './form.js';

const adverts = createSimilarAdverts();

renderCards(adverts);

deactivateForms();
activateForms();


