const router = require('express').Router();

const {
    getThoughts,
    thoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// GET and POST for thoughts
router.route('/').get(getThoughts).post(createThought);

//GET and PUT and DELETE for a single thought
router.route('/:id').get(thoughtById).put(updateThought).delete(deleteThought);

// POST reaction
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;