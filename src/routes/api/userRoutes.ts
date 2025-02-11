import { Router } from 'express';
import { 
  getUsers, 
  getSingleUser, 
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend 
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
.get(getUsers) // Get all users
.post(createUser); // Create a new user

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser) // Get a single user by its _id
.put(updateUser) // Update a user
.delete(deleteUser); // Delete a user

router.route('/:userId/friends/:friendId')
.post(addFriend) // Add a friend to a user
.delete(removeFriend); // Remove a friend from a user

export default router;
