import { Schema, Document, model, Thoughts } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Thoughts[];
  friends: UserId[]; // this isn't correct
 }

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address."],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ], 
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Initialize our User model
const User = model('user', userSchema);

export default User
