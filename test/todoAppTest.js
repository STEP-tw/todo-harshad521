const chai = require('chai');
const chaiAssert = chai.assert;
const assert =require('assert');
const TodoApp = require("./../src/todoApp.js")
const Account = require('./../src/account.js');
const Todo = require('./../src/todo.js');
const Task = require('./../src/task.js');
describe("***TodoApp*** =>",function () {
  describe("Create App",function () {
    it("Should create the object with its attribute",function(){
      let myApp = new TodoApp();
      let expected = {};
      expected['accounts']={};
      chaiAssert.deepInclude(expected,myApp);
    })
  });
  describe("Test TodoApp prototypes",function () {
    let myApp;
    let expected = {};
    beforeEach(function () {
      myApp = new TodoApp();
      expected = {};
      expected["accounts"] = {};
    });
    describe("addAccount()",function(){
      it("Should add account with given details",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        expected.accounts['jack']=new Account('jack','Jack Sparrow','js1234')
        chaiAssert.deepInclude(expected,myApp);
      });
    });
    describe("getAccount()",function(){
      it("Should get account with given details",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        expected=new Account('ronaldo','Cristiano Ronaldo','CR7')
        chaiAssert.deepInclude(expected,myApp.getAccount("ronaldo"))  ;
      });
    });
    describe("getAccountPassword()",function(){
      it("Should get account password of given username",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        chaiAssert.equal('CR7',myApp.getAccountPassword("ronaldo"))  ;
      });
    });
    describe("doesPasswordMatch()",function(){
      it("Should check that the password of given username is valid",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        chaiAssert.isOk(myApp.doesPasswordMatch("ronaldo",'CR7'));
      });
      it("Should check that the password of given username is invalid",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        chaiAssert.isNotOk(myApp.doesPasswordMatch("ronaldo",'CR17'));
      });
    });
    describe("areUserDetailsValid()",function(){
      it("Should check that the password of given username is valid",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        chaiAssert.isOk(myApp.areUserDetailsValid("ronaldo",'CR7'));
      });
      it("Should check that the password of given username is invalid",function(){
        myApp.addAccount('jack','Jack Sparrow','js1234')
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addAccount('messi','Lionel Messi','MS11')
        chaiAssert.isNotOk(myApp.areUserDetailsValid("ronaldo",'CR17'));
      });
    });
    describe("setSessionId()",function(){
      it("Should set the setSessionId to given user",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.setSessionId('ronaldo',1234)
        expected.accounts['ronaldo']= new Account('ronaldo','Cristiano Ronaldo','CR7');
        expected.accounts.ronaldo['sessionId']=1234;
        chaiAssert.deepInclude(myApp,expected);
      });
    });
    describe("getUserBySessionId()",function(){
      it("Should return the user of given session Id",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.setSessionId('ronaldo',1234)
        expected=new Account('ronaldo','Cristiano Ronaldo','CR7')
        expected['sessionId']=1234;
        chaiAssert.deepEqual(expected,myApp.getUserBySessionId(1234));
      });
    });
    describe("getSessionId()",function(){
      it("Should return the setSessionId of given user",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.setSessionId('ronaldo',1234)
        chaiAssert.equal(myApp.getSessionId('ronaldo'),1234);
      });
    });
    describe("deleteSessionId()",function(){
      it("Should delete the session Id of given user",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.setSessionId('ronaldo',1234)
        expected=new Account('ronaldo','Cristiano Ronaldo','CR7')
        myApp.deleteSessionId('ronaldo');
        chaiAssert.deepEqual(expected,myApp.getAccount('ronaldo'));
      });
    });
    describe("addTodo()",function(){
      it("Should add new Todo with given title in Account of given username",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        expected=new Account('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        expected.todos[1]=new Todo('Todo Title','2018-1-16',1);
        expected.token=1;
        chaiAssert.deepEqual(expected,myApp.getAccount('ronaldo'));
      });
    });
    describe("getTodo()",function(){
      it("Should add new Todo with given title in Account of given username",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        expected=new Todo('Todo Title','2018-1-16',1);
        chaiAssert.deepEqual(expected,myApp.getTodo('ronaldo',1));
      });
    });
    describe("insertTaskInTodo()",function(){
      it("Should add new Task in given Todo and Account of given username",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        myApp.insertTaskInTodo('ronaldo',1,'Task Test')
        expected=new Todo('Todo Title','2018-1-16',1);
        expected.srNo=1;
        expected.tasks[1]=new Task('Task Test');
        chaiAssert.deepEqual(expected,myApp.getTodo('ronaldo',1));
      });
    });
    describe("deleteTaskInTodo()",function(){
      it("Should delete Task in given Todo and Account of given username",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        myApp.insertTaskInTodo('ronaldo',1,'Task Test')
        expected=new Todo('Todo Title','2018-1-16',1);
        myApp.deleteTaskInTodo('ronaldo',1,1)
        expected.srNo=1;
        chaiAssert.deepEqual(expected,myApp.getTodo('ronaldo',1));
      });
    });
    describe("getTask()",function(){
      it("Should return task in given Todo and Account of given username",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        myApp.insertTaskInTodo('ronaldo',1,'Task Test')
        expected=new Task('Task Test');
        chaiAssert.deepEqual(expected,myApp.getTask('ronaldo',1,1));
      });
    });
    describe("setTaskTitle()",function(){
      it("Should set new title of given task,Todo and Account ",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7')
        myApp.addTodo('ronaldo','Todo Title','2018-1-16')
        myApp.insertTaskInTodo('ronaldo',1,'Task Test')
        myApp.setTaskTitle('ronaldo',1,1,'New Task Title')
        expected=new Task('New Task Title');
        chaiAssert.deepEqual(expected,myApp.getTask('ronaldo',1,1));
      });
    });
    describe("getTaskStatus()",function(){
      it("Should return status of given task,Todo and Account ",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo Title','2018-1-16');
        myApp.insertTaskInTodo('ronaldo',1,'Task Test');
        chaiAssert.isNotOk(myApp.getTaskStatus('ronaldo',1,1));
      });
    });
    describe("setTaskStatus()",function(){
      it("Should return status of given task,Todo and Account ",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo Title','2018-1-16');
        myApp.insertTaskInTodo('ronaldo',1,'Task Test');
        myApp.setTaskStatus('ronaldo',1,1,true);
        chaiAssert.isOk(myApp.getTaskStatus('ronaldo',1,1));
      });
    });
    describe("getTodoTitlesOnDate()",function(){
      it("Should return all todo titles on given date",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo1','2018-1-12');
        myApp.addTodo('ronaldo','Todo2','2018-1-12');
        myApp.addTodo('ronaldo','Todo3','2018-1-16');
        myApp.addTodo('ronaldo','Todo4','2018-1-12');
        let todoTitles=myApp.getTodoTitlesOnDate('ronaldo','2018-1-12');
        let expected=['Todo1','Todo2','Todo4']
        chaiAssert.deepEqual(todoTitles,expected)
      });
    });
    describe("getTodosOnDate()",function(){
      it("Should return all todos created on given date",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo1','2018-1-12');
        myApp.addTodo('ronaldo','Todo2','2018-1-13');
        myApp.addTodo('ronaldo','Todo3','2018-1-12');
        myApp.addTodo('ronaldo','Todo4','2018-1-14');
        let todos=myApp.getTodosOnDate('ronaldo','2018-1-12');
        expected = [new Todo("Todo1",'2018-1-12',1),new Todo("Todo3",'2018-1-12',3)]
        chaiAssert.deepEqual(todos[0],expected[0])
        chaiAssert.deepEqual(todos[1],expected[1])
        chaiAssert.equal(todos.length,expected.length);
      });
      describe("getToken()",function(){
        it("Should return current available token",function(){
          myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
          myApp.addTodo('ronaldo','Todo1','2018-1-12');
          myApp.addTodo('ronaldo','Todo2','2018-1-13');
          myApp.addTodo('ronaldo','Todo3','2018-1-12');
          myApp.addTodo('ronaldo','Todo4','2018-1-14');
          chaiAssert.equal(myApp.getToken('ronaldo'),4);
        });
      });
      describe("deleteTodo()",function(){
        it("Should delete todo with given token",function(){
          myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
          myApp.addTodo('ronaldo','Todo1','2018-1-12');
          myApp.addTodo('ronaldo','Todo2','2018-1-13');
          expected.accounts['ronaldo']=new Account('ronaldo','Cristiano Ronaldo','CR7');
          expected.accounts['ronaldo'].todos[1]= new Todo('Todo1','2018-1-12',1);
          expected.accounts['ronaldo'].token=2;
          myApp.deleteTodo('ronaldo',2);
          chaiAssert.deepInclude(expected,myApp);
        });
      });
    });
    describe("setTodoTitle()",function(){
      it("Should set title of todo of with given token",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo1','2018-1-12');
        myApp.setTodoTitle('ronaldo',1,'newTodoTitle');
        chaiAssert.equal('newTodoTitle',myApp.getTodo('ronaldo',1).getTitle());
      });
    });
    describe("setTodoDescription()",function(){
      it("Should set description of todo with given token",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo1','2018-1-12');
        myApp.setTodoDescription('ronaldo',1,'newDescription');
        chaiAssert.equal('newDescription',myApp.getAccount('ronaldo').getTodoDescription(1));
      });
    });
    describe("getTodoDescription()",function(){
      it("Should get description of todo of with given token",function(){
        myApp.addAccount('ronaldo','Cristiano Ronaldo','CR7');
        myApp.addTodo('ronaldo','Todo1','2018-1-12');
        myApp.setTodoDescription('ronaldo',1,'newDescription');
        chaiAssert.equal('newDescription',myApp.getTodoDescription('ronaldo',1));
      });
    });

  });
});
