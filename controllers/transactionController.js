const Transaction = require("../models/Transaction");
const Ledger = require("../models/Ledger");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const buyToken = async (req, res) => {
  const { username, totalToken: numbToken, totalPrice, note } = req.body;
  if (!username || !numbToken) {
    throw new CustomError.BadRequestError(
      `Please provide username and token amount`
    );
  }
  // check for current user
  const ledger = await Ledger.findOne({ username });
  if (!ledger) {
    throw new CustomError.UnauthorizedError(
      `The ledger with ${username} is not existed`
    );
  }
  // Update the ledger balance
  const newBalance = ledger.balance + numbToken;
  const action = `${username} purchased ${numbToken} tokens for ${totalPrice} with the description “${
    note || "Card Refill"
  }”`;
  ledger["balance"] = newBalance;
  await ledger.save();
  await Transaction.create({
    balanceToken: newBalance,
    numberOfTokens: numbToken,
    ledger: ledger._id,
    action,
    transactionTime: new Date(),
  });
  res.status(StatusCodes.OK).json({ success: true });
};

const playGame = async (req, res) => {
  const { username, totalToken: numbToken, gameName } = req.body;
  if (!username || !numbToken || !gameName) {
    throw new CustomError.BadRequestError(
      `Please provide username, token, name of the game`
    );
  }
  // check for current ledger
  const ledger = await Ledger.findOne({ username });
  // Update the ledger balance
  const action = `${username} has used ${numbToken} tokens with the description of “${gameName}”`;
  if (ledger.balance - numbToken < 0) {
    throw new CustomError.BadRequestError(`Insufficient Fund`);
  }
  const newBalance = ledger.balance - numbToken;
  ledger["balance"] = newBalance;
  await ledger.save();
  // Create a history transaction
  await Transaction.create({
    balanceToken: newBalance,
    numberOfTokens: numbToken,
    ledger: ledger._id,
    action,
    transactionTime: new Date(),
  });
  res.status(StatusCodes.OK).json({ success: true });
};

const getTransaction = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    throw new CustomError.BadRequestError(`Please provide a username`);
  }
  const ledger = await Ledger.findOne({ username });
  if (!ledger) {
    throw new CustomError.NotFoundError(
      `Can't find a ledger with username ${username}`
    );
  }
  const transactions = await Transaction.find({ ledger: ledger._id });
  res.status(StatusCodes.OK).json(transactions);
};

module.exports = {
  buyToken,
  playGame,
  getTransaction,
};
