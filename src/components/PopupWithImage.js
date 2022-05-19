import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelectop) {
    super(popupSelectop);

    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupTitle = this._popup.querySelector(".popup__image-title");
  }

  open(title, url) {
    this._popupImage.src = url;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }
}
