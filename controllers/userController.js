const { User } = require('../models');

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
      const userData = await User.findOne({ _id: params.id }).populate({
        path: 'Thought',
        select: '-__v',
      });
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
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
      const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //!Delete User
  async deleteUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //!Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.body.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      res.json(user);
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
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID!' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;
