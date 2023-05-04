const express = require("express");
const router = express.Router();
const {
  buyToken,
  playGame,
  getTransaction,
} = require("../controllers/transactionController");

router.post("/buyToken", buyToken);
router.post("/playGame", playGame);
router.get("/getTransactions", getTransaction);

module.exports = router;
