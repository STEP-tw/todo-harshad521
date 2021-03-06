const getTodoTitlesOnDate =function () {
  let date = document.getElementById('date').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTodoTitleList)
  xmlReq.open('POST','/getTodoTitlesOnDate')
  xmlReq.send(`date=${getCurrentDate(date)}`);
}

const deleteTodo=function(){
  let todoToken=document.getElementById('todoToken').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTodoTitleList);
  xmlReq.open('POST','/deleteTodo');
  xmlReq.send(`todoToken=${todoToken}`);
}

const getCurrentDate = function (date) {
  let newDate = new Date(date);
  day = newDate.getDate();
  month = newDate.getMonth()+1;
  year = newDate.getFullYear();
  return `${year}-${month}-${day}`
}

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
  let todoToken = todo.todoToken;
  let taskKeys = Object.keys(tasks);
  let todoTitle=todo.title;
  let todoDescription = todo.description;
  let generatedTaskCode = taskKeys.reduce(function(accumulate,taskTitle,index){
    let title= tasks[taskTitle].title;
    let srNo = index+1;
    return accumulate = accumulate + `<input type='checkbox' onclick='changeStatus(this.id)' id='${srNo}' size='100'>${title}</input><br />`;
  },``);
  document.getElementById("tasks").innerHTML = generatedTaskCode;
  document.getElementById("todoTitleHeader").innerHTML = todoTitle;
  document.getElementById("todoToken").value = todoToken;
  document.getElementById("todoDescHeader").innerHTML = todoDescription;
  taskKeys.forEach(function(taskKey,index){
    let status= tasks[taskKey].completionStatus;
    document.getElementById(taskKey).checked = status;
  })
}

const getTodo = function (todoToken) {
  document.getElementById('todoTitleList').innerHTML = null;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTaskList);
  xmlReq.open('POST','/getTodo');
  xmlReq.send(`date=${getCurrentDate(date)}&todoToken=${todoToken}`)
}
