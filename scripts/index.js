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
const escProfileButton = document.querySelector(".popup_type_profile-esc");
const escCardButton = document.querySelector(".popup_type_card-esc");
const escImageButon = document.querySelector(".popup_type_image-esc");
const addButton = document.querySelector(".button_type_add");

//форма профиля
const profileFormElement = document.querySelector(".popup_profile-form");
const nameInput = document.getElementById("profile-name");
const jobInput = document.getElementById("profile-job");

//форма карточки
const cardFormElement = document.querySelector(".popup_card-form");
const titleInput = document.getElementById("card-title");
const srcInput = document.getElementById("card-src");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const cardList = document.createElement("ul");
const places = document.querySelector(".places");
const cardTemplate = document.querySelector("#card").content;

function createCard(data) {
  const cardElement = cardTemplate.firstElementChild.cloneNode(true);
  const likeButton = cardElement.querySelector(".button_type_like");
  const deleteButton = cardElement.querySelector(".button_type_del");

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;

  //клик по картинке
  cardElement.querySelector(".card__image").onclick = function () {
    document.querySelector(".popup__image").src = data.link;
    document.querySelector(".popup__image-title").textContent = data.name;
    togglePopup(imagePopup);
  };

  cardElement.querySelector(".card__name").textContent = data.name;

  likeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("button_type_like_active");
  });
  deleteButton.addEventListener("click", function (event) {
    event.target.closest(".card").remove();
  });

  return cardElement;
}

function renderCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function showPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.innerText;
  togglePopup(profilePopup);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  togglePopup(profilePopup);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: srcInput.value,
  };

  renderCard(data, cardList);
  cardFormElement.reset();
  togglePopup(cardPopup);
}

//добавляем список в разметку
cardList.classList.add("places__card-list");
places.append(cardList);

//добавляем в список карточки по умолчанию
initialCards.forEach((card) => {
  renderCard(card, cardList);
});

editButton.addEventListener("click", showPopup);
escProfileButton.addEventListener("click", function () {
  togglePopup(profilePopup);
});
escCardButton.addEventListener("click", function () {
  togglePopup(cardPopup);
});
escImageButon.addEventListener("click", function () {
  togglePopup(imagePopup);
});
addButton.addEventListener("click", function () {
  togglePopup(cardPopup);
});

profileFormElement.addEventListener("submit", submitProfileForm);
cardFormElement.addEventListener("submit", submitCardForm);
