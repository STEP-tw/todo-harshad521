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
  let todokeys = Object.keys(todo);
  todokeys.reduce(function(accumulate,todokey){

  },'')
}

const getTodo = function () {
  let date = document.getElementById('date').value;
  let todoTitle = document.getElementById('todoTitle').value;
  let xmlReq = new XMLHttpRequest();
  xmlReq.addEventListener('load',editTodo);
  xmlReq.open('POST','/getTodo');
  xmlReq.send(`date=${getCurrentDate(date)}&todoTitle=${todoTitle}`)
}


const updateTodoTitleList = function() {
  let todoTitleList = JSON.parse(this.responseText);
  let titles = todoTitleList.reduce(function(accumulate,todoTitle,index){
    return accumulate+=`<option value="${todoTitle}">`;
  },'')
  document.getElementById('todoTitles').innerHTML = titles;
}
