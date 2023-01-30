const { Thought, User } = require('../models');

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  async getThoughtById({ params }, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: params.id });
      thoughtData
        ? res.json(thoughtData)
        : res.status(404).json({ message: 'No thought found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async addThought({ body }, res) {
    try {
      const thoughtData = await Thought.create(body);
      const userData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thoughtData.userId } },
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateThought({ params, body }, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      thoughtData
        ? res.json(thoughtData)
        : res.status(404).json({ message: 'No thought found with this id' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const thoughtData = await findOneAndDelete({ _id: params.id });
      thoughtData
        ? res.json(thoughtData)
        : res.status(404).json({ message: 'No thought found with this id' });
    } catch (err) {}
  },
};
