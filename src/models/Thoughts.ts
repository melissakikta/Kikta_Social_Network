import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IResponse extends Document {
  thoughtText: string;
  createdAt: Date; //add default
  username: string;
  reactions: []; //add a nested document from reaction schema
}

const thoughtsSchema = new Schema<IResponse>(
  {
    thoughtText: {
      type: string,
      default: () => new Types.ObjectId(), //must be between 1 and 280 characters
    },
    responseBody: {
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
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default thoughtsSchema;
