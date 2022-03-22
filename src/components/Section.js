// Класс Section отвечает за отрисовку элементов на странице

export default class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }
  
  // Метод отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(element => this._renderer(element));
  }
  
  // Метод принимает DOM-элемент и добавляет его в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}

// export default class Section {
//     constructor({ data, renderer }, container) {
//       this._renderedItems = data;
//       this._renderer = renderer;
//       this._container = container;
//     }
  
//     // Метод перебирает элементы и применяет к ним функцию колл бэк
//     renderItems() {
//       this._renderedItems.forEach(item => this._renderer(item))
//     }
  
//     // Метод добавляет элементы в контейнер на страницу
//     setItem(element) {
//       this._container.prepend(element);
//     }
//   }