<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=childevnote&fontSize=90" />
<h2>개인 프로젝트 : Todo list 만들기</h2>
<summary><h2>사용 스택</h2></summary> 
<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
</div>

<details open>
<summary><h2>📂 파일 구조</h2></summary>
<div markdown="1">


```
├─📂assets - 사용할 이미지들
│  └─📂icons
│    └─🖼️images(svg)
│ 
├─📂styles - 적용한 스타일
│  └─🖌️main.css
│  └─🖌️general.css
│  └─🖌️header.css
│ 
└─🗒️index.html
└─🚀app.js
```

</div>
</details>

<summary><h2>기대 결과</h2></summary>
<img src="assets\images\1.gif">

<summary><h2>최종 결과</h2></summary>
<img src="assets\images\2.jpg">
<img src="assets\images\3.jpg">
<img src="assets\images\4.jpg">
<img src="assets\images\5.jpg">
<img src="assets\images\6.jpg">
<img src="assets\images\7.jpg">
<img src="assets\images\8.jpg">



<h3>주요 기능</h3>

<summary> editTodo(할 일 수정) 함수</summary>
 
```  
function editTodo(index) {
  const $todoText = $todoList.children[index].querySelector('.todo');
  const $paragraph = $todoText.querySelector('p');

  const $input = document.createElement('input');
  $input.type = 'text';
  $input.className = 'todo-input';
  $input.value = $paragraph.textContent;

  $todoText.removeChild($paragraph);
  $todoText.appendChild($input);
  $input.focus();

  $input.addEventListener('blur', () => {
    todoList[index].content = $input.value;
    saveTodoList();
    renderTodoList();
    console.log("[update] " + index + " element edited to " + $input.value);
  });
}
```
<li>
   $paragraph.textContent값을 input.value로 넘기고, $paragraph 삭제 후 바로 input 태그 추가, input에 focus를 잡아줌
</li>
<li>
  blur 시 입력을 마친 것으로 판단하고 input.value를 해당 content에 저장
</li>
<li>
  텍스트를 입력 칸으로 바꾸고 다시 텍스트로 바꾸는 과정 구현
</li>

<summary> checkbox 체크표시가 새로고침 시 유지되지 않는 이슈 해결 </summary>
 
```  
function renderTodoList() {
  $todoList.innerHTML = '';
  todoList.forEach((todo, index) => {
    const $newTodo = createTodoItem(todo.content, index);
    $todoList.appendChild($newTodo);
    const $checkbox = document.getElementById('checkbox-' + index);
    $checkbox.checked = todoList[index].completed;
  });
  console.log("[system] todolist rendered");
}

...

function toggleComplete(index) {
  if (index >= 0 && index < todoList.length) {
    todoList[index].completed = !todoList[index].completed;
    saveTodoList();
    const $checkbox = document.getElementById('checkbox-' + index);
    $checkbox.checked = todoList[index].completed;
  }
  console.log("[update] " + index + " element completed toggle changed");
}
```
<li>
  렌더될 때 저장되어 있는 체크박스 값을 한 번 검사해서 그 값으로 체크박스 활성
</li>


