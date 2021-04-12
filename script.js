let add_button = document.getElementById("add-button");
let clear_completed_button = document.getElementById("clear-completed-button");
let empty_list_button = document.getElementById("empty-button");
let todo_text_box = document.getElementById("todo-entry-box");
let todo_list = document.getElementById("todo-list");
let error_message = document.getElementById("error-message");
let form = document.getElementById("form");

clear_completed_button.addEventListener("click", clearCompleted);
empty_list_button.addEventListener("click", emptyList);
form.addEventListener("submit", addItem);

function addItem(event) {
  let task = todo_text_box.value;
  if (task.length > 0)
  {
    error_message.innerHTML = null;
    newTask(task, false);
  }
  else
  {
    error_message.innerHTML = "Write a To-do!";
  }
  event.preventDefault();
  form.reset();
}

function clearCompleted() {
  let completed_items = todo_list.getElementsByClassName("completed");
  while(completed_items.length > 0)
  {
    completed_items.item(0).remove();
  }
  saveList()
}

function emptyList() {
  error_message.innerHTML = null;
  let all_items = todo_list.children;
  while (all_items.length > 0)
  {
    all_items.item(0).remove();
  }
  saveList()
}

function newTask(task_name, completed) {
  let task_item = document.createElement("li");
  let task_text = document.createTextNode(task_name);
  task_item.appendChild(task_text);
  
  if(completed)
  {
    task_item.classList.add("completed");
  }
  todo_list.appendChild(task_item);
  task_item.addEventListener("dblclick", toggleToDoItemState)
  saveList()
}

function toggleToDoItemState()
{
  if (this.classList.contains("completed"))
  {
    this.classList.remove("completed");
  }
  else
  {
    this.classList.add("completed");
  }
  saveList();
}

function saveList() {
  let tasks = [];
  
  for (let i = 0; i < todo_list.children.length; i++)
  {
    let task = todo_list.children.item(i);
    
    let task_info = {
      "info": task.innerText,
      "completed": task.classList.contains("completed")
    }
    
    tasks.push(task_info);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadList() {
  if (localStorage.getItem("tasks") != null) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0; i < tasks.length; i++)
    {
      let task = tasks[i];
      newTask(task.info, task.completed);
    }
  }
}

loadList();
