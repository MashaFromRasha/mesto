// Класс Section отвечает за отрисовку элементов на странице

export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }
  
  // Метод отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(element => this._renderer(element));
  }
  
  // Метод принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
