const { default: mongoose } = require("mongoose");

const taskListModel = new mongoose.Schema({
  ListName: {
    type: String,
    required: true,
    unique: true,
  },
  TaskGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskGroup",
    required: true,
  },
  moduleName: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  failed: {
    type: Number,
    default: 0,
  },
  success: {
    type: Number,
    default: 0,
  },
  EmailList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmailLists",
    required: true,
  },
  EmailListName: {
    type: String,
    required: false,
  },
  ProxyList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProxyLists",
    required: true,
  },
  ProxyListName: {
    type: String,
    required: false,
  },
  SiteURL: {
    type: String, // You can adjust the data type as needed (String for URL)
    required: true, // Change to true if SiteURL is required
  },
  // AddressList : {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: false
  // },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
});

module.exports = mongoose.model("TaskList", taskListModel);
