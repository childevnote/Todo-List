const $addTodo = document.querySelector('#add-todo');
const $todoList = document.querySelector('.todo-list');

loadTodoList();


function createTodoItem(todoContent) {
  const $newTodo = document.createElement('li');
  $newTodo.className = 'todo-item';

  const $checkbox = document.createElement('input');
  $checkbox.type = 'checkbox';
  $checkbox.id = 'checkbox';

  const $todoText = document.createElement('div');
  $todoText.className = 'todo';

  const $paragraph = document.createElement('p');
  $paragraph.textContent = todoContent;
  $todoText.appendChild($paragraph);

  const $buttons = document.createElement('div');
  $buttons.className = 'todo-item-buttons';

  const $editButton = document.createElement('button');
  $editButton.className = 'edit-button';

  const $editImg = document.createElement('img');
  $editImg.src = 'assets/icons/pencil.svg';
  $editImg.alt = 'edit button';
  $editButton.appendChild($editImg);

  const $deleteButton = document.createElement('button');
  $deleteButton.className = 'delete-button';

  const $deleteImg = document.createElement('img');
  $deleteImg.src = 'assets/icons/delete.svg';
  $deleteImg.alt = 'delete button';

  $deleteButton.appendChild($deleteImg);
  $buttons.appendChild($editButton);
  $buttons.appendChild($deleteButton);
  $newTodo.appendChild($checkbox);
  $newTodo.appendChild($todoText);
  $newTodo.appendChild($buttons);

  return $newTodo;
}

$addTodo.addEventListener('click', () => {
  const todoContent = prompt('새로운 Todo를 추가해주세요!');

  if (todoContent) {
    const $newTodo = createTodoItem(todoContent);
    $todoList.appendChild($newTodo);
    saveTodoList(); // 할일 목록 저장
  }
});

const $deleteButton = document.createElement('button');

$deleteButton.addEventListener('click', (e) => {
  const $todoItem = e.target.closest('.todo-item');
  if ($todoItem && $todoList.contains($todoItem)) {
    $todoList.removeChild($todoItem);
    saveTodoList(); // 할일 목록 저장
  }
});


// 로컬 스토리지에서 할일 목록을 불러오는 함수
function loadTodoList() {
  const savedTodoList = localStorage.getItem('todoList');
  if (savedTodoList) {
    $todoList.innerHTML = savedTodoList;
  }
}

// 로컬 스토리지에 할일 목록을 저장하는 함수
function saveTodoList() {
  localStorage.setItem('todoList', $todoList.innerHTML);
}

