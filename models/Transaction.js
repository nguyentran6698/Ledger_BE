const mongoose = require("mongoose");
const TransactionSchema = mongoose.Schema(
  {
    action: {
      type: String,
    },
    numberOfTokens: {
      type: Number,
      default: 0,
    },
    balanceToken: {
      type: Number,
      default: 0,
    },
    ledger: {
      type: mongoose.Types.ObjectId,
      ref: "Ledger",
    },
    transactionTime: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", TransactionSchema);
