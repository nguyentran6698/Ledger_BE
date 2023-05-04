const mongoose = require("mongoose");
const LedgerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Ledger", LedgerSchema);
