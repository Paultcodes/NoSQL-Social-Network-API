const router = require('express').Router();

const {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(addUser);

router.route('/:userId').get(getUserByID);

router.route('/delete/:userId').delete(deleteUser);

router.route('/updateUser/:userId').put(updateUser);

router.route('/:userId/friends/:friendId').put(addFriend);

router.route('/delete/:userId/friends/:friendId').put(removeFriend);

module.exports = router;
