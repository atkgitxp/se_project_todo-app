import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { updateCounter } from "../components/Todo.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // console.log("in index.js");

    const name = inputValues.name;
    const dateInput = inputValues.date;
    console.log(name);
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    section.addItem(addTodoPopupEl);

    renderTodo(values);
    updateCounter();
    newTodoValidator.resetValidation();
    addTodoPopup.close();
    console.log(`Created ToDo: "${name}" with ID: ${values.id}`);
  },
});

addTodoPopup.setEventListeners();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
//   document.addEventListener("keydown", handleEsc);
// };

// const addTodoPopup.close() = (modal) => {
//   modal.classList.remove("popup_visible");
//   document.removeEventListener("keydown", handleEsc);
// };

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const values = { name, date, id };
//   section.addItem(todo);

//   renderTodo(values);
//   updateCounter();
//   newTodoValidator.resetValidation();
//   addTodoPopup.close();
//   console.log(`Created ToDo: "${name}" with ID: ${values.id}`);
// });

updateCounter();
