const chai = require('chai');
const assert = chai.assert;
const Todo = require('./../src/todo.js');
const Parsed = require('./../src/parsed.js');

describe("Todo",function () {
  describe("Create Todo",function () {
    it("It Should create the object with its attribute",function(){
      let todo = new Todo("Todo for work");
      let expected = new Parsed();
      expected["title"] = "Todo for work";
      expected["description"] = "";
      expected["tasks"] = {};
      expected["srNo"] = 1;
      assert.deepEqual(todo,expected);
    })
  })
});
