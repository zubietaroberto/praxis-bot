const model = require("../model");

describe("Parser", () => {
  test("Queries Parsed Data", async () => {
    const result = await model.queryDeputies();
    expect(result.length).toBeGreaterThan(0);
  });
  test("Parses Queried Data", async () => {
    const result = await model.queryAndFilterDeputies("8-8");
    expect(result.length).toBe(5);
  });
  test("Should not crash on failed query", async () => {
    const result = await model.queryAndFilterDeputies("FALSE");
    expect(result.length).toBe(0);
  });
});
