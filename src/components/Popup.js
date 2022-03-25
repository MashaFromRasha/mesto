export default class Popup {
  constructor(container) {
    this._container = container;
  }
  
  // Метод открытия попапа
  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._pressingEscape);
  }
  
  // Метод закрытия попапа
  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._pressingEscape);
  }
  
  // Метод закрытия попапа при нажатии на esc
  _pressingEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.close(this._container);
    }
  }
  
  // Метод закрытия попап по клику по фону и кнопке закрытия
  _handleClickContainer = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      this.close(this._container);
    }
  };
  
  // Метод, добавляющий слушатели событий
  setEventListeners() {
    this._container.addEventListener('click', this._handleClickContainer);
  }
}