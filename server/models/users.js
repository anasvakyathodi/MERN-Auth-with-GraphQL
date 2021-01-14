const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // to remove whitespace
  },
  email: {
    type: String,
    unique: true, // email must be unique
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      //validating email
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password must not be the word itself!");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
});

// method to generate Auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "samplesignpassword");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// method to find user by credentials
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not Found!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password does not match");
  }
  return user;
};

//encrypt password while saving into db
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
