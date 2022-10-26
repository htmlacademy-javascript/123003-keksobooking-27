import { renderCards } from './map.js';
import { createSimilarAdverts } from './data.js';

const adverts = createSimilarAdverts();

renderCards(adverts);

