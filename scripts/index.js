let popup = document.querySelector(".popup");
let editButton = document.querySelector(".button_type_edit");
let escButton = document.querySelector(".button_type_esc");
let formElement = document.querySelector(".popup__form");
let nameInput = document.getElementById("profile-name");
let jobInput = document.getElementById("profile-job");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

function showPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add("popup_opened");
}

function removePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  removePopup();
}

editButton.addEventListener("click", showPopup);
escButton.addEventListener("click", removePopup);
formElement.addEventListener("submit", formSubmitHandler);
