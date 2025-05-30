export function updateCounter() {
  const todoCount = document.querySelector(".counter__todo"); //x
  const todoMaxCount = document.querySelector(".counter__todo_length"); //y
  const todosList = document.querySelector(".todos__list");
  const totalTodos = todosList.querySelectorAll(".todo").length;
  const todosCompleted = todosList.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;

  todoCount.textContent = todosCompleted; //x
  todoMaxCount.textContent = totalTodos; //y
}
class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(this._data.completed);
      updateCounter();
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      console.log(
        `Removed ToDo: "${this._data.name}" with ID: ${this._data.id}`
      );
      updateCounter();
    });
  }
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
