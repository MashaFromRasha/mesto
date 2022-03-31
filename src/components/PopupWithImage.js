import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    const popupElement = document.querySelector(popupSelector);
    this._popupElemImg = popupElement.querySelector(".popup__image");
    this._popupElemCaption = popupElement.querySelector(".popup__caption");
  }


  // Наследуем и дополняем метод из Popup
  open(name, link) {
    this._popupElemImg.src = link;
    this._popupElemImg.alt =  name;
    this._popupElemCaption.textContent = name;
    super.open();
  }
}