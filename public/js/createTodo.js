let link ='/createTodo';
const createTodo = function() {
  let todoTitle = document.getElementById("todoTitle").value;
  let token = document.getElementById("todoToken").innerText;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",link)
  xmlReq.send(`todoTitle=${todoTitle}&token=${token}`);
  disableCreateButton();
}

const disableCreateButton = function () {
  document.getElementById("createTodoButton").style.visibility = "hidden";
  document.getElementById("todoTitle").readOnly = true;
}

// const enableCreateButton = function(){
//   document.getElementById("todoTitle").readOnly = false;
//   document.getElementById("createTodoButton").style.visibility = "visible";
//   document.getElementById("editTodoButton").style.visibility = "hidden";
//   link = '/editTodoTitle';
// }

const displayToken = function(){
  document.getElementById('todoToken').innerText = this.responseText;
}

const getToken = function(){
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',displayToken)
  xmlReq.open("get",'/getToken')
  xmlReq.send();
}

const getCurrentDate = function () {
  let date = new Date();
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${year}-${month}-${day}`
}

const addTask = function(){
  let todoTitle = document.getElementById("todoTitle").value;
  let taskTitle = document.getElementById("taskTitle").value;
  let token = document.getElementById("todoToken").innerText;
  let date = getCurrentDate();
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTaskList)
  xmlReq.open("POST",'/addTask');
  xmlReq.send(`todoTitle=${todoTitle}&date=${date}&taskTitle=${taskTitle}`);
}

const changeStatus = function(id){
  let srNo = id;
  let status = document.getElementById(id).checked;
  let todoTitle = document.getElementById("todoTitle").value;
  let date = getCurrentDate();
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/changeStatus');
  xmlReq.send(`srNo=${srNo}&date=${date}&todoTitle=${todoTitle}&status=${status}`);
}
const updateTaskList = function () {
  let todo = JSON.parse(this.responseText);
  let tasks = todo.tasks;
  let taskKeys = Object.keys(tasks);
  let generatedTaskCode = taskKeys.reduce(function(accumulate,taskTitle,index){
    let title= tasks[taskTitle].title;
    let srNo = index+1;
    return accumulate = accumulate + `<input type='checkbox' onclick='changeStatus(this.id)' id='${srNo}' size='100'>${title}</input><br />`;
  },``);
  document.getElementById("tasks").innerHTML = generatedTaskCode;
  taskKeys.forEach(function(taskKey,index){
    let status= tasks[taskKey].completionStatus;
    document.getElementById(index+1).checked = status;
  })
}

window.onload = getToken;
