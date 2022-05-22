const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require('node-mocks-http');

const newTodo = require('../mock-data/new-todo.json')

const allTodos = require("../mock-data/all-todos.json")

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();

let req,res,next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("TodoController.getTodoById",()=>{
    it("should have a getTodoById",()=>{
        expect(typeof TodoController.getTodoById).toBe("function");
    })
    it("Should call TodoModel.findById with route parameters",async()=>{
        req.params.todoId = "628a948006a7f1690cfc646a";
        await TodoController.getTodoById(req, res);
        expect(TodoModel.findById).toBeCalledWith("628a948006a7f1690cfc646a");
    })
    it("Should return json body and response code 200",async()=>{
        TodoModel.findById.mockReturnValue(newTodo);
        await TodoController.getTodoById(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe("TodoConttoller.getTodos",()=>{
    it("Should have a get Todos function",()=>{
        expect(typeof TodoController.getTodos).toBe("function")
    });
    it("should call TodoModel.find({})",async()=>{
        await TodoController.getTodos(req,res,next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    })
    it("Shoulf return response with status 200 and all todos",async()=>{
        TodoModel.find.mockReturnValue(allTodos)
        await TodoController.getTodos(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    })
    it("Should do error handling",async()=>{
        const errorMessage = {message:"Error finding todoModel"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
    it("Should return 404 when item doesnt exist",async()=>{
        TodoModel.findById.mockReturnValue(null);
        await TodoController.getTodoById(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe("TodoController.createTodo",()=>{

    beforeEach(()=>{
        req.body = newTodo;
    })

    it("Should have a create Todo function",()=>{
        expect(typeof TodoController.createTodo).toBe("function");
    })
    it("should call TodoModel.create",()=>{
        TodoController.createTodo(req,res);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    })
    it("Should return 201 response code",async()=>{
        await TodoController.createTodo(req,res);
        expect(res.statusCode).toBe(201);

        //ensure response send back
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return Json Body in Response",async()=>{
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req,res);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("Should Handle Errors",async()=>{
        const errorMessage = {message:"Done Property Missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req,res,next);
        expect(next).toBeCalledWith(errorMessage);

    })
})