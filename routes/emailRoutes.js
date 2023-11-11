const express = require("express");
const {
  createEmailGroup,
  createEmailList,
  getEmailListById,
  deleteEmailList,
  getAllList,
  getAllGroup,
  deleteEmailGroup,
  editEmailList,
  editEmailGroup,
} = require("../controllers/emailController");

const emailRoute = express.Router();

emailRoute.get("/all", getAllGroup);
emailRoute.post("/createGroup", createEmailGroup);
emailRoute.patch("/edit/emailGroup/:id", editEmailGroup);
emailRoute.delete("/deleteList/:id", deleteEmailList);

emailRoute.get("/list/all", getAllList);
emailRoute.post("/createList/:id", createEmailList);
emailRoute.get("/emaillist/:id", getEmailListById);
emailRoute.delete("/delete/list/:id", deleteEmailGroup);
emailRoute.patch("/list/update/:id", editEmailList);

module.exports = emailRoute;
