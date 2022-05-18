export class Card {
  constructor(
    {
      data,
      currentUserId,
      handleCardClick,
      handleDeleteIconClick,
      handleLikeClick,
    },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
    this._isLiked = this._likes.some(
      (author) => this._currentUserId === author._id
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardLikes = this._element.querySelector(".card__likes");

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__name");

    this._deleteButton = this._element.querySelector(".button_type_del");
    this._likeButton = this._element.querySelector(".button_type_like");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._cardLikes.textContent = this._likes.length;

    if (this._isLiked) {
      this._likeButton.classList.toggle("button_type_like_active");
    }

    if (this._currentUserId !== this._ownerId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((data) => {
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle("button_type_like_active");
        this._cardLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        alert(err);
      });
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });
    this._likeButton.addEventListener("click", () => {
      this._toggleLikeButton();
    });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
