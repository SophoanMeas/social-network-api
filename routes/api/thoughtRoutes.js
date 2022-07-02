const router = require('express').Router();

const {
    getallThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThough,
    addReaction,
    deleteReaction
} = require('../../controllers/though-controller')

// get all thoughts /api/thoughts
router
    .route('/')
    .get(getallThoughts)

// get thought by id, create/update/delete thoughts /api/thoughts:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThough)
    .post(createThought)

// add reaction /api/thoughts/:thoughtId/reactions
router
    .route('/thoughtId/reactions')
    .post(addReaction)

// delete reaction /api/thoughts/thoughId/reactionId
router
    .route('/thoughtId/reactions/:id')
    .delete(deleteReaction)

module.exports = router;