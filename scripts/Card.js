import {
  escImageButon,
  openPopup,
  popupImage,
  popupImageTitle,
  imagePopup,
  closePopup,
} from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__name");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton() {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_type_like_active");
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImageTitle.textContent = this._name;
    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_type_del")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", () => {
        this._toggleLikeButton();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openImagePopup();
      });
    escImageButon.addEventListener("click", () => {
      closePopup(imagePopup);
    });
  }
}
