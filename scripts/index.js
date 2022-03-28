
//попапы
const popupList = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
const imagePopup = document.querySelector(".popup_type_image");

//кнопки
const editButton = document.querySelector(".button_type_edit");
const escProfileButton = document.querySelector(".button_type_profile-esc");
const escCardButton = document.querySelector(".button_type_card-esc");
const escImageButon = document.querySelector(".button_type_image-esc");
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
const cardTemplate = document.querySelector("#card").content;

const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");

const ESC_CODE = "Escape";

function openImagePopup() {
  popupImage.src = this.src;
  popupImageTitle.textContent =
    this.closest(".card").querySelector(".card__name").textContent;
  openPopup(imagePopup);
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle("button_type_like_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function createCard(data) {
  const cardElement = cardTemplate.firstElementChild.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".button_type_like");
  const deleteButton = cardElement.querySelector(".button_type_del");

  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", openImagePopup);
  cardElement.querySelector(".card__name").textContent = data.name;
  likeButton.addEventListener("click", toggleLikeButton);
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function renderCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
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

  renderCard(data, cardList);
  cardFormElement.reset();

  submitCardButton.setAttribute("disabled", "disabled");
  submitCardButton.classList.add("button_type_save_disabled");
  closePopup(cardPopup);
}

//добавляем в список карточки по умолчанию
initialCards.forEach((card) => {
  renderCard(card, cardList);
});

cardFormElement.addEventListener("submit", submitCardForm);
profileFormElement.addEventListener("submit", submitProfileForm);

editButton.addEventListener("click", openProfilePopup);

escProfileButton.addEventListener("click", function () {
  closePopup(profilePopup);
});

escCardButton.addEventListener("click", function () {
  closePopup(cardPopup);
});
escImageButon.addEventListener("click", function () {
  closePopup(imagePopup);
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
