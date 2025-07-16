import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, inputList }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit; //save handleFormSubmit to the this object
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    const values = { name: "", date: "" };
    this._inputList.forEach((input) => {
      // console.log(this._inputList);

      values[input.name] = input.value;

      // console.log(input.value);
      //add a key/value pair to values object for each input
      //the key is input.name
      //the value is input.value
      //need to use bracket notation not dot notation
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      // console.log(inputValues.name);
      // console.log(inputValues.date);
      // TODO pass result of _getInputValues to submission handler
      this._handleFormSubmit(inputValues);
    });
  }
}
export default PopupWithForm;
