import {createCard} from './create-card.js';

const mapContainer = document.querySelector('#map-canvas');

const renderCards = (adverts) => {
  // const cards = adverts.map(createCard);
  // mapContainer.append(...cards);
  const card1 = createCard(adverts[0]);
  mapContainer.appendChild(card1);
};


export {
  renderCards
};
