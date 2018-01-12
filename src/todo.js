const Task = require("./task.js");
const Todo = function(title){
  this.title= title;
  this.description= "";
  this.tasks= {};
  this.srNo= 1;
};

Todo.prototype={
  incrementSrNo:function(){
    this.srNo++;
  },
  addTask : function(statement){
    let task = new Task(statement);
    this.tasks[this.getSrNo()] = task;
    this.incrementSrNo();
  },
  deleteTask: function(srNo){
    delete this.tasks[srNo];
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
  },
  editTodoTitle : function(title) {
    this.title = title;
  },
  addTodoDescription : function(description){
    this.description=description;
  },
  getTaskStatus : function (srNo) {
    return this.getTask(srNo).getStatus();
  },
  setTaskStatus : function (srNo,status) {
    this.getTask(srNo).setStatus(status);
  },
  getTask:function (srNo) {
    return this.tasks[srNo];
  }
}

module.exports = Todo;
