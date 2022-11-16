import { isValidImageType } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = '../img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingImageChooser = document.querySelector('#images');
const housingImagePreview = document.querySelector('.ad-form__photo');

const onAvatarChange = () => {
  const file = avatarChooser.files[0];
  if (file && isValidImageType(file, FILE_TYPES)){
    avatarPreview.src = URL.createObjectURL(file);
  }
  else{
    avatarPreview.src = DEFAULT_AVATAR;
  }
};

const onPhotoChange = () => {
  const file = housingImageChooser.files[0];
  housingImagePreview.innerHTML = '';
  const photo = document.createElement('img');
  if (file && isValidImageType(file, FILE_TYPES)){
    photo.src = URL.createObjectURL(file);
  }
  photo.style.maxWidth = '100%';
  photo.style.height = 'auto';
  housingImagePreview.append(photo);
};

const resetPhotos = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  housingImagePreview.innerHTML = '';
};

housingImageChooser.addEventListener('change', onPhotoChange);
avatarChooser.addEventListener('change', onAvatarChange);

export { resetPhotos };
