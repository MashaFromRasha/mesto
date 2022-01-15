// Выбираем элементы блока Profile
const profileEditButton = document.querySelector('.profile__button-edit'); // Выбираем кнопку редактирования
const profileAuthor = document.querySelector('.profile__author');
const profileStatus = document.querySelector('.profile__status');

// Выбираем элементы Popup
const popup = document.querySelector('.popup');
const popupContent = popup.querySelector('.popup__container'); // Выбираем контейнер popup
const popupCloseButton = popupContent.querySelector('.popup__button-close'); // Выбираем элементы контейнера popup и кнопку закрытия
const popupForm = popupContent.querySelector('.popup__form'); // Выбираем форму и элементы формы
const popupAuthorField = popupForm.querySelector('.popup__input_type_author');
const popupStatusField = popupForm.querySelector('.popup__input_type_status');
const popupSubmitButton = popupForm.querySelector('.popup__button-submit'); // Выбираем кнопу отправить 



// Функуция открытия Popup:
function showPopup() {
  popup.classList.add('popup_opened');

  // Привязываем стартовое значение в Popap поля
  popupAuthorField.value = profileAuthor.textContent;
  popupStatusField.value = profileStatus.textContent;
}

// Функция закрытия Popup:
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Функция Обработчик «отправки» формы:
function formSubmitHandler(evt) {
  evt.preventDefault();

  // Отправляем значения строк формы на страницу
  profileAuthor.textContent = popupAuthorField.value;
  profileStatus.textContent = popupStatusField.value;

  closePopup();
}

profileEditButton.addEventListener('click', showPopup); // Отслеживаем событие клика кнопки "редактировать" 
popupCloseButton.addEventListener('click', closePopup); // Отслеживаем событие клика кнопки "закрыть" 
popupForm.addEventListener('submit', formSubmitHandler); // Отслеживаем событие клика кнопки "отправить"