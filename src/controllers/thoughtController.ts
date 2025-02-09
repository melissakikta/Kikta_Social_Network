import models from '../models/index.js';
import { Request, Response } from 'express';

const { User, Thought } = models; // Destructure User and Thought

// Get all thoughts
  export const getThoughts = async(_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({message: 'Error fetching thoughts', error: err});
    }
  };


// Get a single thought by its _id
  export const getSingleThought = async(req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
         res.status(404).json({ message: 'No thought with that ID' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json({message: 'Error fetching thought', error: err});
    }
  }

  // create a new thought and link it to a user
  export const createThought = async(req: Request, res: Response) => {
    try {
      const newThought = await Thought.create(req.body);

      //link thought to user
      await User.findOneAndUpdate(
        { _id: req.body.userId }, 
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      res.status(201).json(newThought);

    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error creating thought', error: err});
    }
  }

  // Update a thought
  export const updateThought = async(req: Request, res: Response) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(404).json({ message: 'Error updating thought', error: err });
    }
  }

  // Delete a thought and remove it from the associated user
  export const deleteThought = async(req: Request, res: Response) => {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deletedThought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      // Check if deletedThought is not null
      if (deletedThought) {
        //remove thought from user
        await User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      }

      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Add a reaction to a thought
  export const addReaction = async(req: Request, res: Response) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json({ message: 'Error adding reaction', error: err });
    }
  }

  // Remove a reaction from a thought
  export const removeReaction = async(req: Request, res: Response) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: 'No thought with that ID' });
        return;
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json({ message: 'Error removing reaction', error: err });
    }
  }