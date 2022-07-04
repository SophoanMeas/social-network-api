const { User } = require('../models');

const userController = {
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
        console.log(err);
        res.sendStatus(404);
      });
  },

  // get a user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: 'User not found!' });
      });
  },

  // add a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err, 'Cannot create user');
        res.sendStatus(400);
      });
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
        res
          .status(200)
          .json({ user: dbUserData, message: 'User was updated successfully' });
      })
      .catch((err) => res.json(err));
  },

  // remove a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({
            user: dbUserData,
            message: 'No user was found with this id!',
          });
          return;
        }
        res.status(200).json({ message: 'User was removed successfully' });
      })
      .catch((err) => res.json(err));
  },

  // add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.id } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: 'No user/friend was found with this id!' });
          return;
        }
        res.status(200).json({
          friend: dbUserData,
          message: 'Friend was added successfully',
        });
      })
      .catch((err) => res.json(err));
  },

  // delete a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.id } },
      { new: true }
    )
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user was found with this id!' });
          return;
        }
        res.status(200).json({
          friend: dbUserData,
          message: 'Friend was removed successfully',
        });
      })
      .catch((err) => res.status(404).json(err));
  },
};

module.exports = userController;
