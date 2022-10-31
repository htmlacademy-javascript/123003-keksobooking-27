const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typesEnToRu = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCardFeaturesList = (card, features) => {
  const featuresContainer = card.querySelector('.popup__features');

  if(features.length === 0) {
    featuresContainer.remove();
    return;
  }

  const modifiers = features.map((feature)=>`popup__feature--${ feature}`);

  featuresContainer.querySelectorAll('.popup__feature').forEach((feature)=>{
    const modifier = feature.classList[1];
    if (!modifiers.includes(modifier)) {
      feature.remove();
    }
  });
};

const createCardPhotosList = (card, photos) => {
  const photoContainer = card.querySelector('.popup__photos');
  const photoTemplate = card.querySelector('.popup__photo');

  photoContainer.replaceChildren();

  photos.forEach((photo)=>{
    if(photos.length === 0) {
      photoContainer.remove();
      return;
    }
    const photoItem = photoTemplate.cloneNode();

    photoItem.src = photo;
    photoContainer.append(photoItem);
  });
};

const createCard = (advert) => {
  const {
    title = '',
    address = '',
    price,
    type = '',
    rooms,
    guests,
    checkin = '',
    checkout = '',
    features = [],
    description = '',
    photos = [],
  } = advert.offer;
  const {
    avatar = ''
  } = advert.author;

  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = title;
  card.querySelector('.popup__text--address').textContent = address;
  card.querySelector('[data-price]').textContent = price;
  card.querySelector('.popup__type').textContent = typesEnToRu[type];
  card.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  if(description === ''){
    card.querySelector('.popup__description').remove();
  }
  else{
    card.querySelector('.popup__description').textContent = description;
  }
  card.querySelector('.popup__avatar').src = avatar;

  createCardFeaturesList(card, features);
  createCardPhotosList(card, photos);

  return card;
};

export {createCard};
