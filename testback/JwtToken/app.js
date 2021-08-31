const express = require("express");
const bodyParser = require("body-parser");
const cookirParser = require("cookie-parser");
const { signIn, welcome, refresh } = require("./handlers.js");

//starting app
const app = express();
const router = express.Router();

//inititlizing middle-ware
app.use(bodyParser());
app.use(cookirParser());//fuck shit

//handling routes
app.use("/api",router);

router.post("/signin", signIn);
router.get("/welcome", welcome);
router.post("/refresh", refresh);

app.listen(8080, () => {
  console.log("Listening to port , 8080");
});
