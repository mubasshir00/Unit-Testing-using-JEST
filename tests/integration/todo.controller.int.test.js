const request = require("supertest");
const app = require("../../app")
const endpointUrl = "/todos/";
const newTodo = require("../mock-data/new-todo.json")

describe(endpointUrl,()=>{
    // test("GET "+endpointUrl,async()=>{
    //     const response = await request(app).get(endpointUrl);
    //     expect(response.statusCode).toBe(200);
    //     // expect(typeof response.body).toBe("array");
    //     expect(response.body[0].title).toBeDefined();
    //     expect(response.body[0].done).toBeDefined();
    // })
    it("POST "+endpointUrl,async()=>{
        request(app).post(endpointUrl).send(newTodo);
        const response = await request(app)
        .post(endpointUrl)
        .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    })
})