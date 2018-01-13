const chai = require('chai');
const chaiAssert = chai.assert;
const assert =require('assert');
const Todo = require('./../src/todo.js');

describe("Todo",function () {
  describe("Create Todo",function () {
    it("It Should create the object with its attribute",function(){
      let todo = new Todo("Todo for work",1);
      let expected = {};
      expected["todoToken"] = 1;
      expected["title"] = "Todo for work";
      expected["description"] = "";
      expected["tasks"] = {};
      expected["srNo"] = 1;
      assert.deepEqual(expected,todo);
    })
  })
});
