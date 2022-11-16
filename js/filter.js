import { setDisabled, unsetDisabled, debounce } from './utils.js';

const ADVERTS_COUNT = 10;
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
const filteredAdverts = [];

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

const checkType = (advert, select) => !!(select === advert.offer.type || select === 'any');

const checkGuests = (advert, select) => !!((+select === advert.offer.guests || select === 'any'));

const checkRooms = (advert, select) => !!((+select === advert.offer.rooms || select === 'any'));

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

const checkFeatures = (advert, features) => {
  if(!features.length){
    return true;
  }
  if(!advert.offer.features){
    return false;
  }
  features.every((feature)=> advert.offer.features.includes(feature.value));
};

const getFilteredAdverts = (adverts) => {
  const selectedFeatures = Array.from(filterForm.querySelectorAll('input:checked'));

  for(const advert of adverts){
    if(
      checkType(advert, selectedType.value) &&
      checkGuests(advert, selectedGuests.value) &&
      checkRooms(advert, selectedRooms.value) &&
      checkPrice(advert, selectedPrice.value) &&
      checkFeatures(advert, selectedFeatures)){
      filteredAdverts.push(advert);
      if(filteredAdverts.length === ADVERTS_COUNT){
        break;
      }
    }
  }
  return filteredAdverts;
};


const setOnFilter = (cb) =>{
  filterForm.addEventListener('change', debounce(cb));
};


export {deactivateFilterForm, activateFilterForm, resetFilterForm, setOnFilter, getFilteredAdverts, ADVERTS_COUNT};
