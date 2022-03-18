const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//попапы
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
const imagePopup = document.querySelector(".popup_type_image");

//кнопки
const editButton = document.querySelector(".button_type_edit");
const escProfileButton = document.querySelector(".button_type_profile-esc");
const escCardButton = document.querySelector(".button_type_card-esc");
const escImageButon = document.querySelector(".button_type_image-esc");
const addButton = document.querySelector(".button_type_add");

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
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.innerText;
  openPopup(profilePopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: srcInput.value,
  };

  renderCard(data, cardList);
  cardFormElement.reset();
  closePopup(cardPopup);
}



//добавляем в список карточки по умолчанию
initialCards.forEach((card) => {
  renderCard(card, cardList);
});

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

profileFormElement.addEventListener("submit", submitProfileForm);
cardFormElement.addEventListener("submit", submitCardForm);
