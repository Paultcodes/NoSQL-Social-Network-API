const { User, Thought } = require('../models');

const userController = {
  //!Get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  //!Find user by ID
  async getUserByID({ params }, res) {
    try {
      const userData = await User.findOne({ _id: params.userId }).populate([
        {
          path: 'thoughts',
          select: '-__v',
        },
        {
          path: 'friends',
          select: '-__v',
        },
      ]);
      userData
        ? res.json(userData)
        : res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  },
  //!Create a new user
  async addUser({ body }, res) {
    try {
      const userData = await User.create(body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  //!Update user
  async updateUser({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      userData
        ? res.json(userData)
        : res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //!Delete User
  async deleteUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.userId });
      userData
        ? res.json({ message: 'User Deleted!' })
        : res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //!Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      user
        ? res.json(user)
        : res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //!Remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.body.friendId } },
        { new: true }
      );
      user
        ? res.json(user)
        : res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;
