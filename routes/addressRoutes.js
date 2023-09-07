const express = require("express");
const {
  createAddressGroup,
  createAddressList,
  deleteAddressList,
  getAllList,
  getAllGroup,
  deleteAddressGroup,
  editAddressList,
  editAddressGroup,
} = require("../controllers/addressController");

const addressRoute = express.Router();

addressRoute.get("/all", getAllGroup);
addressRoute.post("/createGroup", createAddressGroup);
addressRoute.patch("/edit/addressGroup/:id", editAddressGroup);
addressRoute.delete("deleteList/:id", deleteAddressList);

addressRoute.get("/list/all", getAllList);
addressRoute.post("/createList/:id", createAddressList);
addressRoute.delete("/delete/list/:id", deleteAddressGroup);
addressRoute.patch("/list/update/:id", editAddressList);

module.exports = addressRoute;
