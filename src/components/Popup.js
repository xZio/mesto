import { ESC_CODE } from "../utils/utils.js";

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEcsClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEcsClose);
  }

  _handleEcsClose = (evt) => {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector(".button_type_esc")
      .addEventListener("click", () => {
        this.close();
      });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target == evt.currentTarget) {
        this.close();
      }
    });
  }
}
