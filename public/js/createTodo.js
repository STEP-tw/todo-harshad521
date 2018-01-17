const getCurrentDate = function () {
  let date = new Date();
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${year}-${month}-${day}`
}

const createTodo = function() {
  let todoTitle = document.getElementById("todoTitle").value;
  // let token = document.getElementById("todoToken").value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/createTodo');
  xmlReq.send(`todoTitle=${todoTitle}&date=${getCurrentDate()}`);
  disableCreateButton();
  enableOtherFields();
}

const disableCreateButton = function () {
  document.getElementById("createTodoButton").style.visibility = "hidden";
  document.getElementById("todoTitle").readOnly = true;
}

const enableOtherFields = function () {
  document.getElementById("todoDesc").style.visibility = "visible";
  document.getElementById("descLabel").style.visibility = "visible";
  document.getElementById("addTodoDescription").style.visibility = "visible";
  document.getElementById("addTask").style.visibility = "visible";
  document.getElementById("taskTitle").style.visibility = "visible";
}

const addTodoDescription = function() {
  // let todoTitle = document.getElementById("todoTitle").value;
  let description = document.getElementById('todoDesc').value;
  let token = document.getElementById("todoToken").value;
  // let date = getCurrentDate();
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/addDescription');
  xmlReq.send(`todoToken=${token}&todoDescription=${description}`);
  disableAddDescButton();
}

const disableAddDescButton=function () {
  document.getElementById("todoDesc").readOnly = true;
  document.getElementById("addTodoDescription").style.visibility = "hidden";
}
const displayToken = function(){
  document.getElementById('todoToken').value = +this.responseText+1;
}

const getToken = function(){
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',displayToken)
  xmlReq.open("get",'/getToken')
  xmlReq.send();
}

// const getCurrentDate = function () {
//   let date = new Date();
//   day = date.getDate();
//   month = date.getMonth()+1;
//   year = date.getFullYear();
//   return `${year}-${month}-${day}`
// }

const addTask = function(){
  let taskTitle = document.getElementById("taskTitle").value;
  let todoToken = document.getElementById("todoToken").value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTaskList)
  xmlReq.open("POST",'/addTask');
  xmlReq.send(`todoToken=${todoToken}&taskTitle=${taskTitle}`);
}

const changeStatus = function(id){
  let srNo = id;
  let status = document.getElementById(id).checked;
  let todoToken = document.getElementById("todoToken").value;
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/changeStatus');
  xmlReq.send(`srNo=${srNo}&todoToken=${todoToken}&status=${status}`);
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
