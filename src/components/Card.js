export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._template = document
      .querySelector(cardSelector)
      .content.
      querySelector(".card");
    this._handleCardClick = handleCardClick;
  }

  // Метод генерирует и возвращает карточку 
  generateCard = () => {
    this._element = this._template.cloneNode(true);
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

    // Метод удаляет карточку из DOM
  _deleteClickHandler = () => {
    this._element.remove();
    delete this._element;
  };

    // Метод добавляет-удаляет класс на кнопке лайк
  _likeClickHandler = () => {
    this._placeButtonLike.classList.toggle("card__button-like_active");
  };

// Метод вешает слушатели событий
  _setEventListeners() {    
    this._placeButtonRemove.addEventListener("click", this._deleteClickHandler);
    this._placeButtonLike.addEventListener('click', this._likeClickHandler);
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    // this._elementImage.addEventListener('click', () => {
    //   this._handleCardClick({link: this._elementImage.src, name: this._elementImage.textContent});
    // });
  }
}