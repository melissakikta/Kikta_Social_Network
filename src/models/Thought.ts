import { Schema, Document, model, Types } from 'mongoose';
import reactionSchema from './Reaction';


interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.Array<typeof reactionSchema>; 
}

const thoughtsSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//virtual property to get the number of reactions
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//initialize Thought Model
const Thought = model<IThought>("Thought", thoughtsSchema);


export default Thought;
