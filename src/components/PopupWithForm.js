// import Popup from './Popup.js';

// export default class PopupWithForm extends Popup {
//   constructor({ submitForm, container }) {
//     super(container);
//     this._submitForm = submitForm;
//     this._formSelector = this._container.querySelector('.popup__form');
//   }

//   // Метод собирает информацию с полей формы и возвращает объектом
//   _getInputValues() {
//     this._inputList = this._formSelector.querySelectorAll('.popup__input');
//     this._formValues = {};
//     this._inputList.forEach(input => {
//       this._formValues[input.name] = input.value;
//     });

//     return this._formValues;
//   }

//   close() {
//     super.close();
//     this._formSelector.reset();
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._formSelector.addEventListener('submit', this._handleSubmitForm);
//   }

//   // метод описывает функционал события отправки формы
//   _handleSubmitForm = (evt) => {
//     evt.preventDefault();
//     this._submitForm(this._getInputValues());
//     this.close(this._container);
//   }
// }


import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor( { popupSelector, handleSubmit } ) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
  }


  // Метод собирает информацию с полей формы и возвращает объектом
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

}