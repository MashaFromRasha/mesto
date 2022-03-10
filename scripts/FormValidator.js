export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }


  // Метод показа ошибки
  _showError (form, input) {
    const error = form.querySelector(`#${input.name}-error`); // Ищем в DOM поле ошибки по Name
    error.textContent = input.validationMessage; // Текст ошибки равен дефолтному значению ошибок браузера
    input.classList.add(this._settings.inputInvalidClass); // Добавляем класс невалидного инпута
  }


  // Мктод, убирающий показ ошибки
  _hideError (form, input) {
    const error = form.querySelector(`#${input.name}-error`); // Ищем в DOM поле ошибки по Name
    error.textContent = ''; // Убираем текст ошибки
    input.classList.remove(this._settings.inputInvalidClass); // Удаляем класс невалидного инпута
  }


  // Метод, проверяющий валидность поля ввода
  _checkInputValidity (form, input) {
    // проверяем, если не валидно - запускаем показ ошибки, если валидно - убираем
    if (!input.validity.valid) {
      this._showError(form, input, this._settings);
    } else {
      this._hideError(form, input, this._settings);
    }
  }


  // Метод дизейбла кнопки
  _disabledButton (button) {
    button.classList.add(this._settings.buttonInvalidClass);
    button.disabled = true;
  }


  // Метод проверки состояния кнопки форм
  _setButtonState (button, isActive) {
    // Если кнопка активна - убираем класс и состояние, и наоборот
    if (isActive) {
      button.classList.remove(this._settings.buttonInvalidClass);
      button.disabled = false;
    } else {
      this._disabledButton(button, this._settings);
    }
  }


  // Метод вешает слушатели событий на поля ввода и кнопки в указанной форме
  _setEventListeners (form, settings, button) {
      // Обходим все поля ввода и вешаем на них слушатели
    this._inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input, settings); // Проверяем валидность формы
        this._setButtonState(button, form.checkValidity(), settings); // Проверяем состояние кнопки
      });
    });
  }

  
  // Публичный метод запуска валидации
  enableValidation () {
    this._inputsList = this._form.querySelectorAll(this._settings.inputSelector); // Ищем в DOM все поля ввода
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector); // Выбираем в DOM кнопку формы
    this._setEventListeners(this._form, this._settings, this._submitButton);
  
    // Вешаем слушатель на событие отправки формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // убираем дефолтное поведение кнопки "Отправить форму"
      this._disabledButton(this._submitButton, this._settings);
    });

    this._setButtonState(this._submitButton, this._form.checkValidity(), this._settings); // Определяем стартовое состояние кнопки
  }
}