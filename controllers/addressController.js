const { default: mongoose } = require("mongoose");
const addressListModal = require("../models/Address/addressListModal");
const addressGroupModel = require("../models/Address/addressModal");
const jwt = require("jsonwebtoken");

//Email Gorup
const getAllGroup = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mssg: "You are not authenticated" });
    }

    jwt.verify(token, "secret_key", async (err, user) => {
      if (err) return res.status(403).json({ mssg: "Token not valid" });
      req.user = user;

      const addressList = await addressGroupModel.find({ createdBy: req.user.id });
      if (!addressList) {
        return res.status(400).json({ mssg: "Error" });
      }
      res.status(200).json(addressList);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editAddressGroup = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such workout" });
    }
    const addressList = await addressGroupModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!addressList) return res.status(400).json({ mssg: "Not Updated" });
    return res.status(200).json(addressList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const createAddressGroup = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mssg: "You are not authenticated" });
    }

    jwt.verify(token, "secret_key", async (err, user) => {
      if (err) return res.status(403).json({ mssg: "Token not valid" });
      req.user = user;

      const GroupName = req.body.GroupName;
      const createdBy = req.user.id;

      const address = await addressGroupModel.create({ GroupName, createdBy });
      if (!address) {
        return res.status(400).json({ mssg: "Creation failed" });
      }
      return res.status(200).json(address);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteAddressGroup = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ mssg: "No record found" });
    }
    const address = await addressGroupModel.findOneAndDelete({ _id: id });
    if (!address) {
      return res.status(400).json("not deleted");
    }

    const addressGroup = await addressListModal.deleteMany({
      _id: { $in: address.AddressLists },
    });
    if (!addressGroup) {
      return res.status(400).json("not deleted");
    }
    const combinedData = {
      mssg: "Deleted",
      address_List: address,
      address_Group: addressGroup,
      id: address.AddressGroup,
    };
    return res.status(200).json(combinedData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//addressList

const createAddressList = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mssg: "You are not authenticated" });
    }

    jwt.verify(token, "secret_key", async (err, user) => {
      if (err) return res.status(403).json({ mssg: "Token not valid" });
      req.user = user;

      const { id } = req.params;
      const ListName = req.body.ListName;
      const createdBy = req.user.id;
      const Addresses = req.body.Addresses;
      const AddressGroup = id;

      const address = await addressListModal.create({
        ListName,
        Addresses,
        AddressGroup,
        createdBy,
      });
      if (!address) {
        return res.status(400).json({ mssg: "No created" });
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ mssg: "No record found" });
      }
      const addressGroup = await addressGroupModel.findOneAndUpdate(
        { _id: id },
        { $push: { AddressLists: address._id } }
      );
      if (!addressGroup) {
        return res.status(400).json({ mssg: "No created" });
      }
      const combinedData = {
        address_List: address,
        address_Group: addressGroup,
      };
      return res.status(200).json(combinedData);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteAddressList = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ mssg: "No record found" });
    }
    const address = await addressListModal.findOneAndDelete({ _id: id });
    if (!address) {
      return res.status(400).json("not deleted");
    }

    const addressGroup = await addressGroupModel.findOneAndUpdate(
      { _id: address.AddressGroup },
      { $pull: { AddressLists: address._id } },
      { new: true }
    );
    if (!addressGroup) {
      return res.status(400).json("not deleted");
    }
    const combinedData = {
      mssg: "Deleted",
      address_List: address,
      address_Group: addressGroup,
      id: address.AddressGroup,
    };
    return res.status(200).json(combinedData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const editAddressList = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such workout" });
    }
    const addressList = await addressListModal.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!addressList) return res.status(400).json({ mssg: "Not Updated" }); 
    return res.status(200).json(addressList);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getAllList = async (req, res) => {
  try {
    const { id } = req.params;
    const addressList = await addressListModal.find({});
    if (!addressList) {
      return res.status(400).json({ mssg: "Error" });
    }
    const combinedData = {
      address_List: addressList,
    };

    res.status(200).json(combinedData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createAddressGroup,
  createAddressList,
  deleteAddressList,
  getAllList,
  getAllGroup,
  deleteAddressGroup,
  editAddressList,
  editAddressGroup,
};
