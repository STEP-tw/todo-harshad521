const chai = require('chai');
const chaiAssert = chai.assert;
const assert =require('assert');
const Account = require('./../src/account.js');
const Todo = require('./../src/todo.js');
const Task = require('./../src/task.js');
describe("***Account*** =>",function () {
  describe("Create User",function () {
    it("Should create the object with its attribute",function(){
      let account = new Account("harshad",'Harshad Thombare','ht1234');
      let expected = {};
      expected["username"] = 'harshad';
      expected["name"] = "Harshad Thombare";
      expected["password"] = "ht1234";
      expected["todos"] = {};
      expected["token"] = 0;
      chaiAssert.deepInclude(expected,account);
    })
  });
  describe("Test Account prototypes",function () {
    let account;
    let expected = {};
    beforeEach(function () {
      account = new Account("harshad",'Harshad Thombare','ht1234');
      expected = {};
      expected["username"] = "harshad";
      expected["name"] = 'Harshad Thombare';
      expected["password"] = "ht1234";
      expected["todos"] = {};
      expected["token"] = 0;
    });
    describe("nextToken()",function(){
      it("Should return next token",function(){
        chaiAssert.equal(account.nextToken(),1);
      });
    });
    describe("resetToken()",function(){
      it("Should set token to initial value i.e 0",function(){
        account.nextToken();
        account.nextToken();
        chaiAssert.equal(account.nextToken(),3);
        account.resetToken()
        chaiAssert.equal(account.token,0);
      });
    });
    describe("getUsername()",function(){
      it("Should return username",function(){
        chaiAssert.equal(account.getUsername(),'harshad');
      });
    });
    describe("addTodo()",function(){
      it("Should add Todo with passed title and date",function(){
        account.addTodo("New Todo",'2018-01-15');
        expected.token=1;
        expected.todos[1]=new Todo("New Todo",'2018-01-15',1);
        chaiAssert.deepInclude(account,expected);
      });
    });
    describe("getTodo()",function(){
      it("Should get Todo with passed token",function(){
        expected = new Todo("New Todo3",'2018-01-19',3)
        account.addTodo("New Todo1",'2018-01-15');
        account.addTodo("New Todo2",'2018-01-14');
        account.addTodo("New Todo3",'2018-01-19');
        chaiAssert.deepInclude(account.getTodo(3),expected);
      });
    });
    describe("deleteTodo()",function(){
      it("Should delete Todo with given token number",function(){
        account.addTodo("New Todo1",'2018-01-15');
        account.addTodo("New Todo2",'2018-01-14');
        account.addTodo("New Todo3",'2018-01-19');
        account.deleteTodo(2);
        expected.token = 3;
        expected.todos[1]=new Todo("New Todo1",'2018-01-15',1);
        expected.todos[3]=new Todo("New Todo3",'2018-01-19',3);
        chaiAssert.deepInclude(expected,account);
      });
    });
    describe("insertTaskInTodo()",function(){
      it("Should insert Task in Todo of given token number",function(){
        account.addTodo("Todo",'2018-01-15');
        account.insertTaskInTodo(1,"Task");
        expected.token = 1;
        expected.todos[1]=new Todo("Todo",'2018-01-15',1);
        expected.todos[1].addTask('Task')
        chaiAssert.deepInclude(expected,account);
      });
    });
    describe("editTaskInTodo()",function(){
      it("Should edit Task in Todo of given token number",function(){
        account.addTodo("Todo",'2018-01-15');
        account.insertTaskInTodo(1,"Task");
        account.editTaskInTodo(1,1,"newTaskTitle")
        expected.token = 1;
        expected.todos[1]=new Todo("Todo",'2018-01-15',1);
        expected.todos[1].addTask('newTaskTitle')
        chaiAssert.deepInclude(expected,account);
      });
    });
    describe("deleteTaskInTodo()",function(){
      it("Should delete Task in Todo of given serial number",function(){
        account.addTodo("Todo",'2018-01-15');
        account.insertTaskInTodo(1,"Task1");
        account.deleteTaskInTodo(1,1);
        expected.token = 1;
        expected.todos[1]=new Todo("Todo",'2018-01-15',1);
        expected.todos[1].srNo=1;
        chaiAssert.deepInclude(expected,account);
      });
    });
    describe("setTaskStatus()",function(){
      it("Should set status of Task of given srno in Todo of given token number",function(){
        account.addTodo("Todo",'2018-01-15');
        account.insertTaskInTodo(1,"Task1");
        account.insertTaskInTodo(1,"Task2");
        account.setTaskStatus(1,2,true);
        expected.token = 1;
        expected.todos[1]=new Todo("Todo",'2018-01-15',1);
        expected.todos[1].addTask('Task1')
        expected.todos[1].addTask('Task2')
        expected.todos[1].setTaskStatus(2,true);
        chaiAssert.deepInclude(expected,account);
      });
    });
    describe("getTaskStatus()",function(){
      it("Should return status of Task of given srno in Todo of given token number",function(){
        account.addTodo("Todo",'2018-01-15');
        account.insertTaskInTodo(1,"Task1");
        account.insertTaskInTodo(1,"Task2");
        account.setTaskStatus(1,2,true);
        chaiAssert.isOk(account.getTaskStatus(1,2));
        chaiAssert.isNotOk(account.getTaskStatus(1,1));
      });
    });
    describe("setSessionId()",function(){
      it("Should set setSessionId",function(){
        account.setSessionId(1234)
        expected['sessionId']=1234;
        chaiAssert.deepInclude(account,expected);
      });
    });
    describe("getSessionId()",function(){
      it("Should return setSessionId",function(){
        account.setSessionId(1234)
        chaiAssert.equal(account.getSessionId(),1234);
      });
    });
    describe("deleteSessionId()",function(){
      it("Should delete setSessionId",function(){
        account.setSessionId(1234)
        account.deleteSessionId();
        chaiAssert.deepInclude(account,expected);
      });
    });
    describe("getTodosOnDate()",function(){
      it("Should return all todos on given date",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo2",'2018-01-15');
        account.addTodo("Todo3",'2018-01-12');
        let todos=account.getTodosOnDate('2018-01-12');
        expected = [new Todo("Todo1",'2018-01-12',1),new Todo("Todo3",'2018-01-12',3)]
        //chaiAssert.deepOwnInclude(account,expected);
        chaiAssert.deepEqual(todos[0],expected[0])
        chaiAssert.deepEqual(todos[1],expected[1])
        chaiAssert.equal(todos.length,expected.length);
      });
    });
    describe("getTodoTitlesOnDate()",function(){
      it("Should return all todo titles on given date",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo2",'2018-01-12');
        account.addTodo("Todo3",'2018-01-13');
        account.addTodo("Todo4",'2018-01-12');
        let todoTitles=account.getTodoTitlesOnDate('2018-01-12');
        let expected=['Todo1','Todo2','Todo4']
        chaiAssert.deepEqual(todoTitles,expected)
      });
    });
    describe("setTodoTitle()",function(){
      it("Should set new todo title of todo on given todoToken",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo4",'2018-01-12');
        account.setTodoTitle(2,'Todo2');
        chaiAssert.equal(account.getTodoTitle(2),'Todo2')
      });
    });
    describe("getTodoTitle()",function(){
      it("Should return todo title of given todoToken",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo4",'2018-01-12');
        chaiAssert.equal(account.getTodoTitle(2),'Todo4')
      });
    });
    describe("getToken()",function(){
      it("Should return initial todo Token",function(){
        chaiAssert.equal(account.getToken(),0);
      });
      it("Should return increased todo Token",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo4",'2018-01-12');
        chaiAssert.equal(account.getToken(),2);
      });
    });
    describe("setTodoDescription()",function(){
      it("Should set description for todo of given Token",function(){
        account.addTodo("Todo1",'2018-01-12');
        account.addTodo("Todo4",'2018-01-12');
        account.setTodoDescription(2,"Just for test")
        chaiAssert.equal(account.getTodo(2).description,"Just for test");
      });
    });
  });
});
