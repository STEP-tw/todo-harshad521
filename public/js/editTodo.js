const getTodoTitlesOnDate =function () {
  let date = document.getElementById('date').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTodoTitleList)
  xmlReq.open('POST','/getTodoTitlesOnDate')
  xmlReq.send(`date=${getCurrentDate(date)}`);
}

const getCurrentDate = function (date) {
  let newDate = new Date(date);
  day = newDate.getDate();
  month = newDate.getMonth()+1;
  year = newDate.getFullYear();
  return `${year}-${month}-${day}`
}

const editTodo = function(){
  let todo = JSON.parse(this.responseText);
  let todoTitle = todo.title;
  let todoToken = todo.todoToken;
  let todoDescription = todo.description;
  let todoTaskKeys = Object.keys(todo.tasks);
  document.getElementById('todoToken').value = todoToken;
  let todoTasksHtml=todoTaskKeys.reduce(function(accumulate,todokey){
    let title = todo.tasks[todokey].title
    let htmlCode = `<input type='text' value='${title}' id='${todokey}'></input size='100'>`+
    `<button id='editTaskTitle' onclick='editTask(${todokey})'>save</button></br>`
    return accumulate+=htmlCode;
  },'');
  let todoTitleHtml = `<input type='text' id="newTitle" value='${todoTitle}'></input>`+
  `<button id='editTodoTitle' onclick='editTitle()'>save</button></br>`
  let todoDescriptionHtml = `<textArea id="newTodoDesc" width="588px" >${todoDescription}</textArea>`+
  `<button id='editTodoDesc' onclick='editTodoDesc()'>save</button></br>`;;
  let html = todoTitleHtml+todoDescriptionHtml+todoTasksHtml;
  document.getElementById('editBlock').innerHTML = html;
}

const editTodoDesc = function() {
  let todoTitle = document.getElementById("newTitle").value;
  let description = document.getElementById('newTodoDesc').value;
  let date = document.getElementById('date').value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/addDescription');
  xmlReq.send(`todoTitle=${todoTitle}&date=${getCurrentDate(date)}&todoDescription=${description}`);
}
//
 const editTask = function(id){
  let taskTitle=document.getElementById(id).value;
  let date = document.getElementById('date').value;
  let todoTitle = document.getElementById('newTitle').value;
  let srNo =id;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/setTaskTitle');
  xmlReq.send(`taskTitle=${taskTitle}&date=${getCurrentDate(date)}&todoTitle=${todoTitle}&srNo=${srNo}`);
}
//
const editTitle = function() {
  let date = document.getElementById('date').value;
  let todoTitle = document.getElementById('newTitle').value;
  let todoToken = document.getElementById('todoToken').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/setTodoTitle');
  xmlReq.send(`date=${getCurrentDate(date)}&todoTitle=${todoTitle}&todoToken=${todoToken}`);
 }

const getTodo = function () {
  let date = document.getElementById('date').value;
  let todoTitle = document.getElementById('todoTitle').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/getTodo');
  xmlReq.send(`date=${getCurrentDate(date)}&todoTitle=${todoTitle}`)
}
//
const addTask = function(){
  let todoTitle = document.getElementById('newTodoTitle').value;
  let taskTitle = document.getElementById("taskTitle").value;
  let token = document.getElementById("todoToken").innerText;
  let date = document.getElementById("date").value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo)
  xmlReq.open("POST",'/addTask');
  xmlReq.send(`todoTitle=${todoTitle}&date=${getCurrentDate(date)}&taskTitle=${taskTitle}`);
}
//
const updateTodoTitleList = function() {
  let todoTitleList = JSON.parse(this.responseText);
  let titles = todoTitleList.reduce(function(accumulate,todoTitle,index){
    return accumulate+=`<option value="${todoTitle}">`;
  },'')
  document.getElementById('todoTitles').innerHTML = titles;
}
