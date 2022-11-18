import { isValidImageType } from './utils.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingImageChooser = document.querySelector('#images');
const housingImagePreview = document.querySelector('.ad-form__photo');

const onAvatarChange = () => {
  const file = avatarChooser.files[0];
  if (file && isValidImageType(file, FILE_TYPES)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
  else if (isValidImageType(file, FILE_TYPES) === false) {
    avatarPreview.src = DEFAULT_AVATAR;
  }
};

const onPhotoChange = () => {
  const file = housingImageChooser.files[0];
  const photo = document.createElement('img');
  if (file && isValidImageType(file, FILE_TYPES)) {
    housingImagePreview.replaceChildren();
    photo.src = URL.createObjectURL(file);
  }
  photo.style.maxWidth = '100%';
  photo.style.maxHeight = '100%';
  housingImagePreview.appendChild(photo);
};

const resetPhotos = () => {
  const photo = housingImagePreview.querySelector('img');
  if (avatarPreview.src) {
    URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.src = DEFAULT_AVATAR;
  }
  if (photo) {
    URL.revokeObjectURL(photo.src);
    housingImagePreview.replaceChildren();
  }
};

housingImageChooser.addEventListener('change', onPhotoChange);
avatarChooser.addEventListener('change', onAvatarChange);

export { resetPhotos };
