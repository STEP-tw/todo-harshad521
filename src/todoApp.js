const Account = require('./account.js');
const TodoApp =  function () {
  this.accounts = { }
}
TodoApp.prototype = {
  addAccount : function(userName,fullName,password){
    this.accounts[userName] =  new Account(fullName,password);
  },
  addTodo : function (userName,todoTitle) {
    this.getAccount(userName).addTodo(todoTitle);
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
  }
}
module.exports = TodoApp;
