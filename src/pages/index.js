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
  profileEditButton,
  profileAddButton,
  popupFormEdit,
  popupFormAdd,
  popupNameField,
  popupStatusField,
  photos
} from '../utils/constants.js';

// Создаем валидацию для формы редактирования профиля
const editPupupValidator = new FormValidator(validationConfig, popupFormEdit);
editPupupValidator.enableValidation();

// Создаем валидацию для формы добавления новой картоки
const addPupupValidator = new FormValidator(validationConfig, popupFormAdd);
addPupupValidator.enableValidation();


// Создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, "#cards-template", popupWithImage.open);
  return card.generateCard();
}


// Константа, содержащая в себе все карточки
const cardList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  '.photos'
);


// Экземпляр формы с картинкой и тектом (открытый попап с большой картинкой)
const popupWithImage = new PopupWithImage(".popup_blackout");


const userInfo = new UserInfo(".profile__author", ".profile__status");


const popupWithFormRenameUser = new PopupWithForm({
  popupSelector: ".popup-profile",
  handleSubmit: (formValues) => {
    userInfo.setUserInfo(formValues.inputName, formValues.inputJob);
  },
});

const popupWithFormAppendCard = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleSubmit: (formValues) => {
    const cardElement = createCard(formValues);
    cardList.addItem(cardElement);
  },
});


// Рендерим карточки из массива
cardList.renderItems();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupNameField.value = userData.name;
  popupStatusField.value = userData.job;

  popupWithFormRenameUser.open();
});


// Слушатель клика на кнопку открытия редактирования профиля
profileAddButton.addEventListener("click", () => {
  popupWithFormAppendCard.open();
});


// Закрытие попапов при нажатии на фон и на кнопку закрытия
popupWithFormAppendCard.setEventListeners();
popupWithFormRenameUser.setEventListeners();
popupWithImage.setEventListeners();