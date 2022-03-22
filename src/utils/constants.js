// массив из 6ти карточек 
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
};


export const popupProfile = document.querySelector('#popup-profile');
export const popupAddCard = document.querySelector('#popup-add-card');
export const popupOpenImage = document.querySelector('#popup-open-image');

export const profileEditButton = document.querySelector('.profile__button-edit');
export const profileAddButton = document.querySelector('.profile__button-add');
export const profileTitle = document.querySelector('.profile__author');
export const profileSubtitle = document.querySelector('.profile__status');

// export const popupOpenImage = document.querySelector('#popup-open-image');
// export const popupElemImg = document.querySelector('.popup__image');
// export const popupElemCaption = document.querySelector('.popup__caption');

export const popupFormEdit = document.querySelector('#popup-form-edit');
export const popupFormAdd = document.querySelector('#popup-form-add');

export const popupNameField = document.querySelector('.popup__input_type_author');
export const popupStatusField = document.querySelector('.popup__input_type_status');

export const photos = document.querySelector('.photos');