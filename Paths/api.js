const express = require("express");
const router = express.Router();
// router();
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Api page" });
});
module.exports = router;
