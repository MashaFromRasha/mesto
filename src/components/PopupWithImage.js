import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(container) {
    super(container);
    this._popupElemImg = this._container.querySelector('.popup__image');
    this._popupElemCaption = this._container.querySelector('.popup__caption');
  }

  // Наследуем и дополняем метод из Popup
  open(name, link) {
    this._popupElemImg.src = link;
    this._popupElemImg.alt =  name;
    this._popupElemCaption.textContent = name;
    super.open(); //Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
  }
}