const { Schema, Types, default: mongoose, model } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: [
      validator.isLength({ min: 1, max: 280 }),
      'Thought text must be between 1 and 280 characters.',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  
  toJSON: {
    getters: true,
    virtuals: true,
  },
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', userSchema);
module.exports = Thought;
