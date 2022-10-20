import {createSimilarAdverts} from './data.js';

const popupAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');
const popupAdvertList = document.querySelector('#map-canvas');
const popupListFragment = document.createDocumentFragment();
const similarAdverts = createSimilarAdverts();

similarAdverts.forEach((advert)=>{
  const popupAdvertItem = popupAdvertTemplate.cloneNode(true);
  popupAdvertList.append(popupAdvertItem);
  const typesTranslation = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const checkingEmpty = (name, prefix = 'text--', desc = '') => {
    const fieldClass = `.popup__${prefix}${name}`;
    const fieldValue = advert.offer[name];
    if(!fieldValue){
      popupAdvertItem.querySelector(fieldClass).classList.add('hidden');
    } else {
      popupAdvertItem.querySelector(fieldClass).textContent = fieldValue + desc;
    }
  };

  popupAdvertItem.querySelector('.popup__type').textContent = typesTranslation[advert.offer.type];
  popupAdvertItem.querySelector('.popup__features').textContent = advert.offer.features;
  popupAdvertItem.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  popupAdvertItem.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  popupAdvertItem.querySelector('.popup__avatar').src = advert.author.avatar;

  const photoList = document.querySelector('.popup__photos');
  const photoFragment = document.createDocumentFragment();
  advert.offer.photos.forEach((photo)=>{
    const photoItem = document.querySelector('.popup__photo');
    const photoItemNew = photoItem.cloneNode();
    photoItemNew.src = photo;
    photoFragment.append(photoItemNew);
  });
  photoList.innerHTML = '';
  photoList.append(photoFragment);

  checkingEmpty('title', '');
  checkingEmpty('description', '');
  checkingEmpty('address', 'text--');
  checkingEmpty('price', 'text--', ' ₽/ночь');

  popupListFragment.append(popupAdvertItem);
});

popupAdvertList.append(popupListFragment);

