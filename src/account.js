const Todo = require('./todo.js');
const getCurrentDate = function () {
  let date = new Date();
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${year}-${month}-${day}`
}

const Account = function(userName,name,password){
  this.username=userName;
  this.name = name;
  this.password = password;
  this.todos = {};
  this.token = 1;
}

Account.prototype = {
  addTodo : function (todoTitle) {
    let date = getCurrentDate();
    if(!Object.keys(this.todos).includes(date)){
      this.todos[date]={};
      this.resetToken();
    }
    let todo = new Todo(todoTitle,this.nextToken());
    this.getTodosOnDate(date)[todo.getTitle()] = todo;
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
  },
  deleteTodo : function(date,todoTitle){
    delete this.getTodo(date,todoTitle);
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
    console.log(date);
    console.log(this.todos);
    return this.todos[date];
  },
  getTodoTitlesOnDate:function(date) {
    return Object.keys(this.getTodosOnDate(date));
  },
  setTodoTitle:function(date,token,newTitle) {
    let todoTitleList = getTodoTitlesOnDate(date)
    let AccountReference = this;
    let todo = todoTitleList.find(function(todoTitle){
      return AccountReference.getTodosOnDate(date)[todoTitle].token == token;
    })
    todo.setTitle(newTitle);
  },
  getToken: function () {
    return this.token;
  }
};

module.exports = Account;
