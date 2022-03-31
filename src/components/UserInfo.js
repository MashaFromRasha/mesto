export default class UserInfo {
  constructor(profileName, profileStatus) {
    this._profileName = document.querySelector(profileName);
    this._profileStatus = document.querySelector(profileStatus);
  }


// Метод вернет объект с информацией со страницы о пользователе
  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      job: this._profileStatus.textContent,
    };
    return this._userInfo;
  }


  // Метод берет нужные данные из массива данных и выводит на страницу
  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileStatus.textContent = job;
  }
}


