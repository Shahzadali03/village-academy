import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    session: { type: String, required: true, trim: true },
  },
  { timestamps: false }
);

export const Session = mongoose.model('Session', sessionSchema);
