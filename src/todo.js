const Task = require("./task.js");
const Todo = function(title,date,token){
  this.todoToken = token ;
  this.title= title;
  this.description= "";
  this.tasks= {};
  this.srNo= 1;
  this.date= date;
};

Todo.prototype={
  incrementSrNo:function(){
    this.srNo++;
    return;
  },
  addTask : function(title){
    let task = new Task(title);
    this.tasks[this.getSrNo()] = task;
    this.incrementSrNo();
    return;
  },
  deleteTask: function(srNo){
    delete this.tasks[srNo];
    return;
  },
  getSrNo:function(){
    return this.srNo;
  },
  getTotalTasksCount : function(){
    return Object.keys(this.tasks).length;;
  },
  getCompletedTaskCount : function () {
    let TaskReference = this;
    let keys = Object.keys(this.tasks);
    return keys.reduce(function(accumulator,key) {
      if(TaskReference.getTask(key).getStatus()){
        accumulator++;
      }
      return accumulator;
    },0);
  },
  getPendingTaskCount : function () {
    return this.getTotalTasksCount()-this.getCompletedTaskCount();
  },
  getTaskTitle : function (srNo) {
    return this.getTask(srNo).getTitle();
  },
  setTaskTitle : function (srNo,title) {
    this.getTask(srNo).setTitle(title);
    return;
  },
  editTodoTitle : function(title) {
    this.title = title;
    return;
  },
  setTodoDescription : function(description){
    this.description=description;
    return;
  },
  getTaskStatus : function (srNo) {
    return this.getTask(srNo).getStatus();
  },
  setTaskStatus : function (srNo,status) {
    this.getTask(srNo).setStatus(status);
    return;
  },
  getTask:function (srNo) {
    return this.tasks[srNo];
  },
  getTitle: function() {
    return this.title;
  },
  setTitle: function (newTitle) {
    this.title = newTitle;
    return;
  },
  getToken: function(){
    return this.todoToken;
  },
  getDate: function() {
    return this.date;
  }
}

module.exports = Todo;
