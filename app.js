const $addTodo = document.querySelector('#add-todo');
const $todoList = document.querySelector('.todo-list');

const $newTodo = document.createElement('li');
const $checkbox = document.createElement('input');
const $todoText = document.createElement('div');
const $paragraph = document.createElement('p');
const $buttons = document.createElement('div');
const $editButton = document.createElement('button');
const $editImg = document.createElement('img');
const $deleteButton = document.createElement('button');
const $deleteImg = document.createElement('img');

let todoList = [];

loadTodoList();

function createTodoItem(todoContent, completed, index) {
  $newTodo.className = 'todo-item';

  $checkbox.type = 'checkbox';
  $checkbox.id = 'checkbox';
  $checkbox.addEventListener('change', () => {
    toggleComplete(index);
  });

  $todoText.className = 'todo';
  $paragraph.textContent = todoContent;
  $todoText.appendChild($paragraph);
  $buttons.className = 'todo-item-buttons';
  $editButton.className = 'edit-button';
  $editImg.src = 'assets/icons/pencil.svg';
  $editImg.alt = 'edit button';
  $editButton.appendChild($editImg);
  $deleteButton.className = 'delete-button';
  $deleteImg.src = 'assets/icons/delete.svg';
  $deleteImg.alt = 'delete button';
  $deleteButton.addEventListener('click', () => {
    deleteTodo(index);
  });

  $deleteButton.appendChild($deleteImg);
  $buttons.appendChild($editButton);
  $buttons.appendChild($deleteButton);
  $newTodo.appendChild($checkbox);
  $newTodo.appendChild($todoText);
  $newTodo.appendChild($buttons);

  return $newTodo;
}


// 새로운 할일 추가 후 저장
$addTodo.addEventListener('click', () => {
  const todoContent = prompt('새로운 Todo를 추가해주세요!');

  if (todoContent) {
    const newTodo = {
      content: todoContent,
      completed: false
    };

    todoList.push(newTodo);
    saveTodoList();
    renderTodoList(); 
  }
});

// 로컬 스토리지에서 할일 목록을 불러오는 함수
function loadTodoList() {
  const savedTodoList = localStorage.getItem('todoList');
  if (savedTodoList) {
    todoList = JSON.parse(savedTodoList);
    renderTodoList();
  }
}

// 할일 목록을 로컬 스토리지에 저장하는 함수
function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// 할일 목록을 화면에 렌더링하는 함수
function renderTodoList() {
  $todoList.innerHTML = '';

  todoList.forEach((todo, index) => {
    const $newTodo = createTodoItem(todo.content, todo.completed);
    $todoList.appendChild($newTodo);
  });
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  renderTodoList();
}

// 체크박스 상태가 변경되었을 때 실행되는 함수
function toggleComplete(index) {
  if (index >= 0 && index < todoList.length) {
    todoList[index].completed = !todoList[index].completed;
    saveTodoList();
    renderTodoList();
  }
}