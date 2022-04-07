import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithRemove from '../components/PopupWithRemove.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  profileEditButton,
  profileAddButton,
  popupFormEdit,
  popupFormAdd,
  popupNameField,
  popupStatusField,
  photos,
  profileAvatarContainer,
  profileAvatarButton,
  profileTitleContainer,
  profileSubtitleContainer,
  popupProfileId,
  popupEditAvatarId,
  popupFormAddAvatarContainer,
  popupRemoveCardId,
  popupImageId,
  popupAddCardId
} from '../utils/constants.js';


// Глобальная переменная, содержащая в себе id пользователя
const userId = {};


// Экземпляр класса API 
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  token: '65df588a-f3b5-4198-8939-b069c90bb6b0',
  groupId: 'cohort-39'
});


// ________________Карточки____________________


// Константа, содержащая в себе все карточки
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = creatureCard(item).generateCard();
    cardsList.setItem(cardElement);
  },
},
photos
);


// Константа, содержащая в себе попап добавления новой карточки с фото
const formAddCard = new PopupWithForm({
  submitForm: (formData) => {
    formAddCard.renderLoading(true);
    api.addCard(formData)
      .then((res) => {
        const cardElement = creatureCard(res).generateCard();
        cardsList.setItemUp(cardElement);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formAddCard.renderLoading(false));
  },
},
  popupAddCardId
);


// Прием объекта по Апи с сервера, отрисовка на сайте
api.getInitialCards()
  .then(res => {
    cardsList.renderItems(res);
  })
  .catch(err => console.log(`Error: ${err}`));


// Функция удаляет карточку с сервера и страницы, закрывает попап
function removeCard(card) {
  api.removeCard(card._id)
    .then((res) => {
      card.deleteCard();
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(popupRemoveCard.close());
}


// Экземпляр попапа подтверждения удаления карточки с фото
const popupRemoveCard = new PopupWithRemove({
  handleRemoveClick: (card) => {
    removeCard(card);
  }
}, popupRemoveCardId);


// Функция отправляет инфу о поставленном лайке и активирует его на странице
function addLike(card) {
  api.addLike(card.getId())
    .then((res) => {
      card.like(res.likes.length);
    })
    .catch(err => console.log(`Error: ${err}`));
}


// Функция отправляет инфу о убранном лайке и деактивирует его на странице
function removeLike(card) {
  api.removeLike(card.getId())
    .then((res) => {
      card.like(res.likes.length);
    })
    .catch(err => console.log(`Error: ${err}`));
}


// Функция, создающая экземпляр класса Card
function creatureCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    removeClickHandler: () => {
      popupRemoveCard.open(card);
    },
    likeClickHandler: (evt) => {
      if (!evt.target.classList.contains("card__button-like_active")) {
        addLike(card);
      } else {
        removeLike(card);
      }
    },
    currentUserId: userId.id
  }, '.cards-template');

  return card;
}

// Попап с большой картинкой и тектом
const popupImage = new PopupWithImage(popupImageId);


// Слушатель в попапе открытия фото в большом размере
popupImage.setEventListeners();


// Отслеживаем событие клика кнопки "Добавить карточку" 
profileAddButton.addEventListener('click', () => {
  formAddCard.open();
  });


// Слушатель действий в попапе добавления карточки с фото 
formAddCard.setEventListeners();


// Слушатель действий в попапе удаления карточки с фото
popupRemoveCard.setEventListeners();


// Валидация формы добавления новой карточки
const addPopupValidator = new FormValidator(validationConfig, popupFormAdd);
addPopupValidator.enableValidation();


// ________________Обновление информации о юзере____________________


// Экземпляр класса с информацией юзера
const userInfo = new UserInfo({
  titleContainer: profileTitleContainer,
  subTitleContainer: profileSubtitleContainer,
  avatarConteiner: profileAvatarContainer
});


// Прием информации о пользователе и публикация на странице
api.getInfoUser()
  .then(res => {
    userId.id = res._id;
    userInfo.setUserInfo(res);
  })
  .catch(err => console.log(`Error: ${err}`));


// Экземпляр класса с попапом редактирования информации о юзере
const formProfile = new PopupWithForm({
  submitForm: (formData) => {
    formProfile.renderLoading(true);
    api.editInfoUser(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formProfile.renderLoading(false));
  },
},
  popupProfileId
);


// Отслеживаем событие клика кнопки "редактировать" 
profileEditButton.addEventListener('click', () => {
  const dataUserInfo = userInfo.getUserInfo();
  popupNameField.value = dataUserInfo.name;
  popupStatusField.value = dataUserInfo.about;
  formProfile.open();
});


// Слушатель действий в попапе инфы о юзере   
formProfile.setEventListeners();


// Валидация формы инфы о юзере
const editPopupValidator = new FormValidator(validationConfig, popupFormEdit);
editPopupValidator.enableValidation();


// ________________Обновление аватара профиля____________________


// Экземпляр попапа для смены аватара
const formProfileAvatar = new PopupWithForm({
  submitForm: (formData) => {
    formProfile.renderLoading(true);
    api.editUserAvatar(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(formProfile.renderLoading(false));
  },
},
  popupEditAvatarId
);


// Отслеживаем событие клика на аватарку
profileAvatarButton.addEventListener('click', () => {
  formProfileAvatar.open();
});


// Слушатель действий в попапе смены аватара
formProfileAvatar.setEventListeners();


// Валидация формы смены аватара
const addAvatarPopupValidator = new FormValidator(validationConfig, popupFormAddAvatarContainer);
addAvatarPopupValidator.enableValidation();
