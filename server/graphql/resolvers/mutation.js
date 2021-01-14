const User = require("./../../models/users"); //Mongoose User Schema
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (_, { email, password, name }) => {
    try {
      const newUser = new User({
        name,
        email,
        password,
      });
      const token = await newUser.generateAuthToken();
      newUser.token = token;
      return newUser;
    } catch (err) {
      return err;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();
      user.password = null;
      user.token = token;
      return user;
    } catch (err) {
      return err;
    }
  },
  logout: async (_, args, context) => {
    try {
      const decoded = jwt.verify(args.token, "samplesignpassword");
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": args.token,
      });
      if (!user) {
        throw new Error();
      }
      user.tokens = user.tokens.filter((token) => {
        return token.token != args.token;
      });
      await user.save();
      return { message: "Successfully Logged Out!" };
    } catch (error) {
      return error;
    }
  },
};
