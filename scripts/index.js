// массив из 6ти карточек 
const initialCards = [
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


const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const popupOpenImage = document.querySelector('#popup-open-image');

const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
const profileTitle = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__status');


const popupFormEdit = document.querySelector('#popup-form-edit');
const popupFormAdd = document.querySelector('#popup-form-add');

const popupNameField = document.querySelector('.popup__input_type_author');
const popupStatusField = document.querySelector('.popup__input_type_status');

const photos = document.querySelector('.photos');


// Функция нажатия на esc:
function pressEscape(evt) {
  const popupIsOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupIsOpen);
  }
}


// Функуция открытия Popup
function showPopup(popup) {
  document.addEventListener('keydown', pressEscape);
  popup.classList.add('popup_opened');
}


// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscape);
}


//Функция создания карточки 
function createCard(name, link) {
  // Находим элемент в DOM и клонируем контент в теге
  const card = document.querySelector(".cards-template").content.cloneNode(true);

  // находим элементы в DOM
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");

  // Подставляем пришедшие значения в шаблон новой карточки
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = 'Фотография местности ' + name;

  // Отслеживаем событие клика кнопки Удаление
  card.querySelector(".card__button-remove").addEventListener('click', evt => {
    evt.target.closest(".card").remove();
  });

  // Отслеживаем событие клика кнопки Лайк
  card.querySelector(".card__button-like").addEventListener('click', evt => {
    evt.target.classList.toggle("card__button-like_active");
  });

  // Отслеживаем событие клика на картинку
  cardImage.addEventListener('click', evt => {
    const popupImage = popupOpenImage.querySelector('.popup__image');
    const popupCaption = popupOpenImage.querySelector('.popup__caption');

    popupImage.src = evt.target.src; 
    popupImage.alt = name; 
    popupCaption.textContent = name;

    showPopup(popupOpenImage);
  });

  return card; //возвращается созданная карточка 
}


// Функция добавления карточки в контейнер
function addCard(container, element) {
  container.prepend(element);
}


// Перебираем все popup, чтобы повесить обработчик на все кнопки закрытия, и клики вне popup (закрытие popup)
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

// Отслеживаем событие клика кнопки "редактировать профиль" (открытие popup) + добавление дефолтных значений
profileEditButton.addEventListener('click', () => {

  popupNameField.value = profileTitle.textContent;
  popupStatusField.value = profileSubtitle.textContent;

  showPopup(popupProfile);
});


// Отслеживаем событие отправки формы "Редактирования Profile" и отправляем полученые значения + закрытие popup
popupFormEdit.addEventListener("submit", evt => {
  evt.preventDefault();

  profileTitle.textContent = popupNameField.value;
  profileSubtitle.textContent = popupStatusField.value;

  closePopup(popupProfile);
});


// Отслеживаем событие клика кнопки "добавить карточку" (открытие popup)
profileAddButton.addEventListener('click', () => {
  showPopup(popupAddCard);
});


// Отслеживаем событие отправки формы "Новой карточки"
popupFormAdd.addEventListener("submit", evt => {
  evt.preventDefault();

  const newNameCard = popupFormAdd.querySelector('.popup__input_type_place-name').value; // Значения полей формы 
  const newLinkCard = popupFormAdd.querySelector('.popup__input_type_photo').value;

  addCard(photos, createCard(newNameCard, newLinkCard)); // Добавляем новую карточку

  closePopup(popupAddCard); // закрываем форму
  popupFormAdd.reset(); // сбрасываем значения формы
});


// Перебор элементов массива с функцией addCard
initialCards.forEach(item => {
  addCard(photos, createCard(item.name, item.link));
});