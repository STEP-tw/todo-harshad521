const chai = require('chai');
const assert = chai.assert;
const Todo = require('./../src/todo.js');

describe("Todo",function () {
  describe("Create Todo",function () {
    it("It Should create the object with its attribute",function(){
      let todo = new Todo("Todo for work");
      let expected = {
        title: "Todo for work",
        description : "",
        tasks : {},
        srNo: 1
      }
      assert.deepInclude(todo,expected);
    })
  })
  // describe("Test todo prototypes",function () {
  //   let todo;
  //   before(function() {
  //     todo = new Todo("Todo for work")
  //   })
  //   it("It Should create the object with its attribute",function(){
  //     let expected = {
  //       title: "Todo for work",
  //       description : "",
  //       tasks : {},
  //       srNo: 1
  //     }
  //     assert.deepInclude(todo,expected);
  //   })
  // })
});
