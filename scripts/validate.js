function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      errorClass,
      inputErrorClass
    );
  });
}

function setEventListeners(
  form,
  inputSelector,
  buttonSelector,
  inactiveButtonClass,
  errorClass,
  inputErrorClass
) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(buttonSelector);
  toggleButtonState(inputs, button, inactiveButtonClass);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, errorClass, inputErrorClass);
      toggleButtonState(inputs, button, inactiveButtonClass);
    });
  });
}

function checkInputValidity(input, errorClass, inputErrorClass) {
  if (input.validity.valid) {
    hideInputError(input, errorClass, inputErrorClass);
  } else showInputError(input, errorClass, inputErrorClass);
}

function showInputError(input, errorClass, inputErrorClass) {
  const inputName = input.getAttribute("name");
  const errorPlace = document.getElementById(`${inputName}-error`);
  errorPlace.classList.add(errorClass);
  input.classList.add(inputErrorClass);

  errorPlace.textContent = input.validationMessage;
}

function hideInputError(input, errorClass, inputErrorClass) {
  const inputName = input.getAttribute("name");
  const errorPlace = document.getElementById(`${inputName}-error`);
  errorPlace.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
  errorPlace.textContent = "";
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  if (isValidInput(inputs)) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute("disabled");
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "disabled");
  }
}

function isValidInput(inputs) {
  return inputs.every((input) => input.validity.valid);
}

function resetErrors() {
  const errorList = Array.from(document.querySelectorAll(".popup__error"));
  const inputList = Array.from(document.querySelectorAll(".popup__input"));
  errorList.forEach((error) => {
    error.classList.remove("popup__error_visible");
  });
  inputList.forEach((error) => {
    error.classList.remove("popup__input_type_error");
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
