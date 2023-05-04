const Ledger = require("../models/Ledger");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createLedger = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new CustomError.BadRequestError(`Please provide username`);
  }
  let ledger = await Ledger.findOne({ username });
  // First time join
  if (!ledger) {
    ledger = await Ledger.create({ username });
  }
  res.status(StatusCodes.OK).json({
    username: ledger.username,
    balance: ledger.balance,
    status: { success: true },
  });
};
const getTokenBalance = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    throw new CustomError.BadRequestError(`Please provide username`);
  }
  const ledger = await Ledger.findOne({ username });
  if (!ledger) {
    throw new CustomError.NotFoundError(
      `Can't find the ledger with username ${username}`
    );
  }
  res.status(StatusCodes.OK).json({ totalToken: ledger.balance });
};
module.exports = {
  createLedger,
  getTokenBalance,
};
