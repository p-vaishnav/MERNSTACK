const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

const users = {
  user1: "password1",
  user2: "password2",
};

exports.signIn = (req, res) => {
  //get credentials from json body
  const { username, password } = req.body;
  if (!username || !password || users[username] !== password) {
    return res.status(401).end();
  } //if

  const token = jwt.sign({ username }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });

  res.cookie("token", token, { maxAge: jwtExpirySeconds * 100 });
  res.end();
};

exports.welcome = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).end();
  } //if
  let payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end();
    }
  }

  res.send(`Welcome , ${payload.username}`);
};

exports.refresh = (req, res) => {
  //if time expires and we are not able to enter to welcome route
  const token = req.cookies.token;
  let payload;
  try {
    payload = jwt.verify(token,jwtKey);
  } catch (e) {
    const newToken = jwt.sign({ username : req.body.username }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });
  
    res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 100 });
    res.end();
  }
  
};
