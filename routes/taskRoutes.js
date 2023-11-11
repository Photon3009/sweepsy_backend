const express = require("express");
const {
  getAllGroup,
  createTaskGroup,
  editTaskGroup,
  createTaskList,
  getTaskList,
  deleteTaskGroup,
  addComments,
  getComments,
  getTaskListById,
  editTaskList,
  getTaskGroupById,
} = require("../controllers/taskController");
const taskRoute = express.Router();

taskRoute.get("/all", getAllGroup);
taskRoute.post("/createTask", createTaskGroup);
taskRoute.patch("/group/edit/:id", editTaskGroup);
taskRoute.delete("/delete/:id", deleteTaskGroup);
taskRoute.get("/group/:id", getTaskGroupById);

//list
taskRoute.get("/list/all", getTaskList);
taskRoute.post("/list/create/:id", createTaskList);
taskRoute.get("/tasklist/:id", getTaskListById);
taskRoute.put("/tasklist/:id/edit", editTaskList);

taskRoute.patch("/comment/add/:id", addComments);

module.exports = taskRoute;
