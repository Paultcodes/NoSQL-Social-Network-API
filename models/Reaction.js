const { Schema, Types, default: mongoose, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      validate: [
        validator.isLength({ max: 280 }),
        'Reaction text must be less than 280 characters.',
      ],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  { _id: false }
);

module.exports = reactionSchema;
