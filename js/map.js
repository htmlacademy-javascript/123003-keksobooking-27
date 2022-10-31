import { activateAdvertForm, deactivateAdvertForm } from './form.js';
import { activateFilterForm, deactivateFilterForm } from './filter.js';
import { createSimilarAdverts } from './data.js';
import { createCard } from './create-card.js';

const mapContainer = document.querySelector('#map-canvas');
const resetButton = document.querySelector('.ad-form__reset');
const adverts = createSimilarAdverts();
const addressField = document.querySelector('#address');

deactivateAdvertForm();
deactivateFilterForm();

const map = L.map(mapContainer)
  .on('load', () => {
    activateAdvertForm();
    activateFilterForm();
  })
  .setView({
    lat: 35.63714,
    lng: 139.79765,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const otherPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.63714,
    lng: 139.79765,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

adverts.forEach((advert) => {
  const otherPinMarker = L.marker(
    {
      lat:advert.location.lat,
      lng:advert.location.lng,
    },
    {
      icon: otherPinIcon,
    },
  );
  otherPinMarker
    .addTo(map)
    .bindPopup(createCard(advert));
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.63714,
    lng: 139.79765,
  });
  map.setView({
    lat: 35.63714,
    lng: 139.79765,
  }, 12);
});
