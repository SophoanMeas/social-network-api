const { createSecureServer } = require('http2');
const { User } = require('../models');

const UserController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => res.sendStatus(400))
  },
};

module.exports = UserController;
