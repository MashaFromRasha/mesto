import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElemImg = this._popup.querySelector('.popup__image');
    this._popupElemCaption = this._popup.querySelector('.popup__caption');
    // this._popupElemImg = this._container.querySelector('.popup__image');
    // this._popupElemCaption = this._container.querySelector('.popup__caption');
  }

  // Наследуем и дополняем метод из Popup
  open(name, link) {
    this._popupElemImg.src = link;
    this._popupElemCaption.textContent = name;
    this._popupElemImg.alt = name;
    super.open(); //Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
  }
}