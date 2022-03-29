export default class UserInfo {
  constructor(titleSelector, subTitleSelector) {
    this._userName = document.querySelector(titleSelector);
    this._userStatus = document.querySelector(subTitleSelector);
  }
  
  // Метод вернет объект с информацией со страницы о пользователе
  getUserInfo() {
    return {
      name: this._userName.textContent,
      status: this._userStatus.textContent
    };
  }
  
  // Метод берет нужные данные из массива данных и выводит на страницу
  setUserInfo({name, status}) {
    this._userName.textContent = name;
    this._userStatus.textContent = status;
  }
}