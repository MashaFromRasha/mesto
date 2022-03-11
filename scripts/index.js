import {initialCards} from './utils.js';
import { showPopup } from './utils.js';
import { closePopup } from './utils.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-add-card');
// const popupOpenImage = document.querySelector('#popup-open-image');
// const popupElemImg = document.querySelector('.popup__image');
// const popupElemCaption = document.querySelector('.popup__caption');

const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
const profileTitle = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__status');

const popupFormEdit = document.querySelector('#popup-form-edit');
const popupFormAdd = document.querySelector('#popup-form-add');

const popupNameField = document.querySelector('.popup__input_type_author');
const popupStatusField = document.querySelector('.popup__input_type_status');

const photos = document.querySelector('.photos');


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};

 
// // Функция нажатия на ESC
// function pressingEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }


// // Функция клика на фото (открытие попапа)
// export function handleImageClick(name, link) {
//   popupElemImg.src = link;
//   popupElemCaption.textContent = name;
 
//   showPopup(popupOpenImage);
// }


// // Функуция открытия Popup
// function showPopup(popup) {
//   document.addEventListener('keydown', pressingEscape);
 
//   popup.classList.add('popup_opened');
// }


// // Функция закрытия Popup
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
 
//   document.removeEventListener('keydown', pressingEscape);
// }


// Функция создает и возвращает карточку
function createCard(data) {
  const card = new Card(data, '.cards-template'); // создаем экземпляр Card
  const cardElement = card.generateCard(); // запускаем публичную функцию в экземпляре
 
  return cardElement;
}


// функция добавляет карточку на страницу
function addCard(container, cardElement) {
  container.prepend(cardElement);
}


// Перебор массива с данными и отправка в функцию AddCard в публичной функции Card
initialCards.forEach(item => {
  addCard(photos, createCard(item));
});


// Перебор всех попапов
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    //Проверяем наличие класс при отжатии мышки для дальнейшего закрытия по фону попапов
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  });
});


// Отслеживаем событие отправки формы "Новой карточки"
popupFormAdd.addEventListener("submit", evt => {
  evt.preventDefault(); // сброс дефолтной отправки формы
  const newCard = {}; // создаем объект для отправи в класс Card
  newCard.name = popupFormAdd['popup-input-place-name'].value; // Значения полей формы
  newCard.link = popupFormAdd['popup-input-url'].value;
 
  addCard(photos, createCard(newCard)); // Добавляем новую карточку заполненую в форме юзером
 
  closePopup(popupAddCard); // закрываем форму
  popupFormAdd.reset(); // сбрасываем значения формы
});


// Отслеживаем событие отправки формы "Редактирования Profile" и отправляем полученые значения
popupFormEdit.addEventListener("submit", evt => {
  evt.preventDefault();
 
  profileTitle.textContent = popupNameField.value; // Значения полей формы
  profileSubtitle.textContent = popupStatusField.value;
 
  closePopup(popupProfile);
  popupFormEdit.reset();
});


// Отслеживаем событие клика кнопки "редактировать"
profileEditButton.addEventListener('click', () => {
 
  popupNameField.value = profileTitle.textContent; // Значения полей формы
  popupStatusField.value = profileSubtitle.textContent;
 
  showPopup(popupProfile);
});


// Отслеживаем событие клика кнопки "добавить карточку"
profileAddButton.addEventListener('click', () => {
  showPopup(popupAddCard);
});


// запускаем валидацию для формы добавления новой картоки
const addPupupValidator = new FormValidator(validationConfig, popupFormAdd);
addPupupValidator.enableValidation();


// запускаем валидацию для формы редактирования профиля
const editPupupValidator = new FormValidator(validationConfig, popupFormEdit);
editPupupValidator.enableValidation();
