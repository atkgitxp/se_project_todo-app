class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._boundEscapeHandler = this._handleEscapeClose.bind(this);
  }
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      //   console.log(this);  refers to document but needs to refer to the popup object
      this.close();
    }
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._boundEscapeHandler);
    //document.addEventListener("keydown", this._handleEscapeClose); lost context to the popup likely because this is an event listener on the document, had to use a new property and the bind method so the we reselect the popup object by using this referring to the popup instance.
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    console.log("close method is called");

    document.removeEventListener("keydown", this._boundEscapeHandler);
  }

  setEventListeners() {
    //this one handler will handle close button and modal listener
    this._popupElement.addEventListener("mousedown", (evt) => {
      //if the event target classlist contains "popup__close" or "popup" then close the modal
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}
export default Popup;
