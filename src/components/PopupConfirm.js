import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelectop, handleSubmitForm) {
    super(popupSelectop);
    this._confirmButton = document.querySelector(".button_type_confirm");
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault;
      this._handleSubmitForm();
    });
  }
}
