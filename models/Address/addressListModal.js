const { default: mongoose } = require("mongoose");

const addressListModel = new mongoose.Schema({
    ListName: {
        type: String,
        required: true,
        unique : true
    },
    Addresses : {
        type: [String],
        required: true,
    },
    AddressGroup : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressGroup',
        required : true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: false
  },

},{timestamps: true})

module.exports = mongoose.model('AddressLists', addressListModel)