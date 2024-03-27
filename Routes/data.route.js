const express = require("express");
const data = express.Router();
const { getfetchdata, getfetchFilterdata } = require("../Controllers/data.controller");

data.use(express.json());

// Define routes with associated controller methods
data.get("/alldata", getfetchdata); // Route for fetching all data
data.get("/filterdata", getfetchFilterdata); // Route for fetching filtered data

module.exports = { data };