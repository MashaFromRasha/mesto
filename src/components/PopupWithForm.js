// import Popup from './Popup.js';

// export default class PopupWithForm extends Popup {
//   constructor(popupSelector, submitForm) {
//     super(popupSelector);
//     this._form = this._popup.querySelector('.popup__form');
//     this._handleSubmitForm = submitForm;
//     this._inputList = this._form.querySelectorAll('.popup__input');
//   }

//   // Метод собирает информацию с полей формы и возвращает объектом
//   _getInputValues() {
//     const result = {};
//     this._inputList.forEach( input => {
//       result[input.name] = input.value;
//     });

//     return result;
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._form.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       this._handleSubmitForm( this._getInputValues() );
//     } 
//     );
//   }

//   close() {
//     super.close();
//     this._form.reset();
//   }
// }


import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        const inputsObject = {};
        inputs.forEach(input => inputsObject[input.name] = input.value);
        return inputsObject;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => this._handleFormSubmit(e, this._getInputValues()));
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}


