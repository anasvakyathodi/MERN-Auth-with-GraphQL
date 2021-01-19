const User = require("./../../models/users"); //Mongoose User Schema
const messages = require("./../messages");

module.exports = {
  users: async (args) => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      return err;
    }
  },
  messages: () => messages,
};
