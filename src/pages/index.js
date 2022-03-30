import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig,
  popupProfile,
  popupAddCard,
  popupOpenImage,
  profileEditButton,
  profileAddButton,
  profileTitle,
  profileSubtitle,
  popupFormEdit,
  popupFormAdd,
  popupNameField,
  popupStatusField,
  photos
} from '../utils/constants.js';

// Функция, создающая экземпляр класса Card
function creatureCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  }, '.cards-template');

  return card;
}

// Константа, содержащая в себе все карточки
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElement = creatureCard(item).generateCard();
    cardsList.addItem(cardElement);
  },
},
  '.photos'
);

// Экземпляр формы с картинкой и тектом
const popupImage = new PopupWithImage('.popup_blackout');
popupImage.setEventListeners();

const userElement = new UserInfo('.profile__author', '.profile__status');

const popupProfile1 = new PopupWithForm('.popup-profile', handleProfileSubmit);
popupProfile1.setEventListeners();

function openProfilePopup() { //отрабатывает корректно, заносит данные из html в попап, открывает заполненный попап
  const userInfo = userElement.getUserInfo();
  popupNameField.value = userInfo.name;
  popupStatusField.value = userInfo.status;

  popupProfile1.open();
}

function handleProfileSubmit(data) {
  userElement.setUserInfo(data);
  popupProfile1.close();
}


// /* обработчик для редактирования */
// function handleProfileSubmit(evt, items) {
//   evt.preventDefault();
//   userElement.setUserInfo(items);
//   popupProfile1.close();
// }
// не включать111 function handleProfileSubmit(items) {
//   userElement.setUserInfo(items);
//   popupProfile1.close();
// }


// Слушатель клика на кнопку отктятия редактирования профиля
profileEditButton.addEventListener('click', openProfilePopup);



// const popupAddCard1 = new PopupWithForm('.popup_name_card', handleCardSubmit);
// popupAddCard1.setEventListeners();


// Отрисовка карточек
cardsList.renderItems();

// Создаем валидацию для формы редактирования профиля
const editPupupValidator = new FormValidator(validationConfig, popupFormEdit);
editPupupValidator.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const addPupupValidator = new FormValidator(validationConfig, popupFormAdd);
addPupupValidator.enableValidation();



