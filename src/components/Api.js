export default class Api {

  constructor({ baseUrl, groupId, headers }) {
    this._address = baseUrl;
    this._groupId = groupId;
    this._headers = headers;
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }


  getInfoUser() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
        headers: this._headers,
    })
    .then(this._checkResponse);
  }
    
  editInfoUser(data) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data['popup-input-name'],
        about: data['popup-input-status'],
      })
    })
    .then(this._checkResponse);
  }
  
  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
        headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  addCard(data) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data['popup-input-place-name'],
        link: data['popup-input-url']
      })
    })
    .then(this._checkResponse);
  }
  
  removeCard(id) {
    return fetch(`${this._address}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  addLike(id) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  removeLike(id) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
  
  editUserAvatar(data) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data['popup-input-url-avatar'],
      })
    })
    .then(this._checkResponse);
  }
}