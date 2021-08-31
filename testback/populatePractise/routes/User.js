const express = require("express");
const {saveUser} = require("../controller/User")
const router = express.Router();



router.post("/save",saveUser)


module.exports = router;