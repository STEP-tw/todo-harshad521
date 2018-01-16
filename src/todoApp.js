const Account = require('./account.js');
const TodoApp =  function () {
  this.accounts = {}
}
TodoApp.prototype = {
  addAccount : function(userName,fullName,password){
    this.accounts[userName] =  new Account(userName,fullName,password);
  },
  getAccount : function (userName) {
    return this.accounts[userName];
  },
  getAccountPassword : function(userName){
    return this.getAccount(userName).password;
  },
  doesPasswordMatch:function (userName,password) {
    return this.getAccountPassword(userName) == password;
  },
  areUserDetailsValid:function (userName,password) {
    let isUsernameValid=Object.keys(this.accounts).includes(userName);
    return isUsernameValid && this.doesPasswordMatch(userName,password);
  },
  setSessionId : function (userName,sessionid) {
    this.getAccount(userName).setSessionId(sessionid);
    return ;
  },
  getUserBySessionId : function(sessionid){
    let users = Object.keys(this.accounts);
    let TodoAppReference = this;
    let username = users.find(function(user) {
      return TodoAppReference.getSessionId(user) == sessionid;
    });
    return this.getAccount(username)||false;
  },
  getSessionId : function (userName) {
    return this.getAccount(userName).getSessionId();
  },
  deleteSessionId : function (userName) {
    this.getAccount(userName).deleteSessionId();
    return ;
  },
  addTodo : function (userName,todoTitle,date) {
    this.getAccount(userName).addTodo(todoTitle,date);
  },
  getTodo : function(userName,todoToken){
    return this.getAccount(userName).getTodo(todoToken);
  },
  insertTaskInTodo : function (userName,todoToken,taskTitle){
    this.getAccount(userName).insertTaskInTodo(todoToken,taskTitle);
  },
  deleteTaskInTodo : function (userName,todoToken,srNo) {
    this.getAccount(userName).deleteTaskInTodo(todoToken,srNo)
  },
  getTask : function(userName,todoToken,srNo){
    return this.getAccount(userName).getTaskInTodo(todoToken,srNo);
  },
  setTaskTitle : function(userName,todoToken,srNo,newTitle){
    return this.getAccount(userName).editTaskInTodo(todoToken,srNo,newTitle);
  },
  getTaskStatus : function(userName,todoToken,srNo){
    return this.getAccount(userName).getTaskStatus(todoToken,srNo);
  },
  setTaskStatus : function(userName,todoToken,srNo,status){
    return this.getAccount(userName).setTaskStatus(todoToken,srNo,status);
  },
  getTodoTitlesOnDate : function (username,date) {
    return this.getAccount(username).getTodoTitlesOnDate(date);
  },
  getTodosOnDate:function(username,date){
    return this.getAccount(username).getTodosOnDate(date);
  },
  getToken : function(username){
    return this.getAccount(username).getToken();
  },
  deleteTodo : function(username,date,todoTitle){
    this.getAccount(username).deleteTodo(date,todoTitle);
    return;
  },
  setTodoTitle: function(username,todoToken,newTitle){
    return this.getAccount(username).setTodoTitle(todoToken,newTitle);
  },
  setTodoDescription:function(username,todoToken,description) {
    this.getAccount(username).setTodoDescription(todoToken,description);
  },
  getTodoDescription:function(username,todoToken) {
    return this.getAccount(username).getTodoDescription(todoToken);
  }
}
module.exports = TodoApp;
