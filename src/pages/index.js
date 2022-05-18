import { FormValidator } from "../components/FormValidator.js";
import { validationData } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import "../pages/index.css";

//кнопки
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const avatarButton = document.querySelector(".button_type_avatar");

//форма профиля
const profileFormElement = document.querySelector(".popup__form_type_profile");
const nameInput = document.getElementById("profile-name");
const jobInput = document.getElementById("profile-job");

//форма аватара
const avatarFormElement = document.querySelector(".popup__form_type_avatar");

//форма карточки
const cardFormElement = document.querySelector(".popup__form_type_card");

const profileValidation = new FormValidator(validationData, profileFormElement);
profileValidation.enableValidation();

const cardValidation = new FormValidator(validationData, cardFormElement);
cardValidation.enableValidation();

const avatarValidation = new FormValidator(validationData, avatarFormElement);
avatarValidation.enableValidation();

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "3a07dc34-ac58-4250-b8d4-ee5641db0c39",
    "content-type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__profession",
  userAvatarSelector: ".profile__avatar",
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
    });
    userInfo.setUserAvatar({ src: data.avatar });
    userInfo.setUserId(data._id);
  })
  .catch((err) => {
    console.log(err);
  });

const profilePopup = new PopupWithForm(".popup_type_profile", (info) => {
  profilePopup.renderLoading(true);
  api
    .setUserInfo({
      name: info["profile-name"],
      about: info["profile-job"],
    })
    .then((data) =>
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
      })
    )
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
  profilePopup.close();
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(".popup_type_card", (data) => {
  cardPopup.renderLoading(true);
  api
    .addCard({
      name: data["card-title"],
      link: data["card-src"],
    })
    .then((res) => {
      cardSection.addItem(createCard(res));
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.renderLoading(false);
    });
});
cardPopup.setEventListeners();

const confirmPopup = new PopupConfirm(".popup_type_confirm", () => {
  api
    .deleteCard(confirmPopup.card._cardId)
    .then(() => {
      confirmPopup.card.deleteCard();
      confirmPopup.close();
      confirmPopup.card = null;
    })
    .catch((err) => {
      console.log(err);
    });
});
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", (url) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(url["avatar-url"])
    .then((res) => {
      userInfo.setUserAvatar({ src: res.avatar });
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

const cardsInfo = api.getCards();
let cardSection = {};
cardsInfo
  .then((data) => {
    cardSection = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = createCard(item);

          cardSection.addItem(card);
        },
      },
      ".places__card-list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const cardItem = new Card(
    {
      data: item,
      currentUserId: userInfo._userId,
      handleCardClick: () => {
        imagePopup.open(item.name, item.link);
      },
      handleLikeClick: (cardId, isLiked) => {
        return api.likeCard(cardId, isLiked);
      },
      handleDeleteIconClick: () => {
        confirmPopup.open();
        confirmPopup.card = cardItem;
      },
    },
    "#card"
  );
  const card = cardItem.createCard();
  return card;
}

addButton.addEventListener("click", function () {
  cardValidation.resetErrors();
  cardValidation.toggleButtonState();
  cardPopup.open();
});

editButton.addEventListener("click", function () {
  const userContent = userInfo.getUserInfo();

  nameInput.value = userContent.name;
  jobInput.value = userContent.job;
  profilePopup.open();
});

avatarButton.addEventListener("click", function () {
  avatarPopup.open();
  avatarValidation.toggleButtonState();
});
