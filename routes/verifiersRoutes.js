const express = require("express");
const {
  addVerifier,
  getAllVerifiers,
  runVerifier
} = require("../controllers/verifiersController");

const verifiersRoute = express.Router();

verifiersRoute.get("/getAll", getAllVerifiers);
verifiersRoute.post("/createVerifier", addVerifier);
verifiersRoute.get('/run/:verifierId', runVerifier);

module.exports = verifiersRoute;
