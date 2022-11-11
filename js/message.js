import { isEscKey, removeElement } from './utils.js';

const ALERT_MESSAGE_TIMEOUT = 2000;
const body = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onEscKeydown = (evt) => {
  if(isEscKey(evt)){
    evt.preventDefault();
    closeMessage();
  }
};

const onOverlayClick = () => {
  closeMessage();
};

const onErrorButtonClick = () => {
  closeMessage();
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  body.appendChild(successMessage);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onEscKeydown);
  body.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  body.appendChild(errorMessage);
  errorMessage.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onEscKeydown);
  body.style.overflow = 'hidden';
};

function closeMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onEscKeydown);
  body.style.overflow = 'auto';
}

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.classList.add('alert');
  body.appendChild(alert);

  setTimeout(removeElement, ALERT_MESSAGE_TIMEOUT, alert);
};

export { showSuccessMessage, showErrorMessage, showAlert };
