const $addTodo = document.querySelector('#add-todo');
const $todoList = document.querySelector('.todo-list');
const $clearTodo = document.querySelector('#clear-todo');

let todoList = [];

loadTodoList();

function createTodoItem(todoContent, index) {
  const $newTodo = document.createElement('li');
  $newTodo.className = 'todo-item';

  const $checkbox = document.createElement('input');
  $checkbox.type = 'checkbox';
  $checkbox.id = 'checkbox-' + index; 
  $checkbox.className = 'checkbox';

  $checkbox.addEventListener('change', () => {
    toggleComplete(index);
  });

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
  $editButton.addEventListener('click', () => {
    editTodo(index);
  });

  const $deleteButton = document.createElement('button');
  $deleteButton.className = 'delete-button';
  const $deleteImg = document.createElement('img');
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
  console.log("[create] new element added");

}


// 새로운 할일 추가 후 저장
$addTodo.addEventListener('click', () => {
  const todoContent = '할 일을 입력해보세요!';

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
  console.log("[system] todolist loaded");
}

// 할일 목록을 로컬 스토리지에 저장하는 함수
function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// 할일 목록을 화면에 렌더링하는 함수
function renderTodoList() {
  $todoList.innerHTML = '';
  todoList.forEach((todo, index) => {
    const $newTodo = createTodoItem(todo.content, index);
    $todoList.appendChild($newTodo);
  });
  console.log("[system] todolist rendered");
}

// 할 일 목록 삭제
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  renderTodoList();
  console.log("[delete] "+index +" element deleted")
}

$clearTodo.addEventListener('click', () => {
  todoList=[];
  saveTodoList();
  renderTodoList();
  console.log("[delete] clear all");
});

// 체크박스 상태 변경 토글
function toggleComplete(index) {
  if (index >= 0 && index < todoList.length) {
    todoList[index].completed = !todoList[index].completed;
    saveTodoList();
    renderTodoList();
  }
  console.log("[update] "+index+" element completed toggle changed");
}

// 할일 수정 함수
function editTodo(index) {
  const $todoText = $todoList.children[index].querySelector('.todo');
  const $paragraph = $todoText.querySelector('p');
  const $editButton = $todoList.children[index].querySelector('.edit-button');

  const $input = document.createElement('input');
  $input.type = 'text';
  $input.className = 'todo-input';
  $input.value = $paragraph.textContent;

  $todoText.removeChild($paragraph);
  $todoText.appendChild($input);
  $input.focus();

  $editButton.addEventListener('click', () => {
    todoList[index].content = $input.value;
    saveTodoList();
    renderTodoList();
  });

  $input.addEventListener('blur', () => {
    todoList[index].content = $input.value;
    saveTodoList();
    renderTodoList();
    console.log("[update] "+index +" element edited to "+$input.value);
  });
}