import { FormValidator } from "./FormValidator.js";
import { initialCards, validationData } from "./data.js";
import { Card } from "./Card.js";
import { openPopup, closePopup } from "./utils.js";

//попапы
const popupList = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");

//кнопки
const editButton = document.querySelector(".button_type_edit");
const escProfileButton = document.querySelector(".button_type_profile-esc");
const escCardButton = document.querySelector(".button_type_card-esc");

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

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.innerText;
  openPopup(profilePopup);
  profileValidation.resetErrors();
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
  cardValidation.toggleButtonState();
  closePopup(cardPopup);
}

function renderClassCard(data, container) {
  const classCard = new Card(data, "#card");
  const card = classCard.createCard();
  container.prepend(card);
}

const profileValidation = new FormValidator(validationData, profileFormElement);
profileValidation.enableValidation();

const cardValidation = new FormValidator(validationData, cardFormElement);
cardValidation.enableValidation();

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
