const router = require('express').Router();

const {
  getThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(addThought);

router.route('/:id').get(getThoughtById);

router.route('/updateThought/:thoughtId').put(updateThought);

router.route('/delete/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/delete/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;
