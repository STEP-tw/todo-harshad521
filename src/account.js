const getCurrentDate = function () {
  let date = new Date();
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${year}-${month}-${day}`
}

////////////////////////////////////////////////////////////////////////////////


const Todo = require('./todo.js');

const Account = function(userName,name,password){
  this.username=userName;
  this.name = name;
  this.password = password;
  this.todos = {};
  this.token = 0;
}

Account.prototype = {
  addTodo : function (todoTitle,date=getCurrentDate()) {
    let token = this.nextToken();
    let todo = new Todo(todoTitle,date,token);
    this.todos[token]=todo;
    return;
  },
  nextToken :function(){
    this.token++;
    return this.token;
  },
  resetToken : function(){
    this.token = 0;
  },
  getUsername : function () {
    return this.username;
  },
  getTodo: function (todoToken) {
    return this.todos[todoToken];
  },
  deleteTodo : function(todoToken){
    delete this.todos[todoToken];
    return;
  },
  insertTaskInTodo: function(todoToken,task){
    this.getTodo(todoToken).addTask(task);
    return;
  },
  editTaskInTodo : function(todoToken,srNo,newTaskTitle){
    this.getTodo(todoToken).setTaskTitle(srNo,newTaskTitle);
    return;
  },
  deleteTaskInTodo : function(todoToken,srNo){
    this.getTodo(todoToken).deleteTask(srNo);
    return;
  },
  setTaskStatus : function(todoToken,srNo,status){
    this.getTodo(todoToken).setTaskStatus(srNo,status);
    return;
  },
  getTaskStatus : function(todoToken,srNo){
    return this.getTodo(todoToken).getTaskStatus(srNo);
  },
  setSessionId : function (sessionId){
    this["sessionId"] = sessionId;
  },
  getSessionId : function (){
    return this.sessionId;
  },
  deleteSessionId : function () {
    delete this.sessionId;
  },
  getTodosOnDate:function(date) {
    let todoKeys=Object.keys(this.todos)
    let t = todoKeys.reduce((accumulator,todoKey)=>{
      if(this.getTodo(todoKey).date==date){
        accumulator.push(this.getTodo(todoKey))
      }
      return accumulator;
    },[])
    return t;
  },
  getTodoTitlesOnDate:function(date) {
    let todosOnGivenDate = this.getTodosOnDate(date);
    return todosOnGivenDate.map(function(todo){
      let token = todo.getToken();
      let title = todo.getTitle();
      let tokenTitlePair = {}
      tokenTitlePair[token]=title;
      return tokenTitlePair;
    })
  },
  getTodoTitle:function (todoToken) {
    return this.getTodo(todoToken).getTitle();
  },
  setTodoTitle:function(todoToken,newTitle) {
    this.getTodo(todoToken).setTitle(newTitle);
    todo = this.getTodo(todoToken);
    return todo;
  },
  getToken: function () {
    return this.token;
  },
  setTodoDescription : function(todoToken,description){
    this.getTodo(todoToken).setTodoDescription(description);
  },
  getTaskInTodo:function(todoToken,srNo) {
    return this.getTodo(todoToken).getTask(srNo);
  },
  getTodoDescription : function(todoToken) {
    return this.getTodo(todoToken).getDescription();
  }
};

module.exports = Account;
