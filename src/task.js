const Task = function (title) {
  this.title = title;
  this.completionStatus = false;
}

Task.prototype = {
  setStatus : function(status){
     this.completionStatus = status;
  },
  setTitle : function(title){
     this.title = title;
  },
  getTitle : function() {
    return this.title;
  },
  getStatus : function() {
    return this.completionStatus;
  }
}

module.exports = Task;
