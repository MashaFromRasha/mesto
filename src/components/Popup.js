// Условия открытия и закрытия попапов
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close');

    this._boundHandleButtonClose = this._handleButtonClose.bind(this);
    this._boundHandleOverlayClose = this._handleOverlayClose.bind(this);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleButtonClose() {
    this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this._boundHandleButtonClose);
    this._popup.addEventListener('click', this._boundHandleOverlayClose);
    document.addEventListener('keydown', this._boundHandleEscClose);
  }

}