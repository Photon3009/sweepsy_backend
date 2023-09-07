const { default: mongoose } = require("mongoose");

const addressGroupModel = new mongoose.Schema({
    GroupName: {
        type: String,
        required: true,
        unique : true
    },
    AddressLists : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'AddressList',
        required: false,
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

},{timestamps: true})

module.exports = mongoose.model('AddressGroup', addressGroupModel)