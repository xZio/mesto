import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._data = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._data[input.id] = input.value;
    });
    return this._data;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  };

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }
}
