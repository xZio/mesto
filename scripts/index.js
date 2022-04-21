import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./data.js";
import { Card } from "./Card.js";

//попапы
const popupList = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
export const imagePopup = document.querySelector(".popup_type_image");

//кнопки
const editButton = document.querySelector(".button_type_edit");
const escProfileButton = document.querySelector(".button_type_profile-esc");
const escCardButton = document.querySelector(".button_type_card-esc");
export const escImageButon = document.querySelector(".button_type_image-esc");
const addButton = document.querySelector(".button_type_add");
const submitCardButton = document.querySelector(".button_type_submit-card");

//форма профиля
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInput = document.getElementById("profile-name");
const jobInput = document.getElementById("profile-job");

//форма карточки
const cardFormElement = document.querySelector(".popup__form_type_card");
const titleInput = document.getElementById("card-title");
const srcInput = document.getElementById("card-src");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const cardList = document.querySelector(".places__card-list");

export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");

const ESC_CODE = "Escape";

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
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

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.innerText;
  openPopup(profilePopup);
  resetErrors();
}

function submitProfileForm() {
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopup(profilePopup);
}

function submitCardForm() {
  const data = {
    name: titleInput.value,
    link: srcInput.value,
  };

  renderClassCard(data, cardList);
  cardFormElement.reset();

  submitCardButton.setAttribute("disabled", "disabled");
  submitCardButton.classList.add("button_type_save_disabled");
  closePopup(cardPopup);
}

function renderClassCard(data, container) {
  const classCard = new Card(data, "#card");
  const card = classCard.createCard();
  container.prepend(card);
}

function startValidation(data) {
  const forms = Array.from(document.querySelectorAll(data.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(data, form);

    validator.enableValidation();
  });
}

cardFormElement.addEventListener("submit", submitCardForm);
profileFormElement.addEventListener("submit", submitProfileForm);
editButton.addEventListener("click", openProfilePopup);
escProfileButton.addEventListener("click", function () {
  closePopup(profilePopup);
});
escCardButton.addEventListener("click", function () {
  closePopup(cardPopup);
});
addButton.addEventListener("click", function () {
  openPopup(cardPopup);
});
//закрытие попапа по клику на оверлей
popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  });
});

initialCards.forEach((card) => {
  renderClassCard(card, cardList);
});

startValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
