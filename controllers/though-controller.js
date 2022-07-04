const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // get a thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // add a thought
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true, runValidator: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'No user was found with this thought id!' });
          return;
        }
        res.status(200).json({
          thoughts: dbThoughtData,
          message: 'Thought was added successfully!',
        });
      })
      .catch((err) => res.json(err));
  },

  // update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $set: body },
      { runValidator: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No though with this id found!' });
          return;
        }
        res.status(200).json({
          thoughts: dbThoughtData,
          message: 'Thought was updated successfully!',
        });
      })
      .catch((err) => res.json(err));
  },

  // delete a though
  deleteThough({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) =>
        res
          .status(200)
          .json({ dbThoughtData, message: 'Thought was deleted successfully!' })
      )
      .catch((err) => res.sendStatus(404).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: body } },
      { runValidator: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No reaction found with this id!' });
          return;
        }
        res.status(200).json({
          thoughts: dbThoughtData,
          message: 'Reaction was added successfully!',
        });
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { runValidator: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No reaction found with this id!' });
          return;
        }
        res.status(200).json({
          thoughts: dbThoughtData,
          message: 'Reaction was deleted successfully!',
        });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
