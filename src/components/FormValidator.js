export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonInvalidClass = settings.buttonInvalidClass;
    this._inputInvalidClass = settings.inputInvalidClass;
    
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // Ищем в DOM все поля ввода
    this._submitButton = this._form.querySelector(this._submitButtonSelector); // выбираем в DOM кнопку формы
  }

  // Функция показа ошибки
  _showError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.name}-error`); // Ищем в DOM поле ошибки по name
    errorElement.textContent = inputElement.validationMessage; // Текст ошибки равен дефолтному значению ошибок браузера
    inputElement.classList.add(this._inputInvalidClass); // Добавляем класс невалидного инпута
  }

  // Функция, убирающая показ ошибки
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputInvalidClass);
  }

  // Функция, показывающая и скрывающая ошибки ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  // Функция, проверяющая, есть ли хоть одна ошибка в поле ввода формы
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Фунция проверки состояния кнопки форм
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._buttonInvalidClass);
      this._submitButton.setAttribute('disabled', '');
    } else {
      this._submitButton.classList.remove(this._buttonInvalidClass);
      this._submitButton.removeAttribute('disabled');
    }
  } 
  
  // Функция вешает слушатели событий на поля ввода и кнопки в указанной форме
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Публичная функция запуска валидации
  enableValidation() {
    this._setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }  

  // Публичная функция сброса валидации (текст и кнопка)
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  
    this._toggleButtonState();
  }  
}