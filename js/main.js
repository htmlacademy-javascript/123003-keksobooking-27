const NEARBY_OFFERS_COUNT = 10;

const TITLE = [
  'Роскошная   меблированная   квартира с дизайнерским ремонтом',
  'Просторная студия в стиле лофт',
  'Уютная квартира в живописном районе',
  'Домик в деревне',
  'Пространство с монсардой для творческих людей',
  'Дом с террасой',
  'Бунгало с мангалом',
  'Студия в центре города',
  'Прекрасное место с видом на пруд',
  'Недорогая конура',
]

const DESCRIPTION = [
  'Пространство полностью готово для вашего комфортного проживания',
  'Все детали продуманы до мелочей',
  'Комфортное освещение, натуральные материалы отделки и мебели, стильный интерьер',
  'Сочетание уюта и простора',
  'В квартире выполнен дизайнерский ремонт "под ключ" материалами премиум-класса',
  'Ремонта нет, зато дешево',
  'Активные доброжелательные соседи!',
  'Идеальная атмосфера для вашего проживания ',
  'Экологически чистый район',
  'Идеально для владельцев питомцев: рядом парк и сквер',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
]

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
]

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
]

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = min + Math.random() * (max - min);
  const roundValue = Math.round(randomValue);
  return roundValue;
};

const getRandomFloat = (min, max, quantity) => {
  if (min < 0 || max < 0 || quantity < 0) {
    return NaN;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = min + Math.random() * (max - min);
  const floatValue = +randomValue.toFixed(quantity);
  return floatValue;
};

const locate = {
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5),
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const createOffer = (index) => ({
  author: {
    avatar: `img/avatars/user${index.toString().padStart(2,'0')}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLE),
    address: `${locate.lat}, ${locate.lng}`,
    price: getRandomInteger(1,100000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomInteger(1,3),
    guests: getRandomInteger(1,10),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: FEATURES.slice(0, FEATURES.length),
    description: getRandomArrayElement(DESCRIPTION),
    photos: PHOTOS.slice(0, PHOTOS.length),
  },
  location: {
    lat: locate.lat,
    lng: locate.lng,
  },
});

const similarOffers = Array.from({
    length: NEARBY_OFFERS_COUNT
  },
  (_, index) => createOffer(index + 1)
);
console.log(similarOffers);
