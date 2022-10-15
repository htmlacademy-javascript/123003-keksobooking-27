import {getRandomInteger, getRandomFloat, getRandomArrayItem} from './utils.js';

const NEARBY_ADVERTS_COUNT = 10;

const TITLES = [
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
];

const DESCRIPTIONS = [
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
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const Location = {
  MIN_LATITUDE: 35.65000,
  MAX_LATITUDE: 35.70000,
  MIN_LONGITUDE: 139.70000,
  MAX_LONGITUDE: 139.80000,
};

const getRandomLatitude = () => getRandomFloat(Location.MIN_LATITUDE, Location.MAX_LATITUDE, 5);

const getRandomLongitude = () => getRandomFloat(Location.MIN_LONGITUDE, Location.MAX_LONGITUDE, 5);

const createAdvert = (id) => {
  const location = {
    lat: getRandomLatitude(),
    lng: getRandomLongitude(),
  };
  return {
    author: {
      avatar: `img/avatars/user${id.toString().padStart(2,'0')}.png`,
    },
    offer: {
      title: getRandomArrayItem(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInteger(1,100000),
      type: getRandomArrayItem(TYPES),
      rooms: getRandomInteger(1,3),
      guests: getRandomInteger(1,10),
      checkin: getRandomArrayItem(CHECKINS),
      checkout: getRandomArrayItem(CHECKOUTS),
      features: FEATURES.slice(0, getRandomInteger(1,FEATURES.length)),
      description: getRandomArrayItem(DESCRIPTIONS),
      photos: PHOTOS.slice(0, getRandomInteger(1,PHOTOS.length)),
    },
    location
  };
};


const createSimilarAdverts = () => Array.from({
  length: NEARBY_ADVERTS_COUNT
},
(_, index) => createAdvert(index + 1)
);

export {createSimilarAdverts};
