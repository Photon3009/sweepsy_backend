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
  runTask,
  getTaskListById,
  editTaskList,
} = require("../controllers/taskController");
const taskRoute = express.Router();

taskRoute.get("/all", getAllGroup);
taskRoute.post("/createTask", createTaskGroup);
taskRoute.patch("/group/edit/:id", editTaskGroup);
taskRoute.delete("/delete/:id", deleteTaskGroup);

//list
taskRoute.get("/list/all", getTaskList);
taskRoute.post("/list/create/:id", createTaskList);
taskRoute.get("/tasklist/:id", getTaskListById);
taskRoute.put("/tasklist/:id/edit", editTaskList);

taskRoute.patch("/comment/add/:id", addComments);

//run
taskRoute.post("/runTask", runTask);

module.exports = taskRoute;
