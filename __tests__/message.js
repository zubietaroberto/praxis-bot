const supertest = require("supertest");
const app = require("../server");
const sinon = require("sinon");
const sender = require("../sender");
const axios = require("axios");

const sandbox = sinon.createSandbox();

// Sender do Nothing
beforeAll(() => {
  sandbox.replace(axios, "post", sandbox.fake.resolves("ok"));
});
afterAll(() => sandbox.restore());

const TEST_EVENT = {
  object: "page",
  entry: [
    {
      messaging: [
        {
          message: { text: "TEST_MESSAGE", mid: "hola" },
          sender: { id: "12345" }
        }
      ]
    }
  ]
};

// curl -H  -X POST "localhost:3000/webhook" -d '' -v
describe("Facebook API", () => {
  test("Root", async () => {
    const result = await supertest(app.callback()).get("/");
    expect(result.status).toBe(200);
  });
  test("Facebook Message", async () => {
    const result = await supertest(app.callback())
      .post("/webhook")
      .set("Content-Type", "application/json")
      .send(TEST_EVENT);
    expect(result.status).toBe(200);
  });
});
