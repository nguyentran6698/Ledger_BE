const express = require("express");
const router = express.Router();
const {
  createLedger,
  getTokenBalance,
} = require("../controllers/ledgerController");
router.post("/login", createLedger);
router.get("/getBalance", getTokenBalance);

module.exports = router;
