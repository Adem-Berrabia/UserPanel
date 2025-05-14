const mongoosse = require("mongoose");
const Schema = mongoosse.Schema;
const bcrypt = require("bcrypt");

// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  profileImg: String,
  username: String,
  email: String,
  password: String,
  customerInfo: [
    {
      fireName: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      age: Number,
      country: String,
      gender: String,
      createdAt: Date,
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// create the model (the collection in the database)
const AuthUser = mongoosse.model("User", authUserSchema);
// export the model
module.exports = AuthUser;
