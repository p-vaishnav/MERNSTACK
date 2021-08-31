const express = require("express");
const router = express.Router();
const {saveUser,getAllUser} = require("../controllers/user");

router.post("/user",saveUser);
router.get("/user",getAllUser);

module.exports = router;
