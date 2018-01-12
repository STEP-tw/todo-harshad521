
const getCurrentDate : function () {
  let date = new Date();
  day = date.getDay();
  month = date.getMonth()+1;
  year = date.getFullYear();
  return `${day}/${month}/${year}`
}

const Account = function(name,password){
  this.name = name;
  this.password = password;
  this.todos = {}
}

Account.prototype = {
  addTodo : function (title) {
    let date = getCurrentDate();
    let todo = new Todo(todoTitle);
    if(!Object.keys(this.todos).includes(date)){
      this.todos[date]={};
    }
    this.todos[date][todo.getTitle()] = todo;
    return;
  },
  getTodo: function (date,todoTitle) {
    return this.todos[date][todoTitle];
  },
  deleteTodo : function(date,todoTitle){
    delete this.getTodo(date,todoTitle);
    return;
  },
  insertTaskInTodo: function(date,todoTitle,task){
    this.getTodo(date,todoTitle).addTask(todoTitle);
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
  }
};

module.exports = Account;
