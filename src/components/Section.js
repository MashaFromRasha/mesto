export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(`${container}`);
  }

  // Метод отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
  // Метод добавляет элементы в контейнер на страницу
  setItem(element) {
    this._container.append(element);
  }

  setItemUp(element) {
    this._container.prepend(element);
  }
}
