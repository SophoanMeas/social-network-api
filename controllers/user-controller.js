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

  // get a user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'Thoughts',
        select: '-__v',
      })
      .populate({
        path: 'Friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // add a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.sendStatus(400));
  },

  // update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with tis id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.sendStatus(404).json(err));
  },

  // remove a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.sendStatus(404).json(err));
  },

  // add a new friend to a user's friend list
  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.id } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.sendStatus(404).json(err));
  },

  // delete a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndDelete(
      { _id: params.id },
      { $pull: { friend: params.id } },
      { new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.sendStatus(404).json(err));
  },
};

module.exports = UserController;
