const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  // posts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Post",
  //   }
  // ],
});



module.exports = mongoose.model("User", UserSchema);
