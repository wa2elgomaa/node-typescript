import express from 'express';
import bodyParser from 'body-parser';
import app from '../app';
import router from '../routes';
import supertest  from "supertest";

const request = supertest(app);

// integration test for api clear cache  
describe("GET Data from Github /api/clear-cache : success ", () => {
  test("It should respond with an ServerResponse with success message", async (done) => {
  
    const response = await request.get("/api/clear-cache");
    expect(response.status).toBe(200);
    expect(response.body.statusText).toBe("Cleared successfully");
   
      done();
    });
});

// integration test for search api 
describe("GET Data from Github /api/search : failure ", () => {
  test("It should respond with an ServerResponse with success message", async (done) => {
    const payload = {type : "any" , text : "any"};
    const response = await request.post("/api/search")
    .set('Content-type', 'application/json')
    .send({text : "wael" , type : "users"});
    expect(response.status).toBe(200);
      done();
    });
});

