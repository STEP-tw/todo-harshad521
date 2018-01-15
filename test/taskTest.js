const chai = require('chai');
const assert = chai.assert;
const Task = require('./../src/task');

describe("Task =>",function () {
  describe("Create Task",function () {
    it("It Should create the object with its attribute",function(){
      let task = new Task("To do something");
      let expected = {
        title: "To do something",
        completionStatus: false
      }
      assert.deepInclude(task,expected);
    })
  })

  describe("Test task prototypes",function () {
    let task;
    beforeEach(function() {
      task = new Task("To do something");
    });
    it("getStatus => Should return status of task",function(){
      assert.isNotOk(task.getStatus());
    });
    it("setStatus => Should set status of task",function(){
      let expected = {
        title: "To do something",
        completionStatus: true
      }
      task.setStatus(true);
      assert.deepInclude(task,expected);
    });
    it("getTitle => Should return title of task",function(){
      assert.equal(task.getTitle(),"To do something");
    });
    it("setTitle => Should set title of task",function(){
      let expected = {
        title: "To do nothing",
        completionStatus: false
      }
      task.setTitle("To do nothing");
      assert.deepInclude(task,expected);
    });
  })

})
