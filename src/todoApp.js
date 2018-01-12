const Account = require('./account.js');
const TodoApp =  function () {
  this.accounts = { }
}
TodoApp.prototype = {
  addAccount : function(userName,fullName,password){
    this.accounts[userName] =  new Account(userName,fullName,password);
  },
  addTodo : function (userName,todoTitle) {
    this.getAccount(userName).addTodo(todoTitle);
  },
  areUserDetailsValid:function (userName,password) {
    let isUsernameValid=Object.keys(this.accounts).includes(userName);
    return isUsernameValid && this.doesPasswordMatch(userName,password);
  },
  doesPasswordMatch:function (userName,password) {
    return this.getAccountPassword(userName) == password;
  },
  deleteTodo: function(userName,date,todoTitle){
    delete this.getAccount(userName).getTodo(date,todoTitle);
  },
  getAccount : function (userName) {
    return this.accounts[userName];
  },
  getAccountPassword : function(userName){
    return this.getAccount(userName).password;
  },
  getTodo : function(userName,date,todoTitle){
    return this.getAccount(userName).getTodo(date,todoTitle);
  },
  insertTaskInTodo : function (userName,date,todoTitle,taskTitle){
    this.getAccount(userName).insertTaskInTodo(date,todoTitle,taskTitle);
  },
  deleteTaskInTodo : function (userName,date,todoTitle,srNo) {
    this.getAccount(userName).deleteTaskInTodo(date,todoTitle,srNo)
  },
  getTask : function(userName,date,todoTitle,srNo){
    return this.getTodo(userName,date,todoTitle).getTask(srNo);
  },
  setTaskTitle : function(userName,date,todoTitle,srNo,newTitle){
    return this.getTodo(userName,date,todoTitle).setTaskTitle(srNo,newTitle);
  },
  getTaskStatus : function(userName,date,todoTitle,srNo){
    return this.getTodo(userName,date,todoTitle).getStatus(srNo);
  },
  setTaskStatus : function(userName,date,todoTitle,srNo,status){
    return this.getTodo(userName,date,todoTitle).setTaskStatus(srNo,status);
  },
  setSessionId : function (userName,sessionid) {
    this.getAccount(userName).setSessionId(sessionid);
    return ;
  },
  getSessionId : function (userName) {
    return this.getAccount(userName).getSessionId();
  },
  deleteSessionId : function (userName) {
    this.getAccount(userName).deleteSessionId();
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
  getTodoTitlesOnDate : function (username,date) {
    return this.getAccount(username).getTodoTitlesOnDate(date);
  },
  getTodosOnDate:function(username,date){
    return this.getAccount(username).getTodosOnDate(date);
  },
  getToken : function(username){
    return this.getAccount(username).getToken();
  }
}
module.exports = TodoApp;
