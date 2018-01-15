const chai = require('chai');
const chaiAssert = chai.assert;
const assert =require('assert');
const Todo = require('./../src/todo.js');
const Task = require('./../src/task.js');
describe("Todo",function () {
  describe("Create Todo",function () {
    it("Should create the object with its attribute",function(){
      let todo = new Todo("Todo for work",'2018-1-15',1);
      let expected = {};
      expected["todoToken"] = 1;
      expected["title"] = "Todo for work";
      expected["description"] = "";
      expected["tasks"] = {};
      expected["srNo"] = 0;
      expected["date"]='2018-1-15';
      chaiAssert.deepInclude(expected,todo);
    })
  });
  describe("Test todo prototypes",function () {
    let todo;
    let expected = {};
    beforeEach(function () {
      todo = new Todo("Todo for work",'2018-1-15',1);
      expected["todoToken"] = 1;
      expected["title"] = "Todo for work";
      expected["description"] = "";
      expected["tasks"] = {};
      expected["srNo"] = 0;
      expected["date"]='2018-1-15';
    });
    describe("addTask()",function(){
      it("Should add the task to specified todo",function(){
        expected.tasks["1"]=new Task('task1');
        expected.srNo =1;
        todo.addTask("task1");
        chaiAssert.deepInclude(expected,todo);
      });
    });
    describe("nextSrNo()",function(){
      it("Should increment SrNo and give",function(){
        expected.srNo=1;
        todo.nextSrNo();
        chaiAssert.deepInclude(expected,todo);
      });
    });
    describe("deleteTask()",function(){
      it("Should delete Task when SrNo given",function(){
        expected.tasks["1"]=new Task('task1');
        expected.srNo =1;
        todo.addTask("task1");
        chaiAssert.deepInclude(expected,todo);
        todo.deleteTask(1);
        expected.tasks={};
        expected.srNo =1;
        chaiAssert.deepInclude(expected,todo);
      })
    })
    describe("getTaskTitle()",function(){
      it("Should return task title of given SrNo.",function(){
        todo.addTask("task1");
        todo.addTask("task2");
        chaiAssert.equal("task2",todo.getTaskTitle(2));
      });
    });
    describe("setTaskTitle()",function(){
      it("Should set task title of given SrNo.",function(){
        todo.addTask("task1");
        todo.addTask("task2");
        todo.setTaskTitle(2,"newTitle")
        chaiAssert.equal("newTitle",todo.getTaskTitle(2));
      });
    });
    describe("getTaskStatus()",function(){
      it("Should return completion status of task when given SrNo.",function(){
        todo.addTask("task1");
        todo.addTask("task2");
        chaiAssert.equal(false,todo.getTaskStatus(2));
      })
    })
    describe("setTaskStatus()",function(){
      it("Should set completion status of task when given SrNo.",function(){
        todo.addTask("task1");
        todo.addTask("task2");
        todo.setTaskStatus(2,true)
        chaiAssert.isNotOk(todo.getTaskStatus(1));
        chaiAssert.isOk(todo.getTaskStatus(2));
      });
      it("Should set completion status of task when given SrNo.",function(){
        todo.addTask("task1");
        todo.addTask("task2");
        todo.setTaskStatus(1,true)
        chaiAssert.isOk(todo.getTaskStatus(1));
        chaiAssert.isNotOk(todo.getTaskStatus(2));
      });
    });
    describe("getTask()",function(){
      it("Should get task when given SrNo.",function(){
        let expectedTask = new Task("task1")
        todo.addTask("task1");
        chaiAssert.deepEqual(todo.getTask(1),expectedTask);
      });
    });
    describe("getTitle()",function(){
      it("Should get title when given SrNo.",function(){
        let expectedTitle = "Todo for work";
        chaiAssert.equal(todo.getTitle(),expectedTitle);
      });
    });
    describe("setTitle()",function(){
      it("Should set title when given SrNo.",function(){
        let expectedTitle = "Todo for day";
        todo.setTitle(expectedTitle);
        chaiAssert.equal(todo.getTitle(),expectedTitle);
      });
    });
    describe("getToken()",function(){
      it("Should give token",function(){
        chaiAssert.equal(todo.getToken(),1);
      });
    });
    describe("getDate()",function(){
      it("Should give date of todo",function(){
        chaiAssert.equal(todo.getDate(),"2018-1-15");
      });
    });
    describe("setTodoDescription()",function(){
      it("Should set description of todo",function(){
        chaiAssert.deepInclude(todo,expected);
        let expectedDesc = "setting up new description";
        expected.description = expectedDesc;
        todo.setTodoDescription(expectedDesc)
        chaiAssert.deepInclude(todo,expected)
      });
    });
    describe("Test all count functions",function(){
      describe("getTotalTasksCount()",function(){
        it("Should give count of all tasks added",function(){
          chaiAssert.equal(0,todo.getTotalTasksCount());
          todo.addTask("task1");
          chaiAssert.equal(1,todo.getTotalTasksCount());
          todo.addTask("task2");
          todo.addTask("task3");
          chaiAssert.equal(3,todo.getTotalTasksCount());
        });
      });
      describe("getCompletedTaskCount()",function(){
        it("Should give count of all tasks with completion status as true",function(){
          todo.addTask("task1");
          todo.addTask("task2");
          todo.addTask("task3");
          chaiAssert.equal(0,todo.getCompletedTaskCount());
          todo.setTaskStatus(1,true);
          chaiAssert.equal(1,todo.getCompletedTaskCount());
          todo.setTaskStatus(2,true);
          todo.setTaskStatus(3,true);
          chaiAssert.equal(3,todo.getCompletedTaskCount());
        });
      });
      describe("getPendingTaskCount()",function(){
        it("Should give count of all tasks with completion status as false",function(){
          todo.addTask("task7");
          todo.addTask("task8");
          todo.addTask("task9");
          chaiAssert.equal(3,todo.getPendingTaskCount());
          todo.setTaskStatus(1,true);
          todo.setTaskStatus(2,true);
          todo.setTaskStatus(3,true);
          chaiAssert.equal(0,todo.getPendingTaskCount());
        });
      });
    });

  });
});
