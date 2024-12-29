const mongoose = require("mongoose");
const { insertMany } = require("./user");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  sport: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  activityAccess: {
    type: String,
    default: "public",
  },
  totalPlayers: {
    type: Number,
    required: true,
  },
  instructions: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  queries: [
    {
      questions: String,
      answers: String,
    },
  ],
  requests: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  isBooked: {
    type: Boolean,
    default: false,
  },
  matchFull: {
    type: Boolean,
    default: false,
  },
  courtNumber: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
