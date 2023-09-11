const mongoose = require('mongoose');

const verifierSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique : true
  },
  dummyURL:{
    type: String,
    required: true,
  },
  proxyList: [{
    type: String,
    required: true,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  }
});


const Verifier = mongoose.model('Verifier', verifierSchema);
module.exports = Verifier;
