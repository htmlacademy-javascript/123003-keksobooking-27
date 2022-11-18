import { setDisabled, unsetDisabled } from './utils.js';

const PriceCategory = {
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high'
};
const FilterPrice = {
  MEDIUM: 10000,
  HIGH: 50000
};

const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');
const selectedType = filterForm.querySelector('#housing-type');
const selectedPrice = filterForm.querySelector('#housing-price');
const selectedRooms = filterForm.querySelector('#housing-rooms');
const selectedGuests = filterForm.querySelector('#housing-guests');

const deactivateFilterForm = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFields.forEach(setDisabled);
};

const activateFilterForm = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFields.forEach(unsetDisabled);
};

const resetFilterForm = () => {
  filterForm.reset();
};

const checkType = (advert, select) => select === 'any' || select === advert.offer.type;

const checkGuests = (advert, select) => select === 'any' || +select === advert.offer.guests;

const checkRooms = (advert, select) => select === 'any' || +select === advert.offer.rooms;

const checkPrice = (advert, select) => {
  switch (select) {
    case PriceCategory.MIDDLE:
      return (advert.offer.price >= FilterPrice.MEDIUM && advert.offer.price < FilterPrice.HIGH);
    case PriceCategory.LOW:
      return advert.offer.price < FilterPrice.MEDIUM;
    case PriceCategory.HIGH:
      return advert.offer.price >= FilterPrice.HIGH;
    default:
      return true;
  }
};

const checkFeatures = (advert, selectedFeatures) => {
  const { features = [] } = advert.offer;
  if (selectedFeatures.length === 0) {
    return true;
  }
  if (features === 0) {
    return false;
  }
  return selectedFeatures.every((feature) => features.includes(feature.value));
};

const getFilteredAdverts = (adverts, max = adverts.length) => {
  const filteredAdverts = [];
  const selectedFeatures = Array.from(filterForm.querySelectorAll('input:checked'));

  for (const advert of adverts) {
    if (
      checkType(advert, selectedType.value) &&
      checkGuests(advert, selectedGuests.value) &&
      checkRooms(advert, selectedRooms.value) &&
      checkPrice(advert, selectedPrice.value) &&
      checkFeatures(advert, selectedFeatures)) {
      filteredAdverts.push(advert);
      if (filteredAdverts.length === max) {
        break;
      }
    }
  }
  return filteredAdverts;
};


const addOnFilter = (cb) => {
  filterForm.addEventListener('change', cb);
};


export {deactivateFilterForm, activateFilterForm, resetFilterForm, addOnFilter, getFilteredAdverts};
