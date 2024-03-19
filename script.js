var todos = [];
// var savedTodos = localStorage.getItem("todos");
// savedTodos = JSON.parse(savedTodos);

const createTodo = (title, description) => {
  const id = todos.length + 1;
  todos.push({
    title: title,
    description: description,
    id: id,
    isEditing: false,
    titleEdit: "",
    descriptionEdit: "",
  });
};

const removeTodo = (idToDelete) =>
  (todos = todos.filter((todo) => !(todo.id == idToDelete)));

const setIsEditing = (todoToEdit) => {
  todos.forEach((todo) => {
    if (todo.id == todoToEdit.id) {
      todo.isEditing = true;
    }
  });
};

const updateProperties = (todoToUpdate, inputTitle, inputdescription) => {
  todos.forEach((todo) => {
    if (todo.id === todoToUpdate.id) {
      todo.title = inputTitle.value;
      todo.description = inputdescription.value;
      todo.isEditing = false;
    }
  });
};

const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));

const onAddTodo = () => {
  const titleTodo = document.getElementById("title");
  const title = titleTodo.value;
  const descriptionTodo = document.getElementById("description");
  const description = descriptionTodo.value;
  createTodo(title, description);
  titleTodo.value = "";
  descriptionTodo.value = "";
  renderTodo();
};

const onDeleteTodo = (todoToDelete) => {
  return () => {
    removeTodo(todoToDelete.id);
    renderTodo();
  };
};

const onEditTodo = (todoToEdit) => {
  return () => {
    setIsEditing(todoToEdit);
    renderTodo();
  };
};

const onUpdateTodo = (todoToUpdate, inputTitle, inputdescription) => {
  return () => {
    updateProperties(todoToUpdate, inputTitle, inputdescription);
    renderTodo();
  };
};

const renderTodo = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItems = document.createElement("li");
    todoItems.classList.add("todo-item");

    const todoText = document.createElement("div");
    todoText.classList.add("text");
    todoItems.appendChild(todoText);

    const todoBtn = document.createElement("div");
    todoBtn.classList.add("btn");
    todoItems.appendChild(todoBtn);

    if (todo.isEditing !== true) {
      const todoTitle = document.createElement("label");
      todoTitle.classList.add("titItem");
      todoTitle.innerText = todo.title;
      todoText.appendChild(todoTitle);

      const tododescription = document.createElement("label");
      tododescription.classList.add("desItem");
      tododescription.innerText = todo.description;
      todoText.appendChild(tododescription);

      const editButton = document.createElement("span");
      editButton.classList.add("btn-edit");
      editButton.classList.add("material-symbols-outlined");
      editButton.innerText = "edit";
      editButton.onclick = onEditTodo(todo);
      todoBtn.appendChild(editButton);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("btn-delete");
      deleteButton.classList.add("material-symbols-outlined");
      deleteButton.innerText = "delete";
      deleteButton.onclick = onDeleteTodo(todo);
      todoBtn.appendChild(deleteButton);
    } else {
      const editText = document.createElement("h4");
      editText.innerText = "Edit Todo";
      todoList.appendChild(editText);

      const inputTitleEdit = document.createElement("input");
      inputTitleEdit.placeholder = "Edit title";
      inputTitleEdit.value = todo.title;
      todoList.appendChild(inputTitleEdit);

      const inputdescriptionEdit = document.createElement("input");
      inputdescriptionEdit.placeholder = "Edit descriptiontion";
      inputdescriptionEdit.value = todo.description;
      todoList.appendChild(inputdescriptionEdit);

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.onclick = onUpdateTodo(
        todo,
        inputTitleEdit,
        inputdescriptionEdit
      );
      todoList.appendChild(updateButton);
    }
    todoList.appendChild(todoItems);
  });

  saveTodos();
};

renderTodo();