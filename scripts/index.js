let popup = document.querySelector(".popup");

function showPopup() {
  popup.classList.add("popup_opened");
}

function removePopup() {
  popup.classList.remove("popup_opened");
}

let editButton = document.querySelector(".button_edit");
editButton.addEventListener("click", showPopup);

let escButton = document.querySelector(".button_esc");
escButton.addEventListener("click", removePopup);

//находим форму и поля формы
let formElement = document.querySelector(".popup__container");
let inputs = document.querySelectorAll(".popup__input");
let nameInput = inputs[0];
let jobInput = inputs[1];

let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

nameInput.value = profileName.textContent;
jobInput.value = profileProfession.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  //проверяем на пустые строки
  nameInput.value === ""
    ? (profileName.textContent = "Нет имени")
    : (profileName.textContent = nameInput.value);

  jobInput.value === ""
    ? (profileProfession.textContent = "Нет профессии")
    : (profileProfession.textContent = jobInput.value);

  removePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
