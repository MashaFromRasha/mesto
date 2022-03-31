export default class Popup {
  constructor (popupSelector) {
  this._popup = document.querySelector(popupSelector);
  this._pressingEscape = this._pressingEscape.bind(this);
  }


  // Метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._pressingEscape);
  }


  // Метод закрытия попапа
  close(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._pressingEscape);
  }


  // Метод закрытия попапа при нажатии на esc
  _pressingEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  // Метод закрытия попап по клику по фону и кнопке закрытия
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
        this.close();
      }
    });
  }
}