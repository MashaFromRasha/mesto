// функция показа ошибки
function showError(formElement, inputElement, selectors) {
  const error = formElement.querySelector(`#${inputElement.name}-error`); // поиск в DOM поля ошибки через атрибут name поля ввода
  error.textContent = inputElement.validationMessage; // в текст ошибки устанавливаем значения ошибок браузера по умолчанию
  inputElement.classList.add(selectors.inputInvalidClass); // добавляем класс невалидного инпута
}


// функция скрытия ошибки
function hideError(formElement, inputElement, selectors) {
  const error = formElement.querySelector(`#${inputElement.name}-error`);
  error.textContent = ''; // стираем текст ошибки
  inputElement.classList.remove(selectors.inputInvalidClass); // удаляем класс невалидного инпута
}


// функция проверяет валидность поля ввода
function checkInputValidity(formElement, inputElement, selectors) {
  // если не валидно, то запускаем показ ошибки, если валидно, то скрываем ошибку
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, selectors);
  } else {
    hideError(formElement, inputElement, selectors);
  }
}


// Фунция проверки состояния кнопки форм
function toggleButtonState(button, isActive, selectors) {
  // Если кнопка активна, то убираем класс и состояние, и наоборот
  if (isActive) {
    button.classList.remove(selectors.buttonInvalidClass);
    button.disabled = false;
  } else {
    button.classList.add(selectors.buttonInvalidClass);
    button.disabled = true;
  }
}


// Функция добавляет слушатели событий на поля ввода и кнопки в указанной форме
function setEventListeners(formElement, selectors) {
  const inputsList = formElement.querySelectorAll(selectors.inputSelector); // ищем в DOM все поля ввода
  const submitButton = formElement.querySelector(selectors.submitButtonSelector); // ищем в DOM кнопку указанной формы 
  
  toggleButtonState(submitButton, formElement.checkValidity(), selectors); // определяем стартовое состояние кнопки

  // обходим все поля ввода и вешаем на них слушатели
  inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, selectors); // проверям валидность формы
      toggleButtonState(submitButton, formElement.checkValidity(), selectors); // проверяем состояние кнопки после импута
    });
  });
}
 

// Функция включения проверки валидности формы
function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector); // ищем в DOM все формы
  // Обходим все формы и вещаем слушатель события
  forms.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  
    // Вешаем слушатель на событие отправки формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // убираем дефолтное поведение кнопки "отправить форму"

      const submitButton = formElement.querySelector(selectors.submitButtonSelector); // выбираем в DOM кнопку формы
      toggleButtonState(submitButton, formElement.checkValidity(), selectors); // проверяем состояние кнопки после отправки формы
    }); 
  });
}


// Запускаем валидацию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button-submit_invalid',
});