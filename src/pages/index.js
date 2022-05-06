import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationData } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "../pages/index.css";

//кнопки
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");

//форма профиля
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInput = document.getElementById("profile-name");
const jobInput = document.getElementById("profile-job");

//форма карточки
const cardFormElement = document.querySelector(".popup__form_type_card");

const profileValidation = new FormValidator(validationData, profileFormElement);
profileValidation.enableValidation();

const cardValidation = new FormValidator(validationData, cardFormElement);
cardValidation.enableValidation();

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

function createCard(item) {
  const cardItem = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePopup.open(item.name, item.link);
      },
    },
    "#card"
  );
  const card = cardItem.createCard();

  return card;
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);

      cardSection.addItem(card);
    },
  },
  ".places__card-list"
);

const cardPopup = new PopupWithForm(".popup_type_card", (inputsValue) => {
  cardSection.addItem(
    createCard({
      name: inputsValue["card-title"],
      link: inputsValue["card-src"],
    })
  );
  cardPopup.close();
});
cardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__profession",
});

const profilePopup = new PopupWithForm(".popup_type_profile", (inputsValue) => {
  userInfo.setUserInfo({
    name: inputsValue["profile-name"],
    job: inputsValue["profile-job"],
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

cardSection.renderItems();

addButton.addEventListener("click", function () {
  cardValidation.toggleButtonState();
  cardPopup.open();
});

editButton.addEventListener("click", function () {
  const userContent = userInfo.getUserInfo();

  nameInput.value = userContent.name;
  jobInput.value = userContent.job;
  profilePopup.open();
});
