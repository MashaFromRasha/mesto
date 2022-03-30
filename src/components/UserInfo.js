// export default class UserInfo {
//   constructor(titleSelector, subTitleSelector) {
//     this._userName = document.querySelector(titleSelector);
//     this._userStatus = document.querySelector(subTitleSelector);
//   }
  
//   // Метод вернет объект с информацией со страницы о пользователе
//   getUserInfo() {
//     return {
//       name: this._userName.textContent,
//       status: this._userStatus.textContent
//     };
//   }
  
//   // Метод берет нужные данные из массива данных и выводит на страницу
//   setUserInfo({name, status}) {
//     this._userName.textContent = name;
//     this._userStatus.textContent = status;
//   }
// }



export default class UserInfo {
  constructor({
      userNameSelector,
      userAboutSelector
  }) {
      this._userNameElement = document.querySelector(userNameSelector);
      this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
      return {
          name: this._userNameElement.textContent,
          job: this._userAboutElement.textContent
      };
  }

  setUserInfo(name, job) {
      this._userNameElement.textContent = name;
      this._userAboutElement.textContent = job;
  }
}
