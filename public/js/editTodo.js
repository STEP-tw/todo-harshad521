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
  `<button id='editTodoDesc' onclick='editTodoDesc()'>save</button></br>`;
  let html = todoTitleHtml+todoDescriptionHtml+todoTasksHtml;
  document.getElementById('editBlock').innerHTML = html;
}

const editTodoDesc = function() {
  let todoToken = document.getElementById("todoToken").value;
  let description = document.getElementById('newTodoDesc').value;
  let date = document.getElementById('date').value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/addDescription');
  xmlReq.send(`todoToken=${todoToken}&todoDescription=${description}`);
}
//
 const editTask = function(id){
  let taskTitle=document.getElementById(id).value;
  let todoToken = document.getElementById('todoToken').value;
  let srNo =id;
  let link='/setTaskTitle';
  if(taskTitle.length==0){
    link='/deleteTask'
  }
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST',link);
  xmlReq.send(`taskTitle=${taskTitle}&todoToken=${todoToken}&srNo=${srNo}`);
}
//
const editTitle = function() {
  let todoTitle = document.getElementById('newTitle').value;
  let todoToken = document.getElementById('todoToken').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/setTodoTitle');
  xmlReq.send(`todoTitle=${todoTitle}&todoToken=${todoToken}`);
 }

const getTodo = function (todoToken) {
  document.getElementById('todoTitleList').innerHTML = null;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/getTodo');
  xmlReq.send(`todoToken=${todoToken}`)
}
//
const addTask = function(){
  let todoToken = document.getElementById('todoToken').value;
  console.log(todoToken);
  let taskTitle = document.getElementById("taskTitleInEdit").value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo)
  xmlReq.open("POST",'/addTask');
  xmlReq.send(`todoToken=${todoToken}&taskTitle=${taskTitle}`);
}
//
const updateTodoTitleList = function() {
  let tokenTitlePairList = JSON.parse(this.responseText);
  console.log("hi",tokenTitlePairList);
  let titles = tokenTitlePairList.reduce(function(accumulate,tokenTitlePair,index){
    let token=Object.keys(tokenTitlePair)[0];
    let title = tokenTitlePair[token]
    return accumulate+=`<li id="${token}" onclick='getTodo(this.id)'>${title}</li>`;
  },"")
  document.getElementById('todoTitleList').innerHTML = titles;
}
// const updateTodoTitleList = function() {
//   let todoTitleList = JSON.parse(this.responseText);
//   let titles = todoTitleList.reduce(function(accumulate,todoTitle,index){
//     return accumulate+=`<option value="${todoTitle}">`;
//   },'')
//   document.getElementById('todoTitles').innerHTML = titles;
// }
