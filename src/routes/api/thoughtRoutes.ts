import { Router } from 'express';
import { 
  getThoughts, 
  getSingleThought, 
  createThought, 
  updateThought, 
  deleteThought, 
  addReaction, 
  removeReaction } from '../../controllers/thoughtController.js';
  
  const router = Router();

  // /api/thoughts
router.route('/')
.get(getThoughts) // Get all thoughts
.post(createThought); // Create a new thought

// /api/thought/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)// get a single thought by its _id
  .put(updateThought) // update a thought
  .delete(deleteThought); // delete a thought

// /api/:thoughtID/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);  // add a reaction to a thought

// /api/:thoughtID/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction); // remove a reaction from a thought

export default router;
