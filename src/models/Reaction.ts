import { Schema, Types } from 'mongoose';

const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      defualt: Date.now,
      get: (timestamp: Date) => new Date(timestamp).toLocaleString(),
    }, 
  }, 
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//export Reaction Schema
export default reactionSchema;