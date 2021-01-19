const messages = require("./../messages");
const { PubSub } = require("apollo-server-express");
const pubsub = new PubSub();
const subscribers = require("./../subscribers");
const onMessagesUpdates = (fn) => subscribers.push(fn);
module.exports = {
  messages: {
    subscribe: (_, __, context) => {
      const channel = Math.random().toString(36).slice(2, 15);
      onMessagesUpdates(() => pubsub.publish(channel, { messages }));
      setTimeout(() => pubsub.publish(channel, { messages }), 0);
      return pubsub.asyncIterator(channel);
    },
  },
};
