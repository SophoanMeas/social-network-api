const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// get all users/create user; /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// get/update/delete users by id /api/users/:userId
// router
//     .route('/:userid')
//     .get(getUserById)
//     .put(updateUser)
//     .delete(deleteUser);

// // create/delete friend /api/users/:userId/friends/:friendId
// router
//     .route('/:userid/friends/:friendId')
//     .post(createFriend)
//     .delete(deleteFriend);

module.exports = router;