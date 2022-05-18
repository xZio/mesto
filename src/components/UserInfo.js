export class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.src;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
