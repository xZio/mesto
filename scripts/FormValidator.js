export class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
    this._inputs = Array.from(
      this._formElement.querySelectorAll(data.inputSelector)
    );
    this._button = this._formElement.querySelector(data.submitButtonSelector);
  }

  _isValidInput() {
    return this._inputs.every((input) => input.validity.valid);
  }

  _toggleButtonState() {
    if (this._isValidInput()) {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.removeAttribute("disabled");
    } else {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.setAttribute("disabled", "disabled");
    }
  }

  _hideInputError(input) {
    const inputName = input.getAttribute("name");
    const errorPlace = document.getElementById(`${inputName}-error`);
    errorPlace.classList.remove(this._data.errorClass);
    input.classList.remove(this._data.inputErrorClass);
    errorPlace.textContent = "";
  }

  _showInputError(input) {
    const inputName = input.getAttribute("name");
    const errorPlace = document.getElementById(`${inputName}-error`);
    errorPlace.classList.add(this._data.errorClass);
    input.classList.add(this._data.inputErrorClass);
    errorPlace.textContent = input.validationMessage;
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else this._showInputError(input);
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(input);
      });
    });
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
