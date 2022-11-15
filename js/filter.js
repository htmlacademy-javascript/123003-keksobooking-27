import { setDisabled, unsetDisabled, debounce } from './utils.js';

const ADVERTS_COUNT = 10;
const Price = {
  MEDIUM: 10000,
  HIGH: 50000
};

const filterForm = document.querySelector('.map__filters');
const filterFields = filterForm.querySelectorAll('.map__filter,.map__features');
const featureFields = filterForm.querySelectorAll('.map__checkbox');

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


const filterByType = (advert, select) => {
  if(select === advert.offer.type || select === 'any'){
    return true;
  }
};

const filterByGuests = (advert, select) => {
  if(+select === advert.offer.guests || select === 'any'){
    return true;
  }
};

const filterByRooms = (advert, select) => {
  if(+select === advert.offer.rooms || select === 'any'){
    return true;
  }
};

const filterByPrice = (advert, select) => {
  switch (select) {
    case 'any':
      return true;
    case 'middle':
      return (advert.offer.price >= Price.MEDIUM && advert.offer.price < Price.HIGH);
    case 'low':
      return advert.offer.price < Price.MEDIUM;
    case 'high':
      return advert.offer.price >= Price.HIGH;
  }
};

const filterByFeatures = (advert, features) => {
  if(!features.length){
    return true;
  }
  if(!advert.offer.features){
    return false;
  }
  return features.every((feature)=> advert.offer.features.includes(feature));
};

const getFilteredAdverts = (adverts) => {
  const filteredAdverts = [];
  const selectedFeatures = [];
  const selectedType = filterForm.querySelector('#housing-type').value;
  const selectedPrice = filterForm.querySelector('#housing-price').value;
  const selectedRooms = filterForm.querySelector('#housing-rooms').value;
  const selectedGuests = filterForm.querySelector('#housing-guests').value;

  featureFields.forEach((checkbox) => {
    if(checkbox.checked){
      selectedFeatures.push(checkbox.value);
    }
  });

  for(const advert of adverts){
    if(filteredAdverts.length >= ADVERTS_COUNT){
      break;
    }
    if(
      filterByType(advert, selectedType) &&
      filterByGuests(advert, selectedGuests) &&
      filterByRooms(advert, selectedRooms) &&
      filterByPrice(advert, selectedPrice) &&
      filterByFeatures(advert, selectedFeatures)){
      filteredAdverts.push(advert);
    }
  }
  return filteredAdverts;
};


const setOnFiltering = (cb) =>{
  filterFields.forEach((field)=>{
    field.addEventListener('change', debounce(cb));
  });
};


export {deactivateFilterForm, activateFilterForm, resetFilterForm, setOnFiltering, getFilteredAdverts};
