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

const updateTodoTitleList = function() {
  let todoTitleList = JSON.parse(this.responseText);
  let titles = todoTitleList.reduce(function(accumulate,todoTitle,index){
    return accumulate+=`<option value="${todoTitle}">`;
  },'')
  document.getElementById('todoTitles').innerHTML = titles;
}

const changeStatus = function(id){
  let srNo = id;
  let status = document.getElementById(id).checked;
  let todoTitle = document.getElementById("todoTitle").value;
  let date = document.getElementById('date').value
  let xmlReq =  new XMLHttpRequest();
  xmlReq.open("POST",'/changeStatus');
  xmlReq.send(`srNo=${srNo}&date=${getCurrentDate(date)}&todoTitle=${todoTitle}&status=${status}`);
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

const getTodo = function () {
  let date = document.getElementById('date').value;
  let todoTitle = document.getElementById('todoTitle').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',updateTaskList);
  xmlReq.open('POST','/getTodo');
  xmlReq.send(`date=${getCurrentDate(date)}&todoTitle=${todoTitle}`)
}
