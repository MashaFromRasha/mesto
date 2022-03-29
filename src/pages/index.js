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


// Экземпляр формы с картинкой и тектом
const popupImage = new PopupWithImage('.popup_blackout');
popupImage.setEventListeners();

// const popupProfile1 = new PopupWithForm('.popup-add-card', handleProfileSubmit);
// popupProfile1.setEventListeners();
// const popupAddCard1 = new PopupWithForm('.popup_name_card', handleCardSubmit);
// popupAddCard1.setEventListeners();

// const userInfo = new UserInfo('.profile__author', '.profile__status');


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
  items: initialCards,
  renderer: (item) => {
    const cardElement = creatureCard(item).generateCard();
    cardsList.addItem(cardElement);
  },
},
  // photos
  '.photos'
);

function handleProfileSubmit(data) {
  userElem.setUserInfo(data);
  popupProfile.close();
}

function handleCardSubmit(data) {
  addCard( createCard(data) );
  popupCard.close();
}

// // Константа, содержащая в себе карточку с данными из формы
// const formAddCard = new PopupWithForm({
//   submitForm: (formData) => {
//     formData['name'] = formData['popup-input-place-name'];
//     formData['link'] = formData['popup-input-url'];
//     const cardElement = creatureCard(formData).generateCard();
//     cardsList.addItem(cardElement);
//   },
//   container: popupAddCard
//   // container: '#popup-add-card'
// });

// // Экземпляр класса с информацией юзера
// const userInfo = new UserInfo({
//   titleContainer: profileTitle,
//   subTitleContainer: profileSubtitle
// });

// // Экземпляр класса с формой для информации о юзере
// const formProfile = new PopupWithForm({
//   submitForm: (formData) => {
//     userInfo.setUserInfo(formData);
//   },
//   container: popupProfile
// });

// Отрисовка карточек
cardsList.renderItems();

// Создаем валидацию для формы редактирования профиля
const editPupupValidator = new FormValidator(validationConfig, popupFormEdit);
editPupupValidator.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const addPupupValidator = new FormValidator(validationConfig, popupFormAdd);
addPupupValidator.enableValidation();

// Слушатели событий для форм, попапа картинки
// popupImage.setEventListeners();
// formProfile.setEventListeners();
// formAddCard.setEventListeners();

// Отслеживаем событие клика кнопки "редактировать" 
profileEditButton.addEventListener('click', () => {
  const dataUserInfo = userInfo.getUserInfo();
  popupNameField.value = dataUserInfo.title;
  popupStatusField.value = dataUserInfo.subtitle;
  formProfile.open();
});

// Отслеживаем событие клика кнопки "добавить карточку" 
profileAddButton.addEventListener('click', () => {
  formAddCard.open();
});