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


const popupOpenImage = document.querySelector('#popup-open-image');
const popupElemImg = document.querySelector('.popup__image');
const popupElemCaption = document.querySelector('.popup__caption');


// Функция клика на фото (открытие попапа)
export function handleImageClick(name, link) {
  popupElemImg.src = link;
  popupElemCaption.textContent = name;
 
  showPopup(popupOpenImage);
}


// Функуция открытия Popup
export function showPopup(popup) {
  document.addEventListener('keydown', pressingEscape);
 
  popup.classList.add('popup_opened');
}


// Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
 
  document.removeEventListener('keydown', pressingEscape);
}

// Функция нажатия на ESC
function pressingEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
