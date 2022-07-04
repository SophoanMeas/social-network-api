const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThough,
  addReaction,
  deleteReaction,
} = require('../../controllers/though-controller');

// get all thoughts /api/thoughts
router.route('/').get(getAllThoughts);

// get a thought by id, add, update, delete thoughts /api/thoughts:id
router
  .route('/:id')
  .post(addThought)
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThough);

// add reaction /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions/').post(addReaction);

// delete reaction /api/thoughts/thoughId/reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
