const Todo = require('./todo.js');
const getCurrentDate = function () {
  let date = new Date();
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${year}-${month}-${day}`
}

const getIndexOfElement = function (element,list) {
  return list.findIndex(function functionName() {

  });
}

const Account = function(userName,name,password){
  this.username=userName;
  this.name = name;
  this.password = password;
  this.todos = {};
  //this.todos = [];
  this.token = 1;
}

Account.prototype = {
  addTodo : function (todoTitle) {
    let date = getCurrentDate();
    if(!Object.keys(this.todos).includes(date)){
      this.todos[date]={};
      this.resetToken();
    }
    let todo = new Todo(todoTitle,date,this.nextToken());
    this.getTodosOnDate(date)[todo.getTitle()] = todo;
    //this.todo.push(date);
    return;
  },
  nextToken :function(){
    this.token++;
    return this.token;
  },
  resetToken : function(){
    this.token = 1;
  },
  getUsername : function () {
    return this.username;
  },
  getTodo: function (date,todoTitle) {
    return this.getTodosOnDate(date)[todoTitle];
    /*return this.getTodosOnDate(date).find(function(todo){
    return todo.getTitle()==todoTitle;
  })*/
  },
  deleteTodo : function(date,todoTitle){
    delete this.todos[date][todoTitle];
    //
    return;
  },
  insertTaskInTodo: function(date,todoTitle,task){
    this.getTodo(date,todoTitle).addTask(task);
    return;
  },
  editTaskInTodo : function(date,todoTitle,srNo,newTaskTitle){
    this.getTodo(date,todoTitle).setTaskTitle(srNo,newTaskTitle);
    return;
  },
  deleteTaskInTodo : function(date,todoTitle,srNo){
    this.getTodo(date,todoTitle).deleteTask(srNo);
    return;
  },
  setTaskStatus : function(date,todoTitle,srNo,status){
    this.getTodo(date,todoTitle).setStatus(srNo,status);
    return;
  },
  getTaskStatus : function(date,todoTitle,srNo){
    return this.getTodo(date,todoTitle).getStatus(srNo,status);
  },
  setSessionId : function (sessionId){
    this["sessionId"] = sessionId;
  },
  getSessionId : function (){
    return this.sessionId;
  },
  deleteSessionId : function () {
    delete this.sessionid;
  },
  getTodosOnDate:function(date) {
    return this.todos[date];
    /*return this.todo.filter(function(todo){
    return todo.date==date;
  })*/
  },
  getTodoTitlesOnDate:function(date) {
    let todosOnGivenDate = this.getTodosOnDate(date);
    return Object.keys(todosOnGivenDate);
  },
  setTodoTitle:function(date,token,newTitle) {
    let todoTitleList = this.getTodoTitlesOnDate(date)
    let AccountReference = this;
    let todoTitle = todoTitleList.find(function(title){
      return AccountReference.getTodo(date,title).getToken() == token;
    })
    let todo = this.getTodo(date,todoTitle);
    todo.setTitle(newTitle);
    return todo;
  },
  getToken: function () {
    return this.token;
  },
  setTodoDescription : function(date,todoTitle,description){
    this.getTodo(date,todoTitle).setTodoDescription(description);
  }
};

module.exports = Account;
