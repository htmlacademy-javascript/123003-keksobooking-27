import { activateAdvertForm, deactivateAdvertForm } from './form.js';
import { activateFilterForm, deactivateFilterForm } from './filter.js';
import { createSimilarAdverts } from './data.js';
import { createCard } from './create-card.js';
import { resetFilterForm } from './filter.js';

const mapContainer = document.querySelector('#map-canvas');
const resetButton = document.querySelector('.ad-form__reset');
const adverts = createSimilarAdverts();
const addressField = document.querySelector('#address');
const INITIAL_LAT = 35.63714;
const INITIAL_LNG = 139.79765;
const INITIAL_SCALE = 12;

deactivateAdvertForm();
deactivateFilterForm();

const map = L.map(mapContainer)
  .on('load', () => {
    activateAdvertForm();
    activateFilterForm();
  })
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, INITIAL_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const MAIN_PIN_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const OTHER_PIN_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const targetLocation = evt.target.getLatLng();
  addressField.value = `${targetLocation.lat.toFixed(5)}, ${targetLocation.lng.toFixed(5)}`;
});

adverts.forEach((advert) => {
  const otherPinMarker = L.marker(
    {
      lat:advert.location.lat,
      lng:advert.location.lng,
    },
    {
      icon: OTHER_PIN_ICON,
    },
  );
  otherPinMarker
    .addTo(map)
    .bindPopup(createCard(advert));
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  });
  map.setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, INITIAL_SCALE);
  map.closePopup();
  resetFilterForm();
});

