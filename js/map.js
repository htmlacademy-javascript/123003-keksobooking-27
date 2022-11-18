import { createCard } from './create-card.js';

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
const INITIAL_SCALE = 12;
const mapContainer = document.querySelector('#map-canvas');
const addressField = document.querySelector('#address');
const map = L.map(mapContainer);

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const initMap = ((coordinate) => {
  map.setView(coordinate, INITIAL_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const targetLocation = evt.target.getLatLng();
    addressField.value = `${targetLocation.lat.toFixed(5)}, ${targetLocation.lng.toFixed(5)}`;
  });
});

const markerGroup = L.layerGroup().addTo(map);

const createMapAdverts = (adverts) => {
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
      .addTo(markerGroup)
      .bindPopup(createCard(advert));
  });
};

const changeAdvertGroup = (adverts) => {
  markerGroup.clearLayers();
  createMapAdverts(adverts);
};

const resetMap = (coordinate) => {
  mainPinMarker.setLatLng(coordinate);
  map.setView(coordinate, INITIAL_SCALE);
  map.closePopup();
};

export { initMap, createMapAdverts, setOnMapLoad, resetMap, changeAdvertGroup };
