const mongoose = require("mongoose");
const joigoose = require("joigoose")(mongoose);
const schema = require("./users.schema").schema;

var UserSchema = new mongoose.Schema(joigoose.convert(schema));
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({
  username: "text",
  displayUsername: "text",
  email: "text",
  password: "text",
});

module.exports.UserModel = mongoose.model("User", UserSchema);
