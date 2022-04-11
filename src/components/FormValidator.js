export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputsList = this._form.querySelectorAll(this._settings.inputSelector); // Ищем в DOM все поля ввода
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector); // выбираем в DOM кнопку формы
  }

  // Функция показа ошибки
  _showError = (form, input, settings) => {
    const error = form.querySelector(`#${input.name}-error`); // Ищем в DOM поле ошибки по name
    error.textContent = input.validationMessage; // Текст ошибки равен дефолтному значению ошибок браузера
    input.classList.add(settings.inputInvalidClass); // Добавляем класс невалидного инпута
  }  

  // Функция, убирающая показ ошибки
  _hideError = (form, input, settings) => {
    const error = form.querySelector(`#${input.name}-error`); // Ищем в DOM поле ошибки по Name
    error.textContent = ''; // Убираем текст ошибки
    input.classList.remove(settings.inputInvalidClass); // Удаляем класс невалидного инпута
  };

  // Фунция проверки состояния кнопки форм
  _setButtonState = (button, isActive, settings) => {
    // Если кнопка активна убираем класс и состояние, и наоборот
    if (isActive) {
      button.classList.remove(settings.buttonInvalidClass);
      button.disabled = false;
    } else {
      this._disabledButton(button, settings);
    }
  };

  // Функция дизейбла кнопки
  _disabledButton = (button, settings) => {
    button.classList.add(settings.buttonInvalidClass);
    button.disabled = true;
  };

  // Функция, проверяющая валидность поля ввода
  _checkInputValidity = (form, input, settings) => {
    // проверяем если не валидно запускаем показ ошибки, если валидно убираем
    if (!input.validity.valid) {
      this._showError(form, input, settings);
    } else {
      this._hideError(form, input, settings);
    }
  };

  // Функция вешает слушатели событий на поля ввода и кнопки в указаной форме
  _setEventListeners = (form, settings, button) => {
    // обходим все поля ввода и вешаем на них слушатели
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, settings); // проверям валидность формы
        this._setButtonState(button, form.checkValidity(), settings); // проверяем состояние кнопки
      });
    });
  };

  // Публичная функция запуска валидации
  enableValidation = () => {
    this._setEventListeners(this._form, this._settings, this._submitButton);

    // Вешаем слушатель на сабытие отправки формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // убираем дефолтное поведение кнопки отправить форму
    });

    this._setButtonState(this._submitButton, this._form.checkValidity(), this._settings); // определяем стартовое состояние кнопки
  };  
};