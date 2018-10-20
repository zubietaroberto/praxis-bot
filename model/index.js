const axios = require("axios");
const Parser = require("csvtojson");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS8GnWlPnxJtRfRSXZDVmpIVHW5QpoyTjXx4u8L7zksnDBFUr40rCQvVMxzCVOGRypU8W8-Y0Kx8ja-/pub?output=csv";

async function queryDeputies() {
  const parser = Parser();
  const { data } = await axios.get(CSV_URL);
  const parsedData = await parser.fromString(data);
  return parsedData;
}

async function queryAndFilterDeputies(circuit){
  const parsedData = await queryDeputies()
  const result = parsedData.filter(deputy => deputy.circuito === circuit)
  return result
}

module.exports = {
  queryDeputies,
  queryAndFilterDeputies,
};
