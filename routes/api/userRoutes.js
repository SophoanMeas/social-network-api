const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// get all users/create user; /api/users
router.route('/').get(getAllUsers).post(createUser);

// get/update/delete users by id /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// create/delete friend /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:id').put(addFriend).delete(deleteFriend);

module.exports = router;
