const userQueries = require("./query");
const userMutations = require("./mutation");
const messageSubscription = require("./subscription");
module.exports = {
  Query: userQueries,
  Mutation: userMutations,
  Subscription: messageSubscription,
};
