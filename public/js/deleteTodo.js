const deleteTodo = function () {
  let a = document.getElementById('todoTitle');
  console.log(a);
  // let date = document.getElementById('date').value;
  // let todoTitle = document.getElementById('todoTitle').value;
  // let xmlReq = new XMLHttpRequest();
  // xmlReq.addEventListener('load',updateTodoTitleList);
  // xmlReq.open('POST','/deleteTodo');
  // xmlReq.send(`date=${getCurrentDate(date)}&todoTitle=${todoTitle}`);
}

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
const setTodoId=function (id) {
  console.log("hi");
}
const updateTodoTitleList = function() {
  let tokenTitlePairList = JSON.parse(this.responseText);
  let titles = tokenTitlePairList.reduce(function(accumulate,tokenTitlePair,index){
    let token=Object.keys(tokenTitlePair)[0];
    let title = tokenTitlePair[token]
    return accumulate+=`<option id='${token}' onselect=''setTodoId' value="${title}">`;
  },"")
  document.getElementById('todoTitles').innerHTML = titles;
}
