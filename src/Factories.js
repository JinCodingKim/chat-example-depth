const uuidv4 = require("uuid/v4");
module.exports = {
  createUser: ({ name = "" } = {}) => ({
    id: uuidv4(),
    name
  }),

  createMessage: ({ message = "", sender = "" } = {}) => ({
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  }),

  createChat: ({ messages = [], name = "Community", users = [] } = {}) => ({
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers: []
  }),

  getTime: date => {
    return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
  }
};
