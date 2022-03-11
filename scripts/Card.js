import { handleImageClick } from './utils.js';


export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }


  // Фунция возвращает шаблон карточки из DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
 
    return cardElement;
  }

 
  // функция генерирует и возвращает карточку
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".card__image");
    this._elementTitle = this._element.querySelector(".card__title");
    this._placeButtonLike = this._element.querySelector(".card__button-like");
    this._placeButtonRemove = this._element.querySelector(".card__button-remove");
    this._setEventListeners(); 

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = 'Фотография местности ' + this._name;
 
    return this._element;
  }


  // функция удаляет карточку из DOM
  _deleteClickHandler = () => {
    this._element.remove();
  }


  // функция добавляет-удаляет класс на кнопке лайк
  _likeClickHandler = () => {
    this._placeButtonLike.classList.toggle("card__button-like_active");
  };


  // функция вешает слушатели событий
  _setEventListeners = () => {
    this._placeButtonRemove.addEventListener('click', this._deleteClickHandler);
    this._placeButtonLike.addEventListener('click', this._likeClickHandler);
    this._elementImage.addEventListener('click', () => {
      handleImageClick(this._name, this._link);
    });
  };
}
