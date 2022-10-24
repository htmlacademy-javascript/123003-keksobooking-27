import {similarAdverts} from './data.js';

const advertRendering = () => {
  const popupAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupAdvertList = document.querySelector('#map-canvas');
  const typesEnglishToRussian = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  similarAdverts.forEach((advert)=>{
    const {
      description = '',
      photos = [],
      features = [],
      ...offer
    } = advert.offer;
    const {
      avatar = ''
    } = advert.author;
    const popupAdvertItem = popupAdvertTemplate.cloneNode(true);
    popupAdvertItem.querySelector('.popup__title').textContent = offer.title;
    if(!description){
      popupAdvertItem.querySelector('.popup__description').remove();
    }
    else{
      popupAdvertItem.querySelector('.popup__description').textContent = description;
    }
    popupAdvertItem.querySelector('.popup__text--address').textContent = offer.address;
    popupAdvertItem.querySelector('.popup__type').textContent = typesEnglishToRussian[offer.type];
    popupAdvertItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    popupAdvertItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    popupAdvertItem.querySelector('[data-price]').textContent = offer.price;
    popupAdvertItem.querySelector('.popup__avatar').src = avatar;

    const createPopupFeaturesList = () => {
      const popupFeaturesContainer = popupAdvertItem.querySelector('.popup__features');
      const popupFeaturesItems = popupFeaturesContainer.querySelectorAll('.popup__feature');
      if(!features.length) {
        popupFeaturesContainer.remove();
        return;
      }
      const modifiers = features.map((feature)=>`popup__feature--${ feature}`);
      popupFeaturesItems.forEach((item)=>{
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
    };

    const createPopupPhotoList = () => {
      const photoContainer = popupAdvertItem.querySelector('.popup__photos');
      const photoItem = popupAdvertItem.querySelector('.popup__photo');
      photoContainer.innerHTML = '';
      photos.forEach((photo)=>{
        if(!photos.length) {
          photoContainer.remove();
          return;
        }
        const photoItemNew = photoItem.cloneNode();
        photoItemNew.src = photo;
        photoContainer.append(photoItemNew);
      });
    };

    createPopupFeaturesList();
    createPopupPhotoList();
    popupAdvertItem.classList.add('hidden');
    popupAdvertList.append(popupAdvertItem);
  });
  popupAdvertList.firstChild.classList.remove('hidden');
};
const adverts = advertRendering();
export {adverts};
