import db from '../config/connection.js';
import models from '../models/index.js';
import { users, thoughts } from './data.js';


const { User, Thought } = models; // Destructure User and Thought

const seedDatabase = async () => {
  try {
    await db();
    
    console.log('📡 Connected to MongoDB');


    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Cleared old data');

    // Insert users first
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded');

    // Insert thoughts, linking them to users
    for (let thought of thoughts) {
      const user = createdUsers.find((u) => u.username === thought.username);
      if (user) {
        const newThought = await Thought.create({ ...thought, userId: user._id });
        await User.findByIdAndUpdate(user._id, { $push: { thoughts: newThought._id } });
      }
    }

    console.log('Thoughts seeded');
    console.log('Database seeding complete!');

    process.exit(0); // Exit the script
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();